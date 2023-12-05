# Services for development

## Development services

There are several services for local run and development.
They run as 3rd-party docker images in containers under docker-compose.

### postgres

Single postgresql server.
Used by the platform and the applications.

### redis

Single redis server

### redis-commander

UI to admin/use the redis

### nginx

For now, it's commented/non-used.
Front web server to host/provide both the server and the client under the same origin.
The platform/applications should work in such configuration.
Uncomment/use it, if it needs.

### localstack: S3

This services allows us to work with S3 bucket locally.

By default, two buckets are predefined for you: `dev-bucket-1` and `dev-bucket-2`.
Update the `.aws/create_buckets.sh script` should you need to use a different bucket.

You can the defined a environment variable for the bucket name and use it in your application.

You can browse the bucket at http://localhost:4566/
