#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

bash $DIR/kill-remove.sh && \
docker run \
  -v $DIR/../:/home/r/bench \
  -it \
  --name bench-node \
  bmichalski/bench-node \
  su - r