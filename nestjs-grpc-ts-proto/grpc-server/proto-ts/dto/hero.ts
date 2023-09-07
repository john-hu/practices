/* eslint-disable */

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
