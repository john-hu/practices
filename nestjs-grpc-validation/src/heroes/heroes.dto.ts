import { IsEnum, IsOptional, IsPositive } from 'class-validator';
import { HeroType } from './constants';

export class HeroByIdOrType {
  @IsOptional()
  @IsPositive()
  id?: number;
  @IsOptional()
  @IsEnum(HeroType)
  type?: HeroType;
}

export class Hero {
  id: number;
  name: string;
  type: HeroType;
}
