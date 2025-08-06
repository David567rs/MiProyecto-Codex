import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Development, DevelopmentSchema } from '../schemas/development.schema';
import { DevelopmentController } from './development.controller';
import { DevelopmentService } from './development.service';

@Module({
        imports: [
                MongooseModule.forFeature([
                        { name: Development.name, schema: DevelopmentSchema },
                ]),
        ],
        controllers: [DevelopmentController],
        providers: [DevelopmentService],
        exports: [DevelopmentService],
})
export class DevelopmentModule {}
