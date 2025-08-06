import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DentalRecordService } from './dental-record.service';
import { CreateDentalRecordDto } from '../dto/dental-record/create.dental-record.dto';
import { UpdateDentalRecordDto } from '../dto/dental-record/update.dental-record.dto';

@Controller('dental-record')
export class DentalRecordController {
    constructor(private service: DentalRecordService) {}

    @Get(':childId')
    async findByChild(@Param('childId') childId: string) {
        return this.service.findByChild(childId);
    }

    @Post()
    async create(@Body() createDto: CreateDentalRecordDto) {
        return this.service.create(createDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateDto: UpdateDentalRecordDto) {
        return this.service.update(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}