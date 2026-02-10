import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { IngestController } from './ingest/ingest.controller';
import { IngestService } from './ingest/ingest.service';
import { AnalyticsController } from './analytics/analytics.controller';
import { AnalyticsService } from './analytics/analytics.service';   
import { IngestRepository } from './ingest/ingest.repository';
import { AnalyticsRepository } from './analytics/analytics.repository';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [AppController, IngestController, AnalyticsController],
  providers: [AppService, IngestService, AnalyticsService, IngestRepository, AnalyticsRepository],
})
export class AppModule {}
