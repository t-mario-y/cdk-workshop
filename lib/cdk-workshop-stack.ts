import apigw = require('@aws-cdk/aws-apigateway');
import events = require('@aws-cdk/aws-events');
import targets = require('@aws-cdk/aws-events-targets');
import lambda = require('@aws-cdk/aws-lambda');
import cdk = require('@aws-cdk/core');

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambdaリソースを定義
    const lambdaHello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'hello.handler'
    });

    //API GatewayでREST APIを定義
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: lambdaHello
    });

    // Run every Friday at 6PM UTC
    const rule = new events.Rule(this, 'Rule', {
      schedule: events.Schedule.expression('cron(0 18 ? * FRI *)')
    });
    rule.addTarget(new targets.LambdaFunction(lambdaHello));
  }
}
