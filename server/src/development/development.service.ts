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
            { area: 'Motor', question: '¿Puede voltear su cabeza para los dos lados cuando está boca abajo?', value: false },
            { area: 'Lenguaje', question: '¿Llora o hace ruido al estar incómoda(o) o querer comer?', value: false },
            { area: 'Social', question: '¿Se tranquiliza al hablarle o levantarla(o)?', value: false },
          ],
        },
        {
          ageBlock: '3 meses',
          milestones: [
            { area: 'Motor', question: '¿Logra sostener la cabeza?', value: false },
            { area: 'Lenguaje', question: '¿Hace sonidos con la boca o sonríe?', value: false },
            { area: 'Social', question: '¿Responde cuando juegan juntos?', value: false },
          ],
        },
        {
          ageBlock: '6 meses',
          milestones: [
            { area: 'Motor', question: '¿Se mantiene sentada(o), aunque sea apoyándose en sus manos?', value: false },
            { area: 'Lenguaje', question: '¿Imita sonidos como “le, be, pa, gu”?', value: false },
            { area: 'Social', question: '¿Se ríe cuando juegas a taparte y destaparte la cara?', value: false },
          ],
        },
        {
          ageBlock: '12 meses',
          milestones: [
            { area: 'Motor', question: '¿Puede caminar agarrado de muebles?', value: false },
            { area: 'Lenguaje', question: '¿Cuándo está entretenida(o) y se le dice “NO” reacciona?', value: false },
            { area: 'Social', question: '¿Empieza a comer por sí sola(o)?', value: false },
          ],
        },
        {
          ageBlock: '18 meses',
          milestones: [
            { area: 'Motor', question: '¿Camina sola(o)?', value: false },
            { area: 'Lenguaje', question: '¿Dice cuatro palabras, además de mamá o papá?', value: false },
            { area: 'Social', question: '¿Imita tareas sencillas de casa, como: barrer o limpiar?', value: false },
          ],
        },
        {
          ageBlock: '2 años',
          milestones: [
            { area: 'Motor', question: '¿Puede subirse sola(o) a las sillas, sillones, camas?', value: false },
            { area: 'Lenguaje', question: '¿Obedece órdenes sencillas, como “dame la pelota”?', value: false },
            { area: 'Social', question: '¿Hace intentos por ser independiente? (lavarse las manos, vestirse)', value: false },
          ],
        },
        // Sigue el bloque siguiente...
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