#!/bin/sh
# Retrieve the endpoint from serverless info, only returns the first one for each
# Need to do this because each serverless.yml defines its own apigateway and hence has its own url
# After iam dot notation update (https://www.serverless.com/framework/docs/deprecations#grouping-iam-settings-under-provideriam), need to remove first character, eg. awk was returning `=https://mehqrnf4bk.execute-api.ap-southeast-1.amazonaws.com/pr33`

export VERIFY_ENDPOINT=`cd src/verify && serverless info --verbose --stage $SEED_STAGE_NAME | awk '/ServiceEndpoint/{ print substr($2, 1) }'`
export EMAIL_ENDPOINT=`cd src/email && serverless info --verbose --stage $SEED_STAGE_NAME | awk '/ServiceEndpoint/{ print substr($2, 1) }'`
export STORAGE_ENDPOINT=`cd src/storage && serverless info --verbose --stage $SEED_STAGE_NAME | awk '/ServiceEndpoint/{ print substr($2, 1) }'`

echo `cd src/storage && serverless info --verbose --stage $SEED_STAGE_NAME | awk '/ServiceEndpoint/{print $2}'`

echo `cd src/storage && serverless info --verbose --stage $SEED_STAGE_NAME | awk '/ServiceEndpoint/{ print substr($2, 1) }'`

npm run e2etest
