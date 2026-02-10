import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class IngestRepository {
  constructor(
    @Inject('PG_POOL') private readonly pool: Pool,
  ) {}

  insertMeterHistory(data: any) {
    console.log('Inserting meter history:', data);
    return this.pool.query(
      `
      INSERT INTO meter_telemetry_history
      (meter_id, kwh_consumed_ac, voltage, timestamp)
      VALUES ($1, $2, $3, $4)
      `,
      [data.meterId, data.kwhConsumedAc, data.voltage, data.timestamp],
    );
  }

  insertVehicleHistory(data: any) {
    return this.pool.query(
      `
      INSERT INTO vehicle_telemetry_history
      (vehicle_id, soc, kwh_delivered_dc, battery_temp, timestamp)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [
        data.vehicleId,
        data.soc,
        data.kwhDeliveredDc,
        data.batteryTemp,
        data.timestamp,
      ],
    );
  }

  upsertVehicleLive(data: any) {
    return this.pool.query(
      `
      INSERT INTO vehicle_live_status
      (vehicle_id, soc, battery_temp, last_updated)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (vehicle_id)
      DO UPDATE SET
        soc = EXCLUDED.soc,
        battery_temp = EXCLUDED.battery_temp,
        last_updated = EXCLUDED.last_updated
      `,
      [
        data.vehicleId,
        data.soc,
        data.batteryTemp,
        data.timestamp,
      ],
    );
  }
}
