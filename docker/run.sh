#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

bash $DIR/mongodb/run.sh && \
bash $DIR/node/kill-remove.sh && \
docker run \
  -v $DIR/../:/home/r/bench \
  -it \
  --name bench-node \
  --link bench-mongo:bench-mongo \
  -p 3000:3000 \
  bmichalski/bench-node \
  su - r
