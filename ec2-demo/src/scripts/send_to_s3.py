import sys
import boto3

# total arguments
n = len(sys.argv)

if (n != 2):
    print("Incorrect number of arguments!")
else:
    # First argument is the file name.
    # This isn't pretty, but it gets the job done.
    file_name = sys.argv[1]
    print(f"Copying {file_name} to S3")
    # Open an S3 client and move the file using the date as a prefix
    s3 = boto3.resource('s3')
    s3.meta.client.upload_file(file_name, 'archembaud-resources', f'test/{file_name}')