import {
        Injectable,
        UnauthorizedException,
        ForbiddenException,
        NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Children } from '../schemas/children.schema';
import { CreateUserDto } from '../dto/users/create.users.dto';
import { UpdateUserDto } from '../dto/users/update.users.dto';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { EmailsService } from '../emails/emails.service';

@Injectable()
export class UsersService {
        constructor(
                @InjectModel(User.name) private userModel: Model<User>,
                @InjectModel(Children.name)
                private childrenModel: Model<Children>,
                private emailsService: EmailsService,
        ) {}

        async findAll() {
                return this.userModel.find();
        }

        async create(createUser: CreateUserDto) {
                createUser.password = await bcrypt.hash(
                        createUser.password.trim(),
                        10,
                );
                createUser.email = createUser.email.toLowerCase();
                const createdUser = new this.userModel(createUser);
                const user = await createdUser.save();
                await this.emailsService.sendVerificationEmail(user.email);
                return user;
        }

        async update(id: string, updateUser: any) {
                if (updateUser.password) {
                        updateUser.password = await bcrypt.hash(
                                updateUser.password,
                                10,
                        );
                }

                return this.userModel.findByIdAndUpdate(
                        { _id: id },
                        updateUser,
                        {
                                new: true,
                        },
                );
        }

        async findAllParents() {
                const parents = await this.userModel
                        .find({ typeUser: 'paciente' })
                        .select('-password');

                const parentsWithCount = await Promise.all(
                        parents.map(async (p: any) => {
                                const count =
                                        await this.childrenModel.countDocuments(
                                                { parentId: p._id.toString() },
                                        );
                                return {
                                        ...p.toObject(),
                                        childrenCount: count,
                                };
                        }),
                );

                return parentsWithCount;
        }

        async findOne(id: string): Promise<User> {
                return await this.userModel.findById(id).exec();
        }

        async findOneByEmail(email: string) {
                return await this.userModel.findOne({ email });
        }

        async delete(id: string) {
                return this.userModel.findOneAndDelete({ _id: id });
        }

        async resetPassword(
                email: string,
                newPassword: string,
        ): Promise<boolean> {
                const user = await this.findOneByEmail(email);
                if (!user) {
                        return false;
                }
                user.password = await bcrypt.hash(newPassword, 10);
                await user.save();
                return true;
        }

        async loginWeb(email: string, password: string) {
                const user = await this.findOneByEmail(
                        email.toLocaleLowerCase().trim(), // Corregido el acceso a la función dentro del servicio
                );

                if (!user) {
                        throw new UnauthorizedException(
                                'Las credenciales no son válidas.',
                        );
                }

                const isValid = await bcrypt.compare(
                        password.trim(),
                        user.password,
                );

                if (!isValid) {
                        throw new UnauthorizedException(
                                'Las credenciales no son válidas.',
                        );
                }

                if (user.typeUser !== 'trabajador') {
                        throw new ForbiddenException(
                                'Acceso denegado para pacientes.',
                        );
                }

                delete user.password;
                return user;
        }

        async updateUserById(id: string, updateUser: UpdateUserDto) {
                const currentUser = await this.userModel.findById(id).exec();
                if (!currentUser) {
                        throw new NotFoundException(
                                `User with ID ${id} not found`,
                        );
                }

                // Filtrar los campos proporcionados
                const updates: any = {};
                for (const key in updateUser) {
                        if (updateUser[key] !== undefined) {
                                updates[key] = updateUser[key];
                        }
                }

                // Eliminar el campo password si está presente
                delete updates.password;

                return this.userModel
                        .findByIdAndUpdate(
                                id,
                                { $set: updates },
                                {
                                        new: true,
                                        runValidators: true,
                                },
                        )
                        .exec();
        }
}
