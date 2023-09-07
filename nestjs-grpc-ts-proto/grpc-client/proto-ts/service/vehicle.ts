/* eslint-disable */
import {
  CallOptions,
  ChannelCredentials,
  Client,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import { FindOneVehicleConditions, FindVehicleConditions, Vehicle, Vehicles } from "../dto/vehicle";

export const protobufPackage = "vehicle";

export type VehicleServiceService = typeof VehicleServiceService;
export const VehicleServiceService = {
  findOne: {
    path: "/vehicle.VehicleService/FindOne",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: FindOneVehicleConditions) => Buffer.from(FindOneVehicleConditions.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FindOneVehicleConditions.decode(value),
    responseSerialize: (value: Vehicle) => Buffer.from(Vehicle.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Vehicle.decode(value),
  },
  find: {
    path: "/vehicle.VehicleService/Find",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: FindVehicleConditions) => Buffer.from(FindVehicleConditions.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FindVehicleConditions.decode(value),
    responseSerialize: (value: Vehicles) => Buffer.from(Vehicles.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Vehicles.decode(value),
  },
} as const;

export interface VehicleServiceServer extends UntypedServiceImplementation {
  findOne: handleUnaryCall<FindOneVehicleConditions, Vehicle>;
  find: handleUnaryCall<FindVehicleConditions, Vehicles>;
}

export interface VehicleServiceClient extends Client {
  findOne(
    request: FindOneVehicleConditions,
    callback: (error: ServiceError | null, response: Vehicle) => void,
  ): ClientUnaryCall;
  findOne(
    request: FindOneVehicleConditions,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Vehicle) => void,
  ): ClientUnaryCall;
  findOne(
    request: FindOneVehicleConditions,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Vehicle) => void,
  ): ClientUnaryCall;
  find(
    request: FindVehicleConditions,
    callback: (error: ServiceError | null, response: Vehicles) => void,
  ): ClientUnaryCall;
  find(
    request: FindVehicleConditions,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Vehicles) => void,
  ): ClientUnaryCall;
  find(
    request: FindVehicleConditions,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Vehicles) => void,
  ): ClientUnaryCall;
}

export const VehicleServiceClient = makeGenericClientConstructor(
  VehicleServiceService,
  "vehicle.VehicleService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): VehicleServiceClient;
  service: typeof VehicleServiceService;
};
