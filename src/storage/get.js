const middy = require("middy");
const { cors } = require("middy/middlewares");
const { getDocument } = require("./documentService");

const handleGet = async event => {
  const errorHeader = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  }
  try {
    const { id } = event.pathParameters;
    const cleanup =
      event.queryStringParameters &&
      event.queryStringParameters.cleanup === "true";
    const document = await getDocument(id, { cleanup });
    return {
      statusCode: 200,
      body: JSON.stringify(document)
    };
  } catch (e) {
    return {
      statusCode: 400,
      headers: errorHeader,
      body: JSON.stringify({ error: e.message })
    };
  }
};

const handler = middy(handleGet).use(cors());

module.exports = {
  handler
};
