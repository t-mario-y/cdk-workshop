export const handler: AWSLambda.Handler = async (event: AWSLambda.APIGatewayEvent) => {
  console.log('request:', JSON.stringify(event, undefined, 2));
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: `Hello, CDK! You've hit ${event.path}`
  };
};
