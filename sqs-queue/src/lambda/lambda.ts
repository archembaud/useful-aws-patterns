export interface LambdaResponse {
  statusCode: number;
  body: any;
}
  
export const handler = async (event: Record<string, any>): Promise<LambdaResponse> => {
  // Output event to CloudWatch logs.
  console.log("Incoming message being handled. Event:", JSON.stringify(event, undefined, 2));
  // Respond to upstream caller.
  return {
    'statusCode': 200,
    'body': event
  };
};