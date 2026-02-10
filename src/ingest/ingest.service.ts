import { Injectable } from '@nestjs/common';
import { IngestRepository } from './ingest.repository';

@Injectable()
export class IngestService {
  constructor(
    private readonly repo: IngestRepository,
  ) {}

  async ingestMeter(data: any) {
    await this.repo.insertMeterHistory(data);
    return { status: 'meter_ingested' };
  }

  async ingestVehicle(data: any) {
    await this.repo.insertVehicleHistory(data);
    await this.repo.upsertVehicleLive(data);
    return { status: 'vehicle_ingested' };
  }
}
