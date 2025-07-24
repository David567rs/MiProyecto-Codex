import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChildrenDto } from '../dto/children/create.children.dto';
import { Children } from '../schemas/children.schema';

function calculateImc(height?: string, weight?: string): string | null {
    const h = parseFloat(height as string);
    const w = parseFloat(weight as string);
    if (!isNaN(h) && !isNaN(w) && h > 0) {
        return (w / Math.pow(h / 100, 2)).toFixed(2);
    }
    return null;
}

@Injectable()
export class ChildrenService {
        constructor(
                @InjectModel(Children.name)
                private childrenModel: Model<Children>,
        ) {}

        async findAll() {
                return this.childrenModel.find();
        }

        async create(createChildren: CreateChildrenDto) {
                if (createChildren.height && createChildren.weight) {
                        const imc = calculateImc(
                                createChildren.height,
                                createChildren.weight,
                        );
                        if (imc) {
                                createChildren.imc = imc;
                        }
                }

                const createdChildren = new this.childrenModel(createChildren);
                return createdChildren.save();
        }

        async update(id: string, updateChildren: any) {
                const current = await this.childrenModel.findById(id);

                if (current) {
                        const imc = calculateImc(
                                updateChildren.height ?? current.height,
                                updateChildren.weight ?? current.weight,
                        );
                        if (imc) {
                                updateChildren.imc = imc;
                        }
                }

                return this.childrenModel.findByIdAndUpdate(id, updateChildren, {
                        new: true,
                });
        }

        async findForParent(id: string) {
                const result = await this.childrenModel.find({ parentId: id });
                for (const child of result) {
                        if (!child.imc && child.height && child.weight) {
                                const imc = calculateImc(child.height, child.weight);
                                if (imc) {
                                        child.imc = imc;
                                }
                        }
                }
                return result;
        }

        async findOne(id: string) {
                const child = await this.childrenModel.findById({ _id: id });
                if (child && !child.imc && child.height && child.weight) {
                        const imc = calculateImc(child.height, child.weight);
                        if (imc) {
                                child.imc = imc;
                        }
                }
                return child;
        }

        async delete(id: string) {
                return await this.childrenModel.findOneAndDelete({ _id: id });
        }
}