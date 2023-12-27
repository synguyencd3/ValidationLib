import { Utils } from './utils';
import { ValidationMessage } from './validation.message';

/**
 * The validation message collection.
 *
 * @export
 * @class ValidationMessageCollection
 */
export class ValidationMessageCollection {
  private readonly utils: Utils = Utils.getInstance();

  /**
   * The validation messages.
   *
   * @private
   * @type {ValidationMessage[]}
   */
  private readonly validationMessages: ValidationMessage[] = [];

  // Constructors (1)

  /**
   * Creates an instance of ValidationMessageCollection.
   * @param {ValidationMessage[]} validationMessages
   */
  constructor(validationMessages: ValidationMessage[]) {
    validationMessages = validationMessages ? validationMessages : [];

    // make a copy of the array
    validationMessages = validationMessages.concat([]);

    // remove null and undefined values
    for (let i = validationMessages.length - 1; i >= 0; i--) {
      if (this.utils.isNullOrUndefined(validationMessages[i])) {
        validationMessages.splice(i, 1);
      }
    }

    // remove duplicates
    for (let i = validationMessages.length - 1; i >= 0; i--) {
      for (let j = i - 1; j >= 0; j--) {
        if (
          validationMessages[i].validationSource === validationMessages[j].validationSource &&
          validationMessages[i].propertyName === validationMessages[j].propertyName &&
          validationMessages[i].validationContext === validationMessages[j].validationContext &&
          validationMessages[i].message === validationMessages[j].message
        ) {
          validationMessages.splice(i, 1);

          break;
        }
      }
    }

    this.validationMessages = validationMessages;
  }

  /**
   * Compares two numbers.
   *
   * @private
   * @param {number} a - The first number.
   * @param {number} b - The second number.
   * @returns - 1 if a > b, -1 if b < a, 0 otherwise.
   */
  private compare(a: number, b: number) {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  }

  // Public Accessors (8)
  /**
   * Gets the first validation message in the collection.
   *
   * @readonly
   */
  public get first() {
    return this.validationMessages.length > 0 ? this.validationMessages[0] : null;
  }

  /**
   * Checks if the collection contains any error validation messages.
   *
   * @returns {boolean} - True if the validation message collection contains error messages; false otherwise.
   */
  public get hasErrors(): boolean {
    return this.validationMessages.length > 0;
  }

  /**
   * Gets the length of all the validation messages.
   *
   * @readonly
   */
  public get length() {
    return this.validationMessages.length;
  }

  /**
   * Filters validation messages by property name.
   *
   * @param {string} propertyName
   * @returns - The validation message collection.
   */
  public filter(propertyName: string) {
    this.utils.cannotBeNullOrEmpty(propertyName);

    return new ValidationMessageCollection(
      this.validationMessages.filter((validationMessage, i, array) => validationMessage.propertyName === propertyName)
    );
  }

  /**
   * Gets the validation message by the specified index.
   *
   * @param {number} index - The index.
   * @returns - The validation message at the specified index or null if index is outside of bounds of the array.
   */
  public get(index: number) {
    if (!this.utils.isTypeOf(index, 'number')) {
      throw new TypeError('Index must be a number.');
    }

    if (index >= 0 && index < this.validationMessages.length) {
      return this.validationMessages[index];
    } else {
      return null;
    }
  }

  /**
   * Converts validation messages as an array.
   *
   * @returns - The array representation of the validation messages collection.
   */
  public toArray() {
    return this.validationMessages.concat([]);
  }

  /**
   * Converts validation messages to a string.
   *
   * @returns - The string representation of the validation message collection.
   */
  public toString() {
    return this.validationMessages.map((x) => x.message).join('\n');
  }
}
