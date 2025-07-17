import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class AlarmSign extends Document {
  @Prop({ required: true })
  childId: string;

  @Prop({ type: [String], default: [] })
  signs: string[];

  @Prop()
  comments: string;

  @Prop()
  diagnosis: string;
}

export const AlarmSignSchema = SchemaFactory.createForClass(AlarmSign);