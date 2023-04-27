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





const { STSClient, AssumeRoleCommand } = require("@aws-sdk/client-sts");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { Readable } = require("stream");

// Instantiate an STS client using the default AWS configuration
const stsClient = new STSClient();

// Assume the IAM role specified by the ARN
const assumeRoleResult = await stsClient.send(new AssumeRoleCommand({
  RoleArn: 'arn:aws:iam::123456789012:role/MyECSRole',
  RoleSessionName: 'MySessionName'
}));

// Create an S3 client using the temporary credentials
const s3Client = new S3Client({
  credentials: {
    accessKeyId: assumeRoleResult.Credentials.AccessKeyId,
    secretAccessKey: assumeRoleResult.Credentials.SecretAccessKey,
    sessionToken: assumeRoleResult.Credentials.SessionToken
  }
});

// Read the contents of the file into a Readable stream
const fileData = new Readable({
  read() {
    this.push("Hello, World!");
    this.push(null);
  }
});

// Upload a file to S3 using the temporary credentials
const uploadResult = await s3Client.send(new PutObjectCommand({
  Bucket: 'my-bucket',
  Key: 'path/to/file',
  Body: fileData
}));

console.log('File uploaded:', uploadResult.Location);

//




const { S3Client } = require('@aws-sdk/client-s3');
const { fromToken } = require('@aws-sdk/credential-provider-imds');

const credentials = fromToken({
  roleArn: 'arn:aws:iam::123456789012:role/MyS3UploadRole',
  roleSessionName: 'my-s3-upload-session',
});

const s3 = new S3Client({
  credentials: credentials,
  region: 'us-west-2',
});





const { PutObjectCommand } = require('@aws-sdk/client-s3');

const params = {
  Bucket: 'my-bucket',
  Key: 'my-file.txt',
  Body: 'Hello, world!',
};

const command = new PutObjectCommand(params);

s3.send(command)
  .then(() => {
    console.log('File uploaded successfully!');
  })
  .catch((err) => {
    console.error(err);
  });

