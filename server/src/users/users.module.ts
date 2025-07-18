import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { Children, ChildrenSchema } from '../schemas/children.schema';
import { EmailsModule } from '../emails/emails.module';

@Module({
        imports: [
                MongooseModule.forFeature([
                        { name: User.name, schema: UserSchema },
                        { name: Children.name, schema: ChildrenSchema },
                ]),
                EmailsModule,
        ],
        controllers: [UsersController],
        providers: [UsersService],
        exports: [UsersService],
})
export class UsersModule {}
