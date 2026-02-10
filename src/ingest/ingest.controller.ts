import { Body, Controller, Post } from '@nestjs/common';
import { IngestService } from './ingest.service';
import { MeterTelemetryDto } from './dto/meter.dto';
import { VehicleTelemetryDto } from './dto/vehicle.dto';
@Controller('v1/ingest')
export class IngestController {
    constructor(private readonly ingestService: IngestService) { }

    @Post('meter')
    ingestMeter(@Body() dto: MeterTelemetryDto) {
        return this.ingestService.ingestMeter(dto);
    }

    @Post('vehicle')
    ingestVehicle(@Body() dto: VehicleTelemetryDto) {
        return this.ingestService.ingestVehicle(dto);
    }
}
