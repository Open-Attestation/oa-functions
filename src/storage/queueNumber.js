const middy = require("middy");
const { cors } = require("middy/middlewares");
const { getQueueNumber, CORS_ERROR_HEADER } = require("./documentService");

const handleQueueNumber = async () => {
  try {
    const { id, key } = await getQueueNumber();
    return {
      statusCode: 200,
      body: JSON.stringify({ id, key })
    };
  } catch (e) {
    return {
      statusCode: 400,
      headers: CORS_ERROR_HEADER,
      body: JSON.stringify({ error: e.message })
    };
  }
};

const handler = middy(handleQueueNumber).use(cors());

module.exports = {
  handler
};
