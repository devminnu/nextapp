const AWS = require('aws-sdk');

// Instantiate an STS object using the default AWS configuration
const sts = new AWS.STS();

// Assume the IAM role specified by the ARN
const assumeRoleResult = await sts.assumeRole({
  RoleArn: 'arn:aws:iam::123456789012:role/MyECSRole',
  RoleSessionName: 'MySessionName'
}).promise();

// Create an S3 client using the temporary credentials
const s3 = new AWS.S3({
  accessKeyId: assumeRoleResult.Credentials.AccessKeyId,
  secretAccessKey: assumeRoleResult.Credentials.SecretAccessKey,
  sessionToken: assumeRoleResult.Credentials.SessionToken
});

// Upload a file to S3 using the temporary credentials
const uploadResult = await s3.upload({
  Bucket: 'my-bucket',
  Key: 'path/to/file',
  Body: fileData
}).promise();

console.log('File uploaded:', uploadResult.Location);
