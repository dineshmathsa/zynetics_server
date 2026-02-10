import { Module } from '@nestjs/common';
import { PostgresPoolProvider } from './database.provider';
@Module({
  providers: [PostgresPoolProvider],
  exports: [PostgresPoolProvider],
})
export class DatabaseModule {}
