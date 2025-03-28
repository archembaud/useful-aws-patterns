/* eslint-disable import/no-extraneous-dependencies */
import { App, Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Asset } from 'aws-cdk-lib/aws-s3-assets';
import { join } from 'path'

export default class EC2Example extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Identify S3 bucket we'll pull resources from
    const results_bucket = s3.Bucket.fromBucketArn(this, "archembaud-resources", "arn:aws:s3:::archembaud-resources")

    //  Instance Role and SSM Managed Policy
    const role = new iam.Role(this, "InstanceSSM", {
      assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com")
    });
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));

    results_bucket.grantReadWrite(role)

    // Create VPC and Security Group; Alternatively we could look up an existing VPC.
    const vpc = new ec2.Vpc(this, "ec2-vpc", {
      maxAzs: 1,
      natGateways: 1
    })

    // Select an image to use; let's go amazon linux
    const amzn_linux = ec2.MachineImage.latestAmazonLinux2023()

    // Prepare scripts to run on deployment
    // Script in S3 as Asset
    const asset = new Asset(this, "Asset", {
      path: join(__dirname, './../src/configure_run.sh')
    });

    // Need to permit read
    asset.grantRead(role)

    // Create EC2 Instance
    const ec2_instance  = new ec2.Instance(this, 'EC2', {
      vpc: vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
      machineImage: amzn_linux,
      role: role
    });

    const local_path = ec2_instance.userData.addS3DownloadCommand({
      bucket: asset.bucket,
      bucketKey: asset.s3ObjectKey
      }
    )
 
    ec2_instance.userData.addExecuteFileCommand({
      filePath: local_path
    })

    // Ensure this role has the ability to shut down EC2 instances
    role.addToPolicy(new iam.PolicyStatement({
      actions: ['ec2:StopInstances'],
      resources: ['*'],  // Vile; be able to shut down other instances too.
    }));
    
    // Ensure this role has the ability to destroy stacks
    role.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['cloudformation:DeleteStack'],
      resources: ['*'],  // More vile; will be able to kill other stacks
    }));    

    // SSM Command to start a session
    new CfnOutput(this, 'ssmCommand', {
      value: `aws ssm start-session --target ${ec2_instance.instanceId}`,
    });

  }
}