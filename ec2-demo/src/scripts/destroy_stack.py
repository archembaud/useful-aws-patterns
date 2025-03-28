import boto3

# Create a CloudFormation client
cf_client = boto3.client('cloudformation', region_name='us-east-2') 

# We know this stack name; we can bring in the same environment parameter
# if we need to if we want this to be flexible.
stack_name = 'EC2TestStack'

try:
    # Delete the stack
    response = cf_client.delete_stack(StackName=stack_name)
    print(f"Deletion initiated for stack: {stack_name}")
except Exception as e:
    print(f"An error occurred: {e}")
