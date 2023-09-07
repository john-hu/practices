/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "vehicle";

export enum VehicleType {
  VEHICLE_TYPE_UNSPECIFIED = 0,
  VEHICLE_TYPE_SUV = 1,
  VEHICLE_TYPE_MINIVAN = 2,
  VEHICLE_TYPE_COUPE = 3,
  VEHICLE_TYPE_SEDAN = 4,
  VEHICLE_TYPE_PICKUP = 5,
  VEHICLE_TYPE_TRUNK = 6,
  VEHICLE_TYPE_VAN = 7,
  VEHICLE_TYPE_LIMOUSINE = 8,
  UNRECOGNIZED = -1,
}

export function vehicleTypeFromJSON(object: any): VehicleType {
  switch (object) {
    case 0:
    case "VEHICLE_TYPE_UNSPECIFIED":
      return VehicleType.VEHICLE_TYPE_UNSPECIFIED;
    case 1:
    case "VEHICLE_TYPE_SUV":
      return VehicleType.VEHICLE_TYPE_SUV;
    case 2:
    case "VEHICLE_TYPE_MINIVAN":
      return VehicleType.VEHICLE_TYPE_MINIVAN;
    case 3:
    case "VEHICLE_TYPE_COUPE":
      return VehicleType.VEHICLE_TYPE_COUPE;
    case 4:
    case "VEHICLE_TYPE_SEDAN":
      return VehicleType.VEHICLE_TYPE_SEDAN;
    case 5:
    case "VEHICLE_TYPE_PICKUP":
      return VehicleType.VEHICLE_TYPE_PICKUP;
    case 6:
    case "VEHICLE_TYPE_TRUNK":
      return VehicleType.VEHICLE_TYPE_TRUNK;
    case 7:
    case "VEHICLE_TYPE_VAN":
      return VehicleType.VEHICLE_TYPE_VAN;
    case 8:
    case "VEHICLE_TYPE_LIMOUSINE":
      return VehicleType.VEHICLE_TYPE_LIMOUSINE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return VehicleType.UNRECOGNIZED;
  }
}

export function vehicleTypeToJSON(object: VehicleType): string {
  switch (object) {
    case VehicleType.VEHICLE_TYPE_UNSPECIFIED:
      return "VEHICLE_TYPE_UNSPECIFIED";
    case VehicleType.VEHICLE_TYPE_SUV:
      return "VEHICLE_TYPE_SUV";
    case VehicleType.VEHICLE_TYPE_MINIVAN:
      return "VEHICLE_TYPE_MINIVAN";
    case VehicleType.VEHICLE_TYPE_COUPE:
      return "VEHICLE_TYPE_COUPE";
    case VehicleType.VEHICLE_TYPE_SEDAN:
      return "VEHICLE_TYPE_SEDAN";
    case VehicleType.VEHICLE_TYPE_PICKUP:
      return "VEHICLE_TYPE_PICKUP";
    case VehicleType.VEHICLE_TYPE_TRUNK:
      return "VEHICLE_TYPE_TRUNK";
    case VehicleType.VEHICLE_TYPE_VAN:
      return "VEHICLE_TYPE_VAN";
    case VehicleType.VEHICLE_TYPE_LIMOUSINE:
      return "VEHICLE_TYPE_LIMOUSINE";
    case VehicleType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface FindVehicleConditions {
  brand: string;
}

export interface FindOneVehicleConditions {
  id: number;
}

export interface Vehicles {
  vehicles: Vehicle[];
}

export interface Vehicle {
  id: number;
  name: string;
  brand: string;
  type: VehicleType;
}

function createBaseFindVehicleConditions(): FindVehicleConditions {
  return { brand: "" };
}

export const FindVehicleConditions = {
  encode(message: FindVehicleConditions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.brand !== "") {
      writer.uint32(10).string(message.brand);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FindVehicleConditions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFindVehicleConditions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.brand = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FindVehicleConditions {
    return { brand: isSet(object.brand) ? String(object.brand) : "" };
  },

  toJSON(message: FindVehicleConditions): unknown {
    const obj: any = {};
    if (message.brand !== "") {
      obj.brand = message.brand;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FindVehicleConditions>, I>>(base?: I): FindVehicleConditions {
    return FindVehicleConditions.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FindVehicleConditions>, I>>(object: I): FindVehicleConditions {
    const message = createBaseFindVehicleConditions();
    message.brand = object.brand ?? "";
    return message;
  },
};

function createBaseFindOneVehicleConditions(): FindOneVehicleConditions {
  return { id: 0 };
}

export const FindOneVehicleConditions = {
  encode(message: FindOneVehicleConditions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FindOneVehicleConditions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFindOneVehicleConditions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FindOneVehicleConditions {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: FindOneVehicleConditions): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FindOneVehicleConditions>, I>>(base?: I): FindOneVehicleConditions {
    return FindOneVehicleConditions.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FindOneVehicleConditions>, I>>(object: I): FindOneVehicleConditions {
    const message = createBaseFindOneVehicleConditions();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseVehicles(): Vehicles {
  return { vehicles: [] };
}

export const Vehicles = {
  encode(message: Vehicles, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.vehicles) {
      Vehicle.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Vehicles {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVehicles();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.vehicles.push(Vehicle.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Vehicles {
    return { vehicles: Array.isArray(object?.vehicles) ? object.vehicles.map((e: any) => Vehicle.fromJSON(e)) : [] };
  },

  toJSON(message: Vehicles): unknown {
    const obj: any = {};
    if (message.vehicles?.length) {
      obj.vehicles = message.vehicles.map((e) => Vehicle.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Vehicles>, I>>(base?: I): Vehicles {
    return Vehicles.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Vehicles>, I>>(object: I): Vehicles {
    const message = createBaseVehicles();
    message.vehicles = object.vehicles?.map((e) => Vehicle.fromPartial(e)) || [];
    return message;
  },
};

function createBaseVehicle(): Vehicle {
  return { id: 0, name: "", brand: "", type: 0 };
}

export const Vehicle = {
  encode(message: Vehicle, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.brand !== "") {
      writer.uint32(26).string(message.brand);
    }
    if (message.type !== 0) {
      writer.uint32(32).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Vehicle {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVehicle();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.brand = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Vehicle {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      brand: isSet(object.brand) ? String(object.brand) : "",
      type: isSet(object.type) ? vehicleTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: Vehicle): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.brand !== "") {
      obj.brand = message.brand;
    }
    if (message.type !== 0) {
      obj.type = vehicleTypeToJSON(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Vehicle>, I>>(base?: I): Vehicle {
    return Vehicle.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Vehicle>, I>>(object: I): Vehicle {
    const message = createBaseVehicle();
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    message.brand = object.brand ?? "";
    message.type = object.type ?? 0;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
