#!/bin/bash
set -e
PROTOC=`which protoc`

mkdir -p proto-ts

echo "Using protoc at: $PROTOC"

TS_ARGS=('lowerCaseServiceMethods=true'
         'outputEncodeMethods=true'
         'outputJsonMethods=true'
         'outputClientImpl=true'
         'outputServices=grpc-js'
         'snakeToCamel=true')
echo "ts_proto_opts: $(IFS=, ; echo "${TS_ARGS[*]}")"

for f in ../protos/service/*.proto
do
  echo "Generate stubs for $f file"
  PROTOC --plugin=./node_modules/.bin/protoc-gen-ts_proto\
         --ts_proto_out=./proto-ts\
         --proto_path=../protos\
         --ts_proto_opt="$(IFS=, ; echo "${TS_ARGS[*]}")"\
         "$f"
done

