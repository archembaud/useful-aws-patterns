# SQS queue Demo

Simple SQS queue, with a subscribed lambda and some local scripts to test.

Here is the idea:

* Deploy the stack; it will contain the SQS queue, a dead letter queue (which is not used here, but is good to have ready) and a lambda subscribed to the queue
* Run the push_message.sh script. This will send a message to the deployed SQS queue.
* When a message lands in the queue, the lambda subscribed to the queue will catch the event and fire, processing the event and its contents (i.e. the message).
* You can confirm this has occured by looking in the cloudwatch logs.

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
