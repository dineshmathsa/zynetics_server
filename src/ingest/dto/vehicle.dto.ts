import { IsNumber, IsString, IsISO8601, Min, Max } from 'class-validator';

export class VehicleTelemetryDto {
  @IsString()
  vehicleId: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  soc: number;

  @IsNumber()
  kwhDeliveredDc: number;

  @IsNumber()
  batteryTemp: number;

  @IsISO8601()
  timestamp: string;
}
