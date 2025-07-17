import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlarmSign, AlarmSignSchema } from '../schemas/alarmSign.schema';
import { AlarmSignsController } from './alarm-signs.controller';
import { AlarmSignsService } from './alarm-signs.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AlarmSign.name, schema: AlarmSignSchema }]),
  ],
  controllers: [AlarmSignsController],
  providers: [AlarmSignsService],
})
export class AlarmSignsModule {}