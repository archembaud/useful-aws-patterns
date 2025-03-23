# SQS queue Demo

Simple SQS queue, with a subscribed lambda and some local scripts to test.

Here is the idea:

* Deploy the stack; it will contain the SQS queue, a dead letter queue (which is not used here, but is good to have ready) and a lambda subscribed to the queue
* Send a message to the deployed SQS queue. (Note: a test script has been included for this)
* When a message lands in the queue, the lambda subscribed to the queue will catch the event and fire, processing the event and its contents (i.e. the message).
* You can confirm this has occured by looking in the cloudwatch logs.

**NOTE**: The instructions below assume you have succesfully set up your AWS credentials and config.

## Build and Deploy Instructions

To install:

```bash
yarn install
yarn build
```

To synthesize and/or deploy:

```bash
yarn cdk synth
yarn cdk deploy
```

To test (i.e. send a message to your queue)

```bash
yarn test
```

**NOTE**: You will need to modify the send_message.ts file to include your own SQS Queue URL - obtained after deployment - and rebuilding.
