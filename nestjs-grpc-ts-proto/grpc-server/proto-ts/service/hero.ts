/* eslint-disable */
import type { FindOneHeroConditions, Hero } from "../dto/hero";

export const protobufPackage = "hero";

export interface HeroService {
  findOne(request: FindOneHeroConditions): Promise<Hero>;
}
