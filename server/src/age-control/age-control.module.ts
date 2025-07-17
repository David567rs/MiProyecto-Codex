import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgeControlController } from './age-control.controller';
import { AgeControlService } from './age-control.service';
import { AgeControl, AgeControlSchema } from '../schemas/agecontrol.schema';

@Module({
        imports: [
                MongooseModule.forFeature([
                        { name: AgeControl.name, schema: AgeControlSchema },
                ]),
        ],
        controllers: [AgeControlController],
        providers: [AgeControlService],
})
export class AgeControlModule {}
