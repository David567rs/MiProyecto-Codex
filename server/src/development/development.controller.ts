import { Controller, Get, Param, Put, Body, Post } from '@nestjs/common';
import { DevelopmentService } from './development.service';
import { UpdateDevelopmentDto } from '../dto/development/update.development.dto';
import { CreateDevelopmentDto } from '../dto/development/create.development.dto';

@Controller('development')
export class DevelopmentController {
        constructor(private developmentService: DevelopmentService) {}

        @Get(':childId')
        async getByChild(@Param('childId') childId: string) {
                return this.developmentService.findByChild(childId);
        }

        @Post()
        async create(@Body() createDto: CreateDevelopmentDto) {
                return this.developmentService.create(createDto);
        }

        @Put(':childId')
        async update(
                @Param('childId') childId: string,
                @Body() updateDto: UpdateDevelopmentDto,
        ) {
                return this.developmentService.update(childId, updateDto);
        }
}

