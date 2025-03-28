#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import EC2Example from './ec2-stack';

const app = new App();
new EC2Example(app, 'EC2TestStack');