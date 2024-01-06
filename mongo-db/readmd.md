# Run Mongo DB Docker container

```sh
pwd=`pwd`
docker run --name mongoChurchDb -p 27017:27017 -v $pwd/data:/data/db -d mongo:latest
```
