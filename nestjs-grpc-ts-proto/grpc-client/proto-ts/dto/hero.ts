/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "hero";

export interface FindOneHeroConditions {
  id?: number | undefined;
  type?: string | undefined;
}

export interface Hero {
  id: number;
  name: string;
  type: string;
}

function createBaseFindOneHeroConditions(): FindOneHeroConditions {
  return { id: undefined, type: undefined };
}

export const FindOneHeroConditions = {
  encode(message: FindOneHeroConditions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      writer.uint32(8).int32(message.id);
    }
    if (message.type !== undefined) {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FindOneHeroConditions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFindOneHeroConditions();
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

          message.type = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FindOneHeroConditions {
    return {
      id: isSet(object.id) ? Number(object.id) : undefined,
      type: isSet(object.type) ? String(object.type) : undefined,
    };
  },

  toJSON(message: FindOneHeroConditions): unknown {
    const obj: any = {};
    if (message.id !== undefined) {
      obj.id = Math.round(message.id);
    }
    if (message.type !== undefined) {
      obj.type = message.type;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FindOneHeroConditions>, I>>(base?: I): FindOneHeroConditions {
    return FindOneHeroConditions.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FindOneHeroConditions>, I>>(object: I): FindOneHeroConditions {
    const message = createBaseFindOneHeroConditions();
    message.id = object.id ?? undefined;
    message.type = object.type ?? undefined;
    return message;
  },
};

function createBaseHero(): Hero {
  return { id: 0, name: "", type: "" };
}

export const Hero = {
  encode(message: Hero, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.type !== "") {
      writer.uint32(26).string(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Hero {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHero();
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

          message.type = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Hero {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      type: isSet(object.type) ? String(object.type) : "",
    };
  },

  toJSON(message: Hero): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.type !== "") {
      obj.type = message.type;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Hero>, I>>(base?: I): Hero {
    return Hero.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Hero>, I>>(object: I): Hero {
    const message = createBaseHero();
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    message.type = object.type ?? "";
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
