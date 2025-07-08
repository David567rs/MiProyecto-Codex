import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Development extends Document {
        @Prop({ required: true })
        childId: string;

        @Prop({
                type: [
                        {
                                ageBlock: { type: String },
                                milestones: [
                                        {
                                                area: { type: String },
                                                question: { type: String },
                                                value: {
                                                        type: Boolean,
                                                        default: false,
                                                },
                                        },
                                ],
                        },
                ],
                default: [],
        })
        records: {
                ageBlock: string;
                milestones: {
                        area: string;
                        question: string;
                        value: boolean;
                }[];
        }[];
}
export const DevelopmentSchema = SchemaFactory.createForClass(Development);
