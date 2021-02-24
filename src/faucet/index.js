const middy = require("middy");
const { cors } = require("middy/middlewares");
const { ethers, utils } = require("ethers");
const { AwsKmsSigner } = require("ethers-aws-kms-signer");
const { reverse } = require("lodash");

const handleFaucet = async (event, _context, callback) => {
  try {
    const kmsCredentials = {
      accessKeyId: process.env.KMS_ACCESS_KEY_ID,
      secretAccessKey: process.env.KMS_SECRET_ACCESS_KEY,
      region: process.env.KMS_REGION,
      keyId: process.env.KMS_KEY_ID,
    };

    const provider = ethers.getDefaultProvider("ropsten");
    let signer = new AwsKmsSigner(kmsCredentials);
    signer = signer.connect(provider);
    const receiver = event.pathParameters.walletAddress;
    if (!utils.isAddress(receiver)) throw new Error("Invalid wallet address");
    const signerBalance = ethers.utils.formatEther(await signer.getBalance());
    if (signerBalance < 1) throw new Error("Insufficient Funds in wallet.");
    const transfer = await signer.sendTransaction({
      to: receiver,
      value: utils.parseEther("1"),
    });
    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: receiver,
        txhash: transfer.hash,
        amount: "1",
      }),
    });
  } catch (e) {
    callback(null, {
      statusCode: 400,
      body: e.message,
    });
  }
};

const handler = middy(handleFaucet).use(cors());

module.exports = {
  handler,
};
