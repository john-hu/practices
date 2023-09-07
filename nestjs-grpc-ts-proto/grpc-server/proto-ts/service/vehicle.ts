/* eslint-disable */
import type { FindOneVehicleConditions, FindVehicleConditions, Vehicle, Vehicles } from "../dto/vehicle";

export const protobufPackage = "vehicle";

export interface VehicleService {
  findOne(request: FindOneVehicleConditions): Promise<Vehicle>;
  find(request: FindVehicleConditions): Promise<Vehicles>;
}
