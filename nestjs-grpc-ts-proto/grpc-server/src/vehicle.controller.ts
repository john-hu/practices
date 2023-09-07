import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  FindOneVehicleConditions,
  FindVehicleConditions,
  Vehicle,
  Vehicles,
  VehicleType,
} from '@proto.ts/dto/vehicle';
import { VehicleService } from '@proto.ts/service/vehicle';

const vehicles: Vehicle[] = [
  { id: 1, name: 'RAV4', brand: 'Toyota', type: VehicleType.VEHICLE_TYPE_SUV },
  {
    id: 2,
    name: 'Odyssey',
    brand: 'Honda',
    type: VehicleType.VEHICLE_TYPE_MINIVAN,
  },
  {
    id: 3,
    name: 'Chrysler 300',
    brand: 'Chrysler',
    type: VehicleType.VEHICLE_TYPE_LIMOUSINE,
  },
  {
    id: 4,
    name: 'F-150',
    brand: 'Ford',
    type: VehicleType.VEHICLE_TYPE_PICKUP,
  },
  { id: 5, name: 'CRV', brand: 'Honda', type: VehicleType.VEHICLE_TYPE_SUV },
];
// Dummy implementation for demonstrating gRPC.
@Controller()
export class VehicleController implements VehicleService {
  @GrpcMethod('VehicleService', 'findOne')
  async findOne(data: FindOneVehicleConditions): Promise<Vehicle> {
    console.log('findOne', data.id);
    return vehicles.find(({ id }) => id === data.id);
  }

  @GrpcMethod('VehicleService', 'find')
  async find(data: FindVehicleConditions): Promise<Vehicles> {
    console.log('find', data.brand);
    return { vehicles: vehicles.filter(({ brand }) => brand === data.brand) };
  }
}
