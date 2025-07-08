import {
        Module,
        MiddlewareConsumer,
        NestModule,
        RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { CorsMiddleware } from './cors.middleware';
import { ParentsModule } from './parents/parents.module';
import { VaccinesModule } from './vaccines/vaccines.module';
import { UsersModule } from './users/users.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { ChildrenModule } from './children/children.module';
import { HospitalsModule } from './hospitals/hospitals.module';
import { AuthModule } from './auth/auth.module';
import { VaccineMonthModule } from './vaccine-month/vaccine-month.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { EmailsModule } from './emails/emails.module';
import { DevelopmentModule } from './development/development.module';

@Module({
        imports: [
                // 🔐  Variables de entorno disponibles para toda la app
                ConfigModule.forRoot({ isGlobal: true }),

                //                  🔗  Conexión a MongoDB
                MongooseModule.forRoot(process.env.MONGO_URI),

                // 🧩  Resto de módulos de la aplicación
                ParentsModule,
                VaccinesModule,
                UsersModule,
                CampaignsModule,
                ChildrenModule,
                HospitalsModule,
                AuthModule,
                VaccineMonthModule,
                CloudinaryModule,
                EmailsModule,
                DevelopmentModule,
        ],
})
export class AppModule implements NestModule {
        configure(consumer: MiddlewareConsumer) {
                consumer.apply(CorsMiddleware).forRoutes({
                        path: '*',
                        method: RequestMethod.ALL,
                });
        }
}
