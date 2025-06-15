import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import * as path from 'path';

export class SimpleApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a Lambda function
    const helloWorldFunction = new lambda.Function(this, 'HelloWorldFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'hello-world.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
    });

    // Create an API Gateway
    const api = new apigateway.RestApi(this, 'HelloWorldApi', {
      restApiName: 'Hello World API',
      description: 'This is a simple API with a healthcheck endpoint',
    });

    // Create a resource and method
    const healthcheckResource = api.root.addResource('healthcheck');
    healthcheckResource.addMethod('GET', new apigateway.LambdaIntegration(helloWorldFunction));

    // Output the API endpoint URL
    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: api.url,
      description: 'The URL of the API endpoint',
    });
  }
} 