import { Utils } from '../utils';
import { ValidationContext } from '../validation.context';

/**
 * The validator base class.
 *
 * @export
 * @abstract
 * @class Validator
 */
export abstract class Validator {
  protected readonly utils: Utils = Utils.getInstance();
  /**
   * The message template.
   *
   * @private
   * @type {(string | null | undefined)}
   */
  private readonly messageTemplate: string | null | undefined;

  /**
   * The  validation context.
   *
   * @type {(string | null | undefined)}
   */
  public readonly validationContext: string | null | undefined;

  /**
   * The get localized validation message template delegate.
   *
   * @static
   */
  public static getLocalizedValidationMessage: (validationMessageTemplate: string) => string | null = (message) => null;

  /**
   * Creates an instance of Validator.
   * @param {(string | null | undefined)} message - The custom validation message.
   * @param {(number | null | undefined)} validationPriority - The custom validation priority.
   */
  constructor(message: string | null | undefined, validationContext: string | null | undefined) {
    this.messageTemplate = message;

    this.validationContext = this.utils.getValueOrDefault(validationContext, ValidationContext.default);
  }

  // Public Accessors (1)

  /**
   * Gets the validation message.
   *
   * @readonly
   * @type {string}
   */
  public get message(): string {
    let messageTemplate = <string>(
      this.utils.getValueOrDefault(
        this.utils.getValueOrDefault(this.messageTemplate, this.getDefaultMessage()),
        'Undefined message.'
      )
    );
    let localizedMessage = this.localizeMessage(<string>messageTemplate) || messageTemplate;
    let formattedMessage = this.formatMessage(localizedMessage, this.getMessageParameters()) || messageTemplate;

    return formattedMessage;
  }

  // Public Abstract Methods (1)

  /**
   * Validates the specified value.
   *
   * @param {*} value
   * @returns {boolean} - True if the value is valid; false otherwise.
   */
  public abstract isValid(value: any): boolean;

  // Protected Methods (1)

  /**
   * Gets the message parameters.
   *
   * @protected
   * @returns {string} - The message parameters
   */
  protected getMessageParameters(): any[] {
    return [];
  }

  // Protected Abstract Methods (1)

  /**
   * Gets the default message.
   *
   * @protected
   * @abstract
   * @returns {string} - The default message.
   */
  protected abstract getDefaultMessage(): string;

  // Private Methods (4)

  /**
   * Replaces the placeholders in the message template with actual values.
   *
   * @private
   * @param {string} messageTemplate - The message template.
   * @param {any[]} messageParameters - The message parameters.
   * @returns
   */
  private formatMessage(messageTemplate: string, messageParameters: any[]) {
    this.utils.cannotBeNullOrEmpty(messageTemplate);

    if (!this.utils.isNullOrUndefined(messageParameters) && !this.utils.isEmpty(messageParameters)) {
      try {
        messageTemplate = this.stringFormat(
          messageTemplate,
          messageParameters.map((x) => this.toString(x))
        );
      } catch (ex) {}
    }

    return messageTemplate;
  }

  /**
   * Localizes the validation message if the get localized message delegate that provides the localized message template is set.
   *
   * @private
   * @param {string} messageTemplate - The message template.
   * @returns - The localized message.
   */
  private localizeMessage(messageTemplate: string) {
    return this.utils.isNullOrUndefined(Validator.getLocalizedValidationMessage)
      ? null
      : Validator.getLocalizedValidationMessage(messageTemplate);
  }

  /**
   * Formats the string by replacing the placeholders within the string with actual values.
   *
   * @private
   * @param {string} str - The template string.
   * @param {string[]} args - The argument values.
   * @returns
   */
  private stringFormat(str: string, args: string[]) {
    return str.replace(/{(\d+)}/g, (match, index) => args[index] || '');
  }

  /**
   * Converts the specified value to string.
   *
   * @private
   * @param {*} value - The value.
   * @returns {string} - The string representation of the value.
   */
  private toString(value: any): string {
    if (value === null) {
      return 'null';
    } else if (value === undefined) {
      return 'undefined';
    } else if (typeof value === 'function') {
      return (<Function>value).name;
    } else if (value instanceof Array) {
      if (value.length <= 10) {
        return '[' + (<[]>value).map((x) => this.toString(x)).join(', ') + ']';
      } else {
        return (
          '[' +
          (<[]>value)
            .filter((u, i) => i < 10)
            .map((x) => this.toString(x))
            .join(', ') +
          ', ...]'
        );
      }
    } else {
      return value.toString();
    }
  }
}
