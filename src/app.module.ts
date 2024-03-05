import { AppController } from '@/app.controller';
import { AuthModule } from '@/app/auth/auth.module';
import { FileModule } from '@/app/file/file.module';
import { FollowModule } from '@/app/follow/follow.module';
import { OtpModule } from '@/app/otp/otp.module';
import { UserModule } from '@/app/user/user.module';
import { AwsModule } from '@/aws/aws.module';
import configuration from '@/config/configuration';
import { DatabaseModule } from '@/database/database.module';
import { configValidationSchema } from '@/schema/config.schema';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: `src/config/environments/${process.env.NODE_ENV}.env`,
      validationSchema: configValidationSchema,
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    AuthModule,
    UserModule,
    FileModule,
    OtpModule,
    FollowModule,
    AwsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
