import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";


// Start the client
const sqsClient = new SQSClient({ region: 'us-east-2' });

// Replace this with your SQS queue URL once deployed
const SQS_QUEUE_URL = "YourSQSQueueURL";

const SendTestMessage = async (sqsQueueUrl: string, client: SQSClient) => {
    console.log(`Sending message to: queue: ${sqsQueueUrl}`)
    const command = new SendMessageCommand({
      QueueUrl: sqsQueueUrl,
      DelaySeconds: 10,
      MessageAttributes: {
        Title: {
          DataType: "String",
          StringValue: "The Message",
        },
        Author: {
          DataType: "String",
          StringValue: "Archembaud",
        },
      },
      MessageBody:
        "An important message",
    });
  
    const response = await client.send(command);
    console.log(`Response from send message command: ${JSON.stringify(response)}`);
    return response;
};

// Send the message
SendTestMessage(SQS_QUEUE_URL, sqsClient)
