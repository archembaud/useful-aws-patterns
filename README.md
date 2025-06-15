# Useful AWS Patterns

A collection of simple tools for AWS.

* [ec2-demo](./ec2-demo/README.md): this is a demo ec2 stack which (i) deploys a stack, (ii) automatically runs a script - say, to install packages automatically or run a user program, and then (iii) shut down or destroy the stack (optional).
* [sqs-queue](./sqs-queue/README.md): simple demonstration of an SQS queue with a subscribed lambda. The lambda function is run whenever a message is pushed to the SQS queue.
* [simple-api](./simple-api/README.md): a lightweight, unauthenticated API using API Gateway and lamba functions with a single endpoint (healthcheck).