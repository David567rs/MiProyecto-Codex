import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class AgeControl extends Document {
        @Prop({ required: true })
        childId: string;

        @Prop({ default: '' })
        name: string;

        @Prop({ default: '' })
        date: string;

        @Prop({ default: '' })
        hour: string;

        @Prop({
                type: [
                        {
                                age: { type: String },
                                weight: { type: String },
                                height: { type: String },
                                notes: { type: String },
                                medicalCheck: { type: Boolean, default: false },
                        },
                ],
                default: [],
        })
        controls: {
                age: string;
                weight: string;
                height: string;
                notes: string;
                medicalCheck: boolean;
        }[];
}

export const AgeControlSchema = SchemaFactory.createForClass(AgeControl);