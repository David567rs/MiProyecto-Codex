import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AgeControl } from '../schemas/agecontrol.schema';
import { CreateAgeControlDto } from '../dto/age-control/create.age-control.dto';
import { UpdateAgeControlDto } from '../dto/age-control/update.age-control.dto';

const DEFAULT_ROWS = [
  { age: '', weight: '', height: '', notes: '', medicalCheck: false },
];

@Injectable()
export class AgeControlService {
  constructor(
    @InjectModel(AgeControl.name)
    private ageModel: Model<AgeControl>,
  ) {}

  async findByChild(childId: string) {
    const existing = await this.ageModel.findOne({ childId });
    if (existing) return existing;
    const created = new this.ageModel({
      childId,
      name: '',
      date: '',
      hour: '',
      controls: DEFAULT_ROWS,
    });
    return created.save();
  }

  async create(createDto: CreateAgeControlDto) {
    const payload = {
      ...createDto,
      controls:
        createDto.controls && createDto.controls.length > 0
          ? createDto.controls
          : DEFAULT_ROWS,
    };
    const created = new this.ageModel(payload);
    return created.save();
  }

  async update(childId: string, updateDto: UpdateAgeControlDto) {
    return this.ageModel.findOneAndUpdate({ childId }, updateDto, {
      new: true,
      upsert: true,
    });
  }
}