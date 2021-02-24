const middy = require("middy");
const { cors } = require("middy/middlewares");
const config = require("./config");

const handleFaucet = async (event, _context, callback) => {
  try {
    
    // step 1: handle the request, extract the target wallet address
    // step 2: unlock /your own wallet/ -- wallet private key should be provided in env var
    // step 3: transfer 1 eth to the target wallet address
    // step 4: send successful response

    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({"response": "OK"})
    });
  } catch (e) {
    callback(null, {
      statusCode: 400,
      body: e.message
    });
  }
};

const handler = middy(handleFaucet).use(cors());

module.exports = {
  handler
};
