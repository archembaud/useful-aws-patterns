# Simple API with AWS CDK

This project creates a simple REST API using AWS CDK v2, Lambda, and API Gateway.

## Prerequisites

- Node.js (v14 or later)
- AWS CLI configured with appropriate credentials
- AWS CDK CLI installed (`npm install -g aws-cdk`)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Deploy the stack (Assuming you have your AWS credentials property set up in your environment):
```bash
npm run cdk deploy
```

## API Endpoint

After deployment, the API endpoint URL will be displayed in the CDK output. The endpoint will be in the format:
```
https://<api-id>.execute-api.<region>.amazonaws.com/prod/healthcheck
```

You can test the API by making a GET request to the endpoint. It will return a JSON response with a "Hello World" message and a timestamp.

```bash
curl -X GET https://<api-id>.execute-api.<region>.amazonaws.com/prod/healthcheck
```

which should return something like:

```bash
{"message":"Hello World!","timestamp":"2025-06-15T05:14:45.942Z"}
```


## Cleanup

To remove all resources created by this stack:
```bash
npm run cdk destroy
``` 