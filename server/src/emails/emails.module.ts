import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { Children, ChildrenSchema } from '../schemas/children.schema'; 
import { VaccineMonth, VaccineMonthSchema } from '../schemas/vaccineMonth.schema';
import { Vaccine, VaccineSchema } from '../schemas/vaccine.schema';
import { Campaigns, CampaignsSchema } from '../schemas/campaigns.schema';
import { AgeControl, AgeControlSchema } from '../schemas/agecontrol.schema';
import { Detection, DetectionSchema } from '../schemas/detection.schema';
import { AlarmSign, AlarmSignSchema } from '../schemas/alarmSign.schema';
import { Development, DevelopmentSchema } from '../schemas/development.schema';
import { DentalRecord, DentalRecordSchema } from '../schemas/dentalRecord.schema';
import { DevelopmentModule } from '../development/development.module';
import { DevelopmentService } from '../development/development.service';
import { AlarmSignsModule } from '../alarm-signs/alarm-signs.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Children.name, schema: ChildrenSchema },
      { name: VaccineMonth.name, schema: VaccineMonthSchema },
      { name: Vaccine.name, schema: VaccineSchema },
      { name: Campaigns.name, schema: CampaignsSchema },
      { name: AgeControl.name, schema: AgeControlSchema },
      { name: Detection.name, schema: DetectionSchema },
      { name: AlarmSign.name, schema: AlarmSignSchema },
      { name: Development.name, schema: DevelopmentSchema },
      { name: DentalRecord.name,   schema: DentalRecordSchema   },
    ]),
    
     AlarmSignsModule, 
     DevelopmentModule,

  ],
  providers: [EmailsService, DevelopmentService],
  controllers: [EmailsController],
  exports: [EmailsService],
})
export class EmailsModule {}
