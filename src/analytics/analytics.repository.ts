import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class AnalyticsRepository {
  constructor(
    @Inject('PG_POOL') private readonly pool: Pool,
  ) {}

  async getVehicleAggregates(vehicleId: string) {
    const { rows } = await this.pool.query(
      `
      SELECT
        SUM(kwh_delivered_dc) AS total_dc,
        AVG(battery_temp) AS avg_temp
      FROM vehicle_telemetry_history
      WHERE vehicle_id = $1
        AND timestamp >= NOW() - INTERVAL '24 HOURS'
      `,
      [vehicleId],
    );

    return rows[0];
  }

  async getMeterAggregates() {
    const { rows } = await this.pool.query(
      `
      SELECT
        SUM(kwh_consumed_ac) AS total_ac
      FROM meter_telemetry_history
      WHERE timestamp >= NOW() - INTERVAL '24 HOURS'
      `,
    );

    return rows[0];
  }
}
