import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AgeControlService } from './age-control.service';
import { CreateAgeControlDto } from '../dto/age-control/create.age-control.dto';
import { UpdateAgeControlDto } from '../dto/age-control/update.age-control.dto';

@Controller('age-control')
export class AgeControlController {
        constructor(private ageService: AgeControlService) {}

        @Get(':childId')
        async getByChild(@Param('childId') childId: string) {
                return this.ageService.findByChild(childId);
        }

        @Post()
        async create(@Body() createDto: CreateAgeControlDto) {
                return this.ageService.create(createDto);
        }

        @Put(':childId')
        async update(
                @Param('childId') childId: string,
                @Body() updateDto: UpdateAgeControlDto,
        ) {
                return this.ageService.update(childId, updateDto);
        }
}
