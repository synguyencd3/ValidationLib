import { IValidatable } from './ivalidatable';
import { ValidationContext } from './validation.context';

/**
 * The validation message.
 *
 * @export
 * @class ValidationMessage
 */
export class ValidationMessage {
  /**
   * The validation message.
   *
   * @type {string}
   */
  public readonly message: string;
  /**
   * The property name.
   *
   * @type {string}
   */
  public readonly propertyName: string;
  /**
   * The validation context.
   *
   * @type {(string | null)}
   */
  public readonly validationContext: string | null;
  /**
   * The validation source.
   *
   * @type {IValidatable}
   */
  public readonly validationSource: IValidatable;

  /**
   * Creates an instance of ValidationMessage.
   * @param {string} message - The validation message.
   * @param {IValidatable} validationSource - The validation source.
   * @param {string} propertyName - The validated property name.
   * @param {(string | null)} [validationContext] - The validation context.
   */
  constructor(
    message: string,
    validationSource: IValidatable,
    propertyName: string,
    validationContext: string | null = ValidationContext.default
  ) {
    this.message = message;
    this.validationSource = validationSource;
    this.propertyName = propertyName;
    this.validationContext = validationContext;
  }
}
