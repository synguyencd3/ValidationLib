import { Validator } from './validator/validator';

/**
 * Gets the validation decorator.
 *
 * @static
 * @param {Validator} validator - The validator instance.
 * @returns - The validation decorator instance.
 */
export function getValidationDecorator(validator: Validator) {
  let validatorKey = validator.constructor.name;

  return (target: Object, propertyKey: string) => Reflect.defineMetadata(validatorKey, validator, target, propertyKey);
}
