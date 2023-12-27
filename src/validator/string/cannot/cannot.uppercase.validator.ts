import { Validator } from '../../validator';

/**
 * The cannot be upper case string validator.
 *
 * @export
 * @class CannotBeUpperCaseValidator
 * @extends {Validator}
 */
export class CannotBeUpperCaseValidator extends Validator {
  /**
   * Creates an instance of CannotBeUpperCaseValidator.
   * @param {(string | null | undefined)} message - The custom validation message.
   * @param {(string | null | undefined)} validationContext - The custom validation context.
   */
  constructor(message: string | null | undefined, validationContext: string | null | undefined) {
    super(message, validationContext);
  }
  // Public Methods (1)

  /**
   * Validates the specified value.
   *
   * @param {*} value
   * @returns {boolean} - True if the value is valid; false otherwise.
   */
  public isValid(value: any): boolean {
    if (this.utils.isNullOrUndefined(value)) {
      return true;
    } else if (typeof value === 'string') {
      if (new RegExp('[a-zA-Z]+').test(value)) {
        return value !== (<string>value).toUpperCase();
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  // Protected Methods (1)

  /**
   * Gets the default message.
   *
   * @protected
   * @returns {string} - The default message.
   */
  protected getDefaultMessage(): string {
    return 'Value cannot be upper case.';
  }
}
