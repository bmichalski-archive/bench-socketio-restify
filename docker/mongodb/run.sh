#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

BENCH_MONGO_DATA_EXISTS=`docker inspect --format="{{ .Id }}" bench-mongo-data 2> /dev/null`

if [ -z "$BENCH_MONGO_DATA_EXISTS" ]
then
  docker run -d -v /data --name bench-mongo-data debian
fi

BENCH_MONGO_EXISTS=`docker inspect --format="{{ .Id }}" bench-mongo 2> /dev/null`

if ! [ -z "$BENCH_MONGO_EXISTS" ]
then
  docker kill bench-mongo
  docker rm bench-mongo
fi

docker run \
  -v $DIR/../:/home/r/bench \
  --volumes-from bench-mongo-data \
  -d \
  --name bench-mongo \
  -p 27017:27017 \
  bmichalski/bench-mongo