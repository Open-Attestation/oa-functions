const middy = require("middy");
const { cors } = require("middy/middlewares");
const { getQueueNumber } = require("./documentService");

const handleQueueNumber = async () => {
  const errorHeader = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  }
  try {
    const { id, key } = await getQueueNumber();
    return {
      statusCode: 200,
      body: JSON.stringify({ id, key })
    };
  } catch (e) {
    return {
      statusCode: 400,
      headers: errorHeader,
      body: JSON.stringify({ error: e.message })
    };
  }
};

const handler = middy(handleQueueNumber).use(cors());

module.exports = {
  handler
};
