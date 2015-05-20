#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

BENCH_NODE_EXISTS=`docker inspect --format="{{ .Id }}" bench-node 2> /dev/null`

if ! [ -z "$BENCH_NODE_EXISTS" ]
then
  docker kill bench-node
  docker rm bench-node
fi