/* eslint-disable */

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
