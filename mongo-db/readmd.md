# Run Mongo DB Docker container

```sh
pwd=`pwd`
docker run --name mongoChurchDb --network default -p 27017:27017 -v $pwd/data:/data/db -e MONGO_INITDB_ROOT_USERNAME=dbadmin -e MONGO_INITDB_ROOT_PASSWORD=3ra24N4p7Ubd6H98hKaX -d mongo:latest
```

To Start the container again later

```sh
docker start mongoChurchDb
```

# Run Mongo Express Web Interface

```sh
docker run -it --rm -p 127.0.0.1:8081:8081 --name mongo-express --network default -e ME_CONFIG_MONGODB_URL="mongodb://dbadmin:3ra24N4p7Ubd6H98hKaX@10.25.3.182:27017" mongo-express
```
