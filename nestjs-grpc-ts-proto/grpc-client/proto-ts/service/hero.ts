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
import { FindOneHeroConditions, Hero } from "../dto/hero";

export const protobufPackage = "hero";

export type HeroServiceService = typeof HeroServiceService;
export const HeroServiceService = {
  findOne: {
    path: "/hero.HeroService/FindOne",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: FindOneHeroConditions) => Buffer.from(FindOneHeroConditions.encode(value).finish()),
    requestDeserialize: (value: Buffer) => FindOneHeroConditions.decode(value),
    responseSerialize: (value: Hero) => Buffer.from(Hero.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Hero.decode(value),
  },
} as const;

export interface HeroServiceServer extends UntypedServiceImplementation {
  findOne: handleUnaryCall<FindOneHeroConditions, Hero>;
}

export interface HeroServiceClient extends Client {
  findOne(
    request: FindOneHeroConditions,
    callback: (error: ServiceError | null, response: Hero) => void,
  ): ClientUnaryCall;
  findOne(
    request: FindOneHeroConditions,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Hero) => void,
  ): ClientUnaryCall;
  findOne(
    request: FindOneHeroConditions,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Hero) => void,
  ): ClientUnaryCall;
}

export const HeroServiceClient = makeGenericClientConstructor(HeroServiceService, "hero.HeroService") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): HeroServiceClient;
  service: typeof HeroServiceService;
};
