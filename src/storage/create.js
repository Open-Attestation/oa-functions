const middy = require("middy");
const { cors } = require("middy/middlewares");
const { uploadDocument } = require("./documentService");

const handleCreate = async event => {
  const errorHeader = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  }
  try {
    const { document, ttl } = JSON.parse(event.body);
    const receipt = await uploadDocument(document, ttl);
    return {
      statusCode: 200,
      body: JSON.stringify(receipt)
    };
  } catch (e) {
    // this error message shows up when the uuid already exists in dynamodb and we try to write to it
    if (e.message === "The conditional request failed") {
      return {
        statusCode: 400,
        headers: errorHeader,
        body: "Unauthorised"
      };
    }
    return {
      statusCode: 400,
      headers: errorHeader,
      body: JSON.stringify({
        error: e.message
      })
    };
  }
};

const handler = middy(handleCreate).use(cors());

module.exports = {
  handler
};
