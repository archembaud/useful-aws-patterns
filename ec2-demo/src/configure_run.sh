#!/bin/sh
# Script to run on deployment of EC2 instance
sudo yum update
sudo yum -y install python3 tmux
# Now try installing the version of pip compatible with installed python
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
# Install
python3 get-pip.py
pip3 install boto3
# Ok, now prepare a script to fetch files we want
echo "import boto3
# Open an S3 client and move the file using the date as a prefix
s3 = boto3.resource('s3')
print('Downloading files from S3..')
s3.meta.client.download_file('archembaud-resources', f'scripts/send_to_s3.py', './send_to_s3.py')
s3.meta.client.download_file('archembaud-resources', f'scripts/shutdown_instance.py', './shutdown_instance.py')
s3.meta.client.download_file('archembaud-resources', f'scripts/destroy_stack.py', './destroy_stack.py')
" > ~/copy_from_s3.py

# Do some work -collect some files, create some files and move the files to S3
cd ~
python3 copy_from_s3.py
echo "Computation Complete" > ~/test.txt
python3 send_to_s3.py test.txt
# Shut this instance down
# python3 shutdown_instance.py
# Destroy the stack
python3 destroy_stack.py