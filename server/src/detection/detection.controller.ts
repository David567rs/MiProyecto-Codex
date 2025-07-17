import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { DetectionService } from './detection.service';
import { CreateDetectionDto } from '../dto/detection/create.detection.dto';
import { UpdateDetectionDto } from '../dto/detection/update.detection.dto';

@Controller('detection')
export class DetectionController {
        constructor(private readonly detectionService: DetectionService) {}

        @Get(':childId')
        async getByChild(@Param('childId') childId: string) {
                return this.detectionService.findByChild(childId);
        }

        @Post()
        async create(@Body() createDto: CreateDetectionDto) {
                return this.detectionService.create(createDto);
        }

        @Put(':childId')
        async update(
                @Param('childId') childId: string,
                @Body() updateDto: UpdateDetectionDto,
        ) {
                return this.detectionService.update(childId, updateDto);
  }
}