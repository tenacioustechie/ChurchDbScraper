# Usage

```sh
docker pull instructure/dynamo-local-admin
docker run -p 8000:8000 -it --rm instructure/dynamo-local-admin
```

Now open http://localhost:8000/ in your browser, and you'll see the admin UI. You can also hit port 8000 with Dynamo API requests:

`AWS_ACCESS_KEY_ID=key AWS_SECRET_ACCESS_KEY=secret aws --region us-east-1 dynamodb --endpoint http://localhost:8000/ list-tables`

A proxy is included which differentiates between Dynamo requests and web requests, and proxies to the appropriate server.

# Reference

- https://github.com/instructure/dynamo-local-admin-docker
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html
- https://github.com/aaronshaf/dynamodb-admin
