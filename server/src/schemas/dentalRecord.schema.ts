
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class DentalRecord extends Document {
    @Prop({ required: true })
    childId: string;

    @Prop()
    date: string;

    @Prop()
    observation: string;
    
    @Prop()
    visitType: string;
}

export const DentalRecordSchema = SchemaFactory.createForClass(DentalRecord);