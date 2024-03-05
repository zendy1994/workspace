import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'AWS_CONFIG',
      useFactory: async (configService: ConfigService) => ({
        accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
        region: configService.get<string>('AWS_REGION'),
      }),
      inject: [ConfigService],
    },
    {
      provide: 'AWS',
      useFactory: async (awsConfig) => {
        config.update(awsConfig);
        return config;
      },
      inject: ['AWS_CONFIG'],
    },
  ],
  exports: ['AWS'],
})
export class AwsModule {}
