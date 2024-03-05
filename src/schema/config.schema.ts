import * as Joi from '@hapi/joi';

let environment = 'development';
if (process.env.NODE_ENV) {
  environment = process.env.NODE_ENV;
}

const commonValidation = {
  SENTRY_DNS: Joi.string().required(),
  JWT_SECRET_KEY: Joi.string().required(),
  JWT_EXPIRES_TIME: Joi.string().required(),
  AWS_REGION: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
  EMAIL_VERIFY_OTP: Joi.string().required(),
  EMAIL_PASSWORD_VERIFY_OTP: Joi.string().required(),
};

let configValidation;

if (['staging', 'production'].includes(environment)) {
  configValidation = {
    DATABASE_URL: Joi.string().required(),
    ...commonValidation,
  };
} else {
  configValidation = {
    PORT: Joi.number(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432).required(),
    DB_NAME: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    ...commonValidation,
  };
}

export const configValidationSchema = Joi.object(configValidation);
