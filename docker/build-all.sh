#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

bash $DIR/mongodb/build.sh && \
bash $DIR/node/build.sh
