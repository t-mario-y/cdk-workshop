import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import CdkWorkshop = require('../lib/cdk-workshop-stack');
// TODO: テストコードはaws-cdk ハンズオンの対象外なので、このままでは通らない
test('SQS Queue Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CdkWorkshop.CdkWorkshopStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(
    haveResource('AWS::SQS::Queue', {
      VisibilityTimeout: 300
    })
  );
});

test('SNS Topic Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CdkWorkshop.CdkWorkshopStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(haveResource('AWS::SNS::Topic'));
});
