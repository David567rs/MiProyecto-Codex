import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Detection extends Document {
        @Prop({ required: true })
        childId: string;

        @Prop({
                type: [
                        {
                                question: { type: String },
                                value: { type: Boolean, default: false },
                        },
                ],
                default: [],
        })
        responses: { question: string; value: boolean }[];

        @Prop({ default: '' })
        observations: string;

        @Prop({ default: false })
        suspect: boolean;
}

export const DetectionSchema = SchemaFactory.createForClass(Detection);
