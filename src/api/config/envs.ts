
import * as joi from 'joi'
import { CustomError } from '../utils';

interface EnvVars {

      API_URL: string,
      POSTGRES_USER: string,
      POSTGRES_PASSWORD: string,
      POSTGRES_DB: string,
      DATABASE_URL: string,

}

const envsSchema = joi.object({

      API_URL: joi.string().required(),
      POSTGRES_USER: joi.string().required(),
      POSTGRES_PASSWORD: joi.string().required(),
      POSTGRES_DB: joi.string().required(),
      DATABASE_URL: joi.string().required(),


}).unknown(true)

const { error, value } = envsSchema.validate(process.env)

if (error) {

      throw new CustomError(500, `Config validation error: ${error.message}`)

}

const envVars: EnvVars = value;

export const envs = {

      API_URL: envVars.API_URL,
      POSTGRES_USER: envVars.POSTGRES_USER,
      POSTGRES_PASSWORD: envVars.POSTGRES_PASSWORD,
      POSTGRES_DB: envVars.POSTGRES_DB,
      DATABASE_URL: envVars.DATABASE_URL,

}