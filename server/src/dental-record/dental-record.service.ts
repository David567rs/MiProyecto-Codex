import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DentalRecord } from '../schemas/dentalRecord.schema';
import { CreateDentalRecordDto } from '../dto/dental-record/create.dental-record.dto';
import { UpdateDentalRecordDto } from '../dto/dental-record/update.dental-record.dto';

@Injectable()
export class DentalRecordService {
    constructor(
        @InjectModel(DentalRecord.name)
        private recordModel: Model<DentalRecord>,
    ) {}

    async findByChild(childId: string) {
        return this.recordModel.find({ childId }).sort({ date: 1 });
    }

    async create(createDto: CreateDentalRecordDto) {
        const created = new this.recordModel(createDto);
        return created.save();
    }

    async update(id: string, updateDto: UpdateDentalRecordDto) {
        return this.recordModel.findByIdAndUpdate(id, updateDto, { new: true });
    }

    async remove(id: string) {
        return this.recordModel.findByIdAndDelete(id);
    }
}