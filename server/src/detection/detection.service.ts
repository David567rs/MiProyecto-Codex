import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Detection } from '../schemas/detection.schema';
import { CreateDetectionDto } from '../dto/detection/create.detection.dto';
import { UpdateDetectionDto } from '../dto/detection/update.detection.dto';

const DEFAULT_QUESTIONS = [
        '¿Las heces del bebé (popó) son blancas o muy claras?',
        '¿El color de la piel o de los ojos es amarillo (ictericia) después del primer mes?',
        '¿El bebé orina poco o casi nada?',
        '¿Tiene el abdomen muy inflamado?',
];

@Injectable()
export class DetectionService {
        constructor(
                @InjectModel(Detection.name)
                private detectionModel: Model<Detection>,
        ) {}

        async;
        async findByChild(childId: string) {
                const existing = await this.detectionModel.findOne({ childId });
                if (existing) return existing;
                const responses = DEFAULT_QUESTIONS.map((q) => ({
                        question: q,
                        value: false,
                }));
                const created = new this.detectionModel({
                        childId,
                        responses,
                        observations: '',
                        suspect: false,
                });
                return created.save();
        }

        async create(createDto: CreateDetectionDto) {
                const payload = {
                        ...createDto,
                        responses:
                                createDto.responses &&
                                createDto.responses.length > 0
                                        ? createDto.responses
                                        : DEFAULT_QUESTIONS.map((q) => ({
                                                  question: q,
                                                  value: false,
                                          })),
                };
                const created = new this.detectionModel(payload);
                return created.save();
        }

        async update(childId: string, updateDto: UpdateDetectionDto) {
                return this.detectionModel.findOneAndUpdate(
                        { childId },
                        updateDto,
                        {
                                new: true,
                                upsert: true,
                        },
                );
        }
}
