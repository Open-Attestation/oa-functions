const middy = require("middy");
const { cors } = require("middy/middlewares");
const config = require("./config");

const handleFaucet = async (event, _context, callback) => {
  try {
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
