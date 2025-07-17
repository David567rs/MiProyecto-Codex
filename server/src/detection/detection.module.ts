import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DetectionController } from './detection.controller';
import { DetectionService } from './detection.service';
import { Detection, DetectionSchema } from '../schemas/detection.schema';

@Module({
        imports: [
                MongooseModule.forFeature([
                        { name: Detection.name, schema: DetectionSchema },
                ]),
        ],
        controllers: [DetectionController],
        providers: [DetectionService],
})
export class DetectionModule {}
