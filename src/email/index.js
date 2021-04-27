const middy = require("middy");
const { get } = require("lodash");
const { cors } = require("middy/middlewares");
const {
  openAttestationVerifiers,
  verificationBuilder,
  isValid
} = require("@govtechsg/oa-verify");
const { CORS_ERROR_HEADER } = require("../../utils/cors");

const recaptcha = require("./recaptcha");
const certificateMailer = require("./mailer/mailerWithSESTransporter");
const config = require("./config");

const captchaValidator = recaptcha(config.recaptchaSecret);

const verify = verificationBuilder(openAttestationVerifiers, {
  network: config.network
});

const validateApiKey = key => {
  if (!key) return false;
  if (config.emailApiKeys.includes(key)) {
    return true;
  }
  throw new Error("Invalid API key");
};

const handleEmail = async (event, _context, callback) => {
  try {
    const { to, data, captcha } = JSON.parse(event.body);

    // Validate captcha if api key is not present
    const apiKey = get(event, "headers['X-API-KEY']");

    // eslint-disable-next-line no-console
    console.log(`API: ${apiKey}`);
    // eslint-disable-next-line no-console
    console.log(`ENV: ${process.env.EMAIL_API_KEYS}`);
    // eslint-disable-next-line no-console
    console.log(`Config: ${JSON.stringify(config)}`);

    if (!validateApiKey(apiKey)) {
      const valid = await captchaValidator(captcha);
      // eslint-disable-next-line no-console
      console.log(`Captcha: ${captcha}`);
      // eslint-disable-next-line no-console
      console.log(`Captcha isValid: ${valid}`);
      if (!valid) throw new Error("Invalid captcha or missing API key");
    }

    // Verify Certificate
    const fragments = await verify(data);
    if (!isValid(fragments)) {
      throw new Error("Invalid certificate");
    }

    // Send certificate out
    await certificateMailer({ to, certificate: data });

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    });
  } catch (e) {
    callback(null, {
      statusCode: 400,
      headers: CORS_ERROR_HEADER,
      body: JSON.stringify({ error: e.message })
    });
  }
};

const handler = middy(handleEmail).use(cors());

module.exports = { handler };
