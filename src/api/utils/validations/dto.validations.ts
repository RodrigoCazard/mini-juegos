import { CustomError } from "../errors/custom.errors";

export class DtoValidations {

      protected _allowedProperties: Array<keyof this> = [];

      constructor() { }

      protected _validateRequiredFields(fields: Array<keyof this>) {

            for (const field of fields) {

                  if (!this[field]) {

                        throw new CustomError(400, `The field ${field as string} is required`);

                  }

            }

      }

      protected _validateMinLength(key: keyof this, min: number) {

            const value = this[key];

            if (typeof value === 'string' && value.length < min) {

                  throw new CustomError(400, `The ${key as string} must have at least ${min} characters`);

            }

      }

      protected _validateNoAdditionalProperties() {

            const bodyKeys = Object.keys(this).filter((key) => !key.startsWith('_'));

            for (const key of bodyKeys) {

                  if (!this._allowedProperties.includes(key as keyof this)) {

                        throw new CustomError(400, `The property ${key as string} is not allowed`);

                  }

            }

      }

      protected _validateMinValue(key: keyof this, min: number) {

            const value = this[key];

            if (typeof value === 'number' && value < min) {

                  throw new CustomError(400, `The ${key as string} must be at least ${min}`);

            }

      }

      protected _validateMaxValue(key: keyof this, max: number) {

            const value = this[key];

            if (typeof value === 'number' && value > max) {

                  throw new CustomError(400, `The ${key as string} must be at most ${max}`);

            }

      }

      protected _validateEmail(key: keyof this) {

            const value = this[key];

            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

            if (!emailRegex.test(value as string)) {

                  throw new CustomError(400, `The ${key as string} is not a valid email`);

            }

      }

}
