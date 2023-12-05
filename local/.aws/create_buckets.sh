#!/usr/bin/env bash
set -x
awslocal s3 mb s3://dev-bucket-1
awslocal s3 mb s3://dev-bucket-2
awslocal s3 mb s3://dev-bucket-3
set +x
