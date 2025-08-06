import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AlarmSign } from '../schemas/alarmSign.schema';
import { CreateAlarmSignDto } from '../dto/alarm-signs/create.alarmSign.dto';
import { UpdateAlarmSignDto } from '../dto/alarm-signs/update.alarmSign.dto';
import { Children } from '../schemas/children.schema';


@Injectable()
export class AlarmSignsService {
  constructor(
    @InjectModel(AlarmSign.name) private alarmModel: Model<AlarmSign>,
    @InjectModel(Children.name) private childrenModel: Model<Children>,
  ) {}

  async findByChild(childId: string) {
    const existing = await this.alarmModel.findOne({ childId });
    if (existing) {
      await this.childrenModel.findByIdAndUpdate(childId, {
        'earlyDetection.signsOfAlarm': existing.signs ?? [],
      });
      return existing;
    }
    const created = new this.alarmModel({ childId, signs: [], comments: '', diagnosis: '' });
    await this.childrenModel.findByIdAndUpdate(childId, {
      'earlyDetection.signsOfAlarm': [],
    });
    return created.save();
  }

  async create(dto: CreateAlarmSignDto) {
    const created = await this.alarmModel.create(dto);
    await this.childrenModel.findByIdAndUpdate(dto.childId, {
      'earlyDetection.signsOfAlarm': created.signs ?? [],
    });
    return created;
  }

  async update(childId: string, dto: UpdateAlarmSignDto) {
    const updated = await this.alarmModel.findOneAndUpdate({ childId }, dto, { new: true, upsert: true });
    await this.childrenModel.findByIdAndUpdate(childId, {
      'earlyDetection.signsOfAlarm': updated.signs ?? [],
    });
    return updated; 
  }
}