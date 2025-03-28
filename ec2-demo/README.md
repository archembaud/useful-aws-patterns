# EC2 Demo

A simple implementation of an EC2 instance deployment solution where the stack destroys itself after it is finished its work.

Here is the idea:

* Deploy the stack. After the instance is activated, it will execute the configure_run.sh script.
* Codes will be pulled from an S3 bucket as part of the configuration; these codes make it possible to copy results to S3, and to shut the instance down.
* The configuration script then creates fake results (test.txt), sends it to S3 and deletes the entire stack.

** NOTE ** You can choose to shut down the instance instead (if you so choose) by modifying the configure script.


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