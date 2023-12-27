import 'reflect-metadata';
import { ValidatorError } from './errors/validator.error';
import { IValidatable } from './ivalidatable';
import { ValidationMessage } from './validation.message';
import { ValidationMessageCollection } from './validation.message.collection';
import { Validator } from './validator/validator';
import { Utils } from './utils';
import { ValidationContext } from './validation.context';

/**
 * The validatable extensions.
 *
 * @export
 * @abstract
 * @class ValidatableExtensions
 */
export abstract class ValidatableExtensions {
  private static readonly utils: Utils = Utils.getInstance();

  /**
   * Validates the specified property for the specified validation source. If no property name is provided, all properties are validated.
   *
   * @param {string} [propertyName] - The validation source.
   * @param {string} [propertyName] - The property name.
   * @param {string[]} [validationContexts] - The validation contexts.
   * @returns {ValidationMessageCollection} - The validation messages.
   */
  public static validate(
    validationSource: IValidatable,
    propertyName?: string,
    validationContexts?: string[]
  ): ValidationMessageCollection {
    const { cannotBeNullOrEmpty, getValueOrDefault, isNullOrUndefined } = this.utils;
    cannotBeNullOrEmpty(validationSource);
    propertyName = <string>getValueOrDefault(propertyName, null);
    validationContexts = <string[]>getValueOrDefault(validationContexts, []);

    if (isNullOrUndefined(propertyName)) {
      return ValidatableExtensions.validateObject(validationSource, validationContexts);
    } else {
      return ValidatableExtensions.validateProperty(validationSource, propertyName, validationContexts);
    }
  }

  /**
   * Get the list of validators for the specified property in the specified validation source.
   *
   * @private
   * @static
   * @param {IValidatable} validationSource - The validation source.
   * @param {string} propertyName - The property name.
   * @returns {Validator[]} - The list of validators.
   */
  private static getValidators(validationSource: IValidatable, propertyName: string): Validator[] {
    this.utils.cannotBeNullOrEmpty(validationSource);
    this.utils.cannotBeNullOrEmpty(propertyName);

    return <Validator[]>Reflect.getMetadataKeys(validationSource, propertyName)
      .filter((x) => typeof x === 'string')
      .map((x) => Reflect.getMetadata(x, validationSource, propertyName));
  }

  /**
   * Validates the validators for the specified property, property value and validation context in the specified validation source.
   *
   * @private
   * @static
   * @param {IValidatable} validationSource - The validation source.
   * @param {string} propertyName - The property name.
   * @param {*} propertyValue - The property value.
   * @param {(string | null)} validationContext - The validation context.
   * @returns {ValidationMessageCollection} - The validation messages.
   */
  private static validateValidators(
    validationSource: IValidatable,
    propertyName: string,
    propertyValue: any,
    validationContext: string | null
  ): ValidationMessageCollection {
    this.utils.cannotBeNullOrEmpty(validationSource);
    this.utils.cannotBeNullOrEmpty(propertyName);

    let validationMessages = [];
    let isValid = false;

    for (let validator of ValidatableExtensions.getValidators(validationSource, propertyName)) {
      if (validator.validationContext === validationContext) {
        try {
          isValid = validator.isValid(propertyValue);
        } catch (ex) {
          throw new ValidatorError(
            'Unhandled validator error occurred.',
            typeof validator,
            typeof validationSource,
            propertyName,
            ex
          );
        }

        if (!isValid) {
          validationMessages.push(
            new ValidationMessage(validator.message, validationSource, propertyName, validator.validationContext)
          );
        }
      }
    }

    return new ValidationMessageCollection(validationMessages);
  }

  /**
   * Validates the specified validation source for the specified validation contexts.
   *
   * @private
   * @static
   * @param {IValidatable} validationSource - The validation source.
   * @param {string[]} validationContexts - The validation contexts.
   * @returns - The validation messages.
   */
  private static validateObject(validationSource: IValidatable, validationContexts: string[]) {
    this.utils.cannotBeNullOrEmpty(validationSource);

    let validationMessages = [];
    let propertyNames = Object.keys(validationSource);

    for (let propertyName of propertyNames) {
      for (let message of ValidatableExtensions.validateProperty(
        validationSource,
        propertyName,
        validationContexts
      ).toArray()) {
        validationMessages.push(message);
      }
    }

    return new ValidationMessageCollection(validationMessages);
  }

  /**
   * Validates the specified property in the specified validation source for the specified validation contexts.
   *
   * @private
   * @static
   * @param {IValidatable} validationSource - The validation source.
   * @param {string} propertyName - The property name.
   * @param {((string | null)[])} validationContexts - The validation contexts.
   * @returns {ValidationMessageCollection} - The validation messages.
   */
  private static validateProperty(
    validationSource: IValidatable,
    propertyName: string,
    validationContexts: (string | null)[]
  ): ValidationMessageCollection {
    this.utils.cannotBeNullOrEmpty(validationSource);
    this.utils.cannotBeNullOrEmpty(propertyName);

    let validationMessages = [];
    let propertyValue: any;

    let propertyNames = Object.getOwnPropertyNames(validationSource);

    if (propertyNames.some((x) => x === propertyName)) {
      propertyValue = Reflect.get(validationSource, propertyName);

      validationContexts = validationContexts;
      validationContexts.push(ValidationContext.default); // add default context
      validationContexts = validationContexts.filter((value, index, self) => self.indexOf(value) === index); // distinct

      for (let validationContext of validationContexts) {
        for (let message of ValidatableExtensions.validateValidators(
          validationSource,
          propertyName,
          propertyValue,
          validationContext
        ).toArray()) {
          validationMessages.push(message);
        }
      }
    }

    return new ValidationMessageCollection(validationMessages);
  }
}
