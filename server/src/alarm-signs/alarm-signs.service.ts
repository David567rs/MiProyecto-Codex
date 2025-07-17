import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AlarmSign } from '../schemas/alarmSign.schema';
import { CreateAlarmSignDto } from '../dto/alarm-signs/create.alarmSign.dto';
import { UpdateAlarmSignDto } from '../dto/alarm-signs/update.alarmSign.dto';

@Injectable()
export class AlarmSignsService {
  constructor(
    @InjectModel(AlarmSign.name) private alarmModel: Model<AlarmSign>,
  ) {}

  async findByChild(childId: string) {
    const existing = await this.alarmModel.findOne({ childId });
    if (existing) return existing;
    const created = new this.alarmModel({ childId, signs: [], comments: '', diagnosis: '' });
    return created.save();
  }

  async create(dto: CreateAlarmSignDto) {
    const created = new this.alarmModel(dto);
    return created.save();
  }

  async update(childId: string, dto: UpdateAlarmSignDto) {
    return this.alarmModel.findOneAndUpdate({ childId }, dto, { new: true, upsert: true });
  }
}