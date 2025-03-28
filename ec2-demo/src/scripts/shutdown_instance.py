import boto3
import requests

# Metadata URL for instance ID
metadata_url = "http://169.254.169.254/latest/meta-data/instance-id"
token_url = "http://169.254.169.254/latest/api/token"

# Get a token
try:
    headers = {
       "X-aws-ec2-metadata-token-ttl-seconds": "21600"
    }
    response = requests.put(token_url, headers=headers, timeout=2)
    token = response.text
    print(f"Got token = {token}")
except:
    print("Failed to get token")

# Get the instance ID
try:
    headers = {
        "X-aws-ec2-metadata-token": token
    }
    response = requests.get(metadata_url, headers=headers, timeout=2)
    response.raise_for_status()  # Ensure we get a valid response
    instance_id = response.text
    print(f"EC2 Instance ID: {instance_id}")
except requests.exceptions.RequestException as e:
    print(f"Failed to retrieve instance metadata: {e}")

# Shut the instance down
# Create an EC2 client
ec2_client = boto3.client('ec2', region_name='us-east-2')

try:
    # Send the stop_instances request
    response = ec2_client.stop_instances(InstanceIds=[instance_id])
    print(f"Successfully stopped the instance: {response}")
except Exception as e:
    print(f"An error occurred: {e}")