import { App, Stack, StackProps, Duration, CfnOutput, RemovalPolicy } from 'aws-cdk-lib';
import { join } from 'path'
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambdaEvents from 'aws-cdk-lib/aws-lambda-event-sources';

export default class SQSStack extends Stack {
    constructor(scope: App, id: string, props?: StackProps) {
      super(scope, id, props);
  
      // Create a SQS Queue and a dead letter queue 
      const deadLetterQueue = new sqs.Queue(this, 'TestDeadLetterQueue', {
        queueName: 'TestDeadLetterQueue',
        retentionPeriod: Duration.days(7)
      });

      const uploadQueue = new sqs.Queue(this, 'TestQueue', {
        queueName: 'TestQueue',
        visibilityTimeout: Duration.seconds(30),
        deadLetterQueue: {
          maxReceiveCount: 1,
          queue: deadLetterQueue
        }
      });

      // Create a Lambda function that will be triggered by the SQS Queue.
      const lambdaFunction = new lambdaNodejs.NodejsFunction(this, 'TestMessageEventLambda', {
        functionName: 'TestMessageEventLambda',
        entry: join(__dirname, '.', 'lambda', 'lambda.js'),
      });

      // Bind the Lambda to the SQS Queue.
      const invokeEventSource = new lambdaEvents.SqsEventSource(uploadQueue);
      lambdaFunction.addEventSource(invokeEventSource);
    }
}
