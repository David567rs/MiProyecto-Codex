import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DentalRecordController } from './dental-record.controller';
import { DentalRecordService } from './dental-record.service';
import { DentalRecord, DentalRecordSchema } from '../schemas/dentalRecord.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: DentalRecord.name, schema: DentalRecordSchema }]),
    ],
    controllers: [DentalRecordController],
    providers: [DentalRecordService],
})
export class DentalRecordModule {}