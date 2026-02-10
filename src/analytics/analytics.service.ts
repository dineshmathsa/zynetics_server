import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from './analytics.repository';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly repo: AnalyticsRepository,
  ) {}

  async getPerformance(vehicleId: string) {
    const vehicleAgg = await this.repo.getVehicleAggregates(vehicleId);
    const meterAgg = await this.repo.getMeterAggregates();

    const totalDc = Number(vehicleAgg?.total_dc || 0);
    const totalAc = Number(meterAgg?.total_ac || 0);

    return {
      totalAcConsumed: totalAc,
      totalDcDelivered: totalDc,
      efficiency: totalAc === 0 ? null : totalDc / totalAc,
      avgBatteryTemp: Number(vehicleAgg?.avg_temp || 0),
    };
  }
}
