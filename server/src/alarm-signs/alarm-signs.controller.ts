import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { AlarmSignsService } from './alarm-signs.service';
import { CreateAlarmSignDto } from '../dto/alarm-signs/create.alarmSign.dto';
import { UpdateAlarmSignDto } from '../dto/alarm-signs/update.alarmSign.dto';

@Controller('alarm-signs')
export class AlarmSignsController {
        constructor(private service: AlarmSignsService) {}

        @Get(':childId')
        async getByChild(@Param('childId') childId: string) {
                return this.service.findByChild(childId);
        }

        @Post()
        async create(@Body() dto: CreateAlarmSignDto) {
                return this.service.create(dto);
        }

        @Put(':childId')
        async update(
                @Param('childId') childId: string,
                @Body() dto: UpdateAlarmSignDto,
        ) {
                return this.service.update(childId, dto);
        }
}
