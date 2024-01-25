# Run Mongo DB Docker container

```sh
pwd=`pwd`
docker run --name mongoChurchDb --network default -p 27017:27017 -v $pwd/data:/data/db -e MONGO_INITDB_ROOT_USERNAME=dbadmin -e MONGO_INITDB_ROOT_PASSWORD=3ra24N4p7Ubd6H98hKaX -d mongo:latest
```

To Start the container again later

```sh
docker start mongoChurchDb
```

# Repair after failed shutdown

Note, this didn't work last time I had an issue.

```sh
pwd=`pwd`
docker run -it --network default -p 27017:27017 -v $pwd/data:/data/db -e MONGO_INITDB_ROOT_USERNAME=dbadmin -e MONGO_INITDB_ROOT_PASSWORD=3ra24N4p7Ubd6H98hKaX mongo:latest mongod --repair
```

# Run Mongo Express Web Interface

```sh
docker run -it --rm -p 8081:8081 -d --name mongo-express --network default -e ME_CONFIG_MONGODB_URL="mongodb://dbadmin:3ra24N4p7Ubd6H98hKaX@10.25.3.182:27017" mongo-express

docker run -it --rm -p 8081:8081 -d --name mongo-express --network default -e ME_CONFIG_MONGODB_URL="mongodb://dbadmin:3ra24N4p7Ubd6H98hKaX@172.20.10.2:27017" mongo-express
```
