# Installation

Please make sure you have `protoc` installed correctly, we could ref [this page](https://grpc.io/docs/protoc-installation/).

If not, we can install with the following commands:

Mac OS: `brew install protobuf`
Ubuntu: `apt install -y protobuf-compiler`


# Run them

Please prepare two terminal: 1. for grpc-server, 2. for grpc-client

## grpc-server
```
yarn
yarn start:dev
```
or
```
yarn
yarn build
yarn start
```

## grpc-client
After the server running, run
```
yarn
yarn start
```

