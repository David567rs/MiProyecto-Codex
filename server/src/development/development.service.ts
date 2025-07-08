import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Development } from '../schemas/development.schema';
import { CreateDevelopmentDto } from '../dto/development/create.development.dto';
import { UpdateDevelopmentDto } from '../dto/development/update.development.dto';

const DEFAULT_RECORDS = [
  {
                ageBlock: '1 mes',
                milestones: [
                        {
                                area: 'Motor',
                                question: '¿Puede voltear su cabeza para los dos lados cuando está boca abajo?',
                                value: false,
                        },
                        {
                                area: 'Lenguaje',
                                question: '¿Llora o hace ruido al estar incómoda(o) o querer comer?',
                                value: false,
                        },
                        {
                                area: 'Social',
                                question: '¿Se tranquiliza al hablarle o levantarla(o)?',
                                value: false,
                        },
                ],
        },
        {
                ageBlock: '2 meses',
                milestones: [
                        {
                                area: 'Motor',
                                question: '¿Mueve brazos y piernas de forma activa?',
                                value: false,
                        },
                        {
                                area: 'Lenguaje',
                                question: '¿Hace sonidos diferentes al llanto?',
                                value: false,
                        },
                        {
                                area: 'Social',
                                question: '¿Fija la mirada en el rostro de las personas?',
                                value: false,
                        },
                ],
        },
        {
                ageBlock: '3 meses',
                milestones: [
                        {
                                area: 'Motor',
                                question: '¿Logra sostener la cabeza?',
                                value: false,
                        },
                        {
                                area: 'Lenguaje',
                                question: '¿Hace sonidos con la boca o sonríe?',
                                value: false,
                        },
                        {
                                area: 'Social',
                                question: '¿Responde cuando juegan juntos?',
                                value: false,
                        },
                ],
        },
        {
                ageBlock: '4 meses',
                milestones: [
                        {
                                area: 'Motor',
                                question: '¿Levanta la cabeza cuando esta acostado boca abajo?',
                                value: false,
                        },
                        {
                                area: 'Lenguaje',
                                question: "¿Emite sonidos como 'ah' o 'eh'?",
                                value: false,
                        },
                        {
                                area: 'Social',
                                question: '¿Sonrie espontaneamente al ver personas?',
                                value: false,
                        },
                ],
        },
        {
                ageBlock: '5 meses',
                milestones: [
                        {
                                area: 'Motor',
                                question: '¿Intenta rodar de espalda a frente?',
                                value: false,
                        },
                        {
                                area: 'Lenguaje',
                                question: '¿?',
                                value: false,
                        },
                        {
                                area: 'Social',
                                question: '¿Observa objectos en movimientos?',
                                value: false,
                        },
                ],
        },
        {
                ageBlock: '6 meses',
                milestones: [
                        {
                                area: 'Motor',
                                question: '¿Se sostiene sentado con apoyo?',
                                value: false,
                        },
                        {
                                area: 'Lenguaje',
                                question: "¿Emite sonidos dobles como'ba-ba' o 'da-da'?",
                                value: false,
                        },
                        {
                                area: 'Social',
                                question: '¿Se rie a carcajadas?',
                                value: false,
                        },
                ],
        },
        {
                ageBlock: '7 meses',
                milestones: [
                        {
                                area: 'Motor',
                                question: '¿Se voltea solo de un lado al otro?',
                                value: false,
                        },
                        {
                                area: 'Lenguaje',
                                question: '¿Imita algunos sonidos?',
                                value: false,
                        },
                        {
                                area: 'Social',
                                question: '¿Responde a su nombre?',
                                value: false,
                        },
                ],
        },
        {
                ageBlock: '8 meses',
                milestones: [
                        {
                                area: 'Motor',
                                question: '¿Se sienta sin apoyo?',
                                value: false,
                        },
                        {
                                area: 'Lenguaje',
                                question: '¿Utiliza diferentes tonos al balbucear?',
                                value: false,
                        },
                        {
                                area: 'Social',
                                question: '¿Muestra interes por juguetes?',
                                value: false,
                        },
                ],
        },
        {
                ageBlock: '9 meses',
                milestones: [
                        {
                                area: 'Motor',
                                question: '¿Se arrastra o gatea?',
                                value: false,
                        },
                        {
                                area: 'Lenguaje',
                                question: '¿Dice mamá o papá (sin significado)?',
                                value: false,
                        },
                        {
                                area: 'Social',
                                question: '¿Tiene miedo a extraños?',
                                value: false,
                        },
                ],
        },
        {
                ageBlock: '10 meses',
                milestones: [
                        {
                                area: 'Motor',
                                question: '¿Se pone de pie con ayuda?',
                                value: false,
                        },
                        {
                                area: 'Lenguaje',
                                question: "¿Entiende 'no' o su nombre?",
                                value: false,
                        },
                        {
                                area: 'Social',
                                question: "¿Juega a juegos simples como 'palmas'?",
                                value: false,
                        },
                ],
        },
        {
                ageBlock: '11 meses',
                milestones: [
                        {
                                area: 'Motor',
                                question: '¿Camina apoyado en muebles?',
                                value: false,
                        },
                        {
                                area: 'Lenguaje',
                                question: '¿Imita palabras simples?',
                                value: false,
                        },
                        {
                                area: 'Social',
                                question: '¿Entrega objetos si se le pide?',
                                value: false,
                        },
                ],
        },
        {
                ageBlock: '12 meses',
                milestones: [
                        {
                                area: 'Motor',
                                question: '¿Da pasos sin ayuda?',
                                value: false,
                        },
                        {
                                area: 'Lenguaje',
                                question: '¿Dice al menos una palabra con significado?',
                                value: false,
                        },
                        {
                                area: 'Social',
                                question: '¿Busca atención y señala cosas?',
                                value: false,
                        },
                ],
        },
];

@Injectable()
export class DevelopmentService {
        constructor(
                @InjectModel(Development.name)
                private devModel: Model<Development>,
        ) {}

        async findByChild(childId: string) {
                const existing = await this.devModel.findOne({ childId });
                if (existing) {
                        return existing;
                }
                const created = new this.devModel({
                        childId,
                        records: DEFAULT_RECORDS,
                });
                return created.save();
        }

        async create(createDto: CreateDevelopmentDto) {
                const payload = {
                        ...createDto,
                        records:
                                createDto.records &&
                                createDto.records.length > 0
                                        ? createDto.records
                                        : DEFAULT_RECORDS,
                };
                const created = new this.devModel(payload);
                return created.save();
        }

        async update(childId: string, updateDto: UpdateDevelopmentDto) {
                return this.devModel.findOneAndUpdate({ childId }, updateDto, {
                        new: true,
                        upsert: true,
                });
  }
}