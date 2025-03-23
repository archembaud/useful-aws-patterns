#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import SQSStack from './sqs-stack';

const app = new App();
new SQSStack(app, 'SQSTestStack');