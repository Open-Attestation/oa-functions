#!/bin/sh
# Retrieve the endpoint from serverless info, only returns the first one for each
# Need to do this because each serverless.yml defines its own apigateway and hence has its own url
export VERIFY_ENDPOINT=`cd src/verify && serverless info --verbose --stage $SEED_STAGE_NAME | awk '/ServiceEndpoint/{print $2}'`
export EMAIL_ENDPOINT=`cd src/email && serverless info --verbose --stage $SEED_STAGE_NAME | awk '/ServiceEndpoint/{print $2}'`
export STORAGE_ENDPOINT=`https://mehqrnf4bk.execute-api.ap-southeast-1.amazonaws.com/pr33`
npm run e2etest