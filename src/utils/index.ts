import { ArgumentError } from '../errors/argument.error';

export class Utils {
  private static instance: Utils;

  private constructor() {
    // Private constructor to prevent instantiation outside the class
  }

  public static getInstance(): Utils {
    if (!Utils.instance) {
      Utils.instance = new Utils();
    }
    return Utils.instance;
  }

  isNullOrUndefined = <T>(value: T | null | undefined): boolean => {
    return value === null || value === undefined;
  };

  isTypeOf = <T>(value: T | null | undefined, type: string | null | undefined): boolean => {
    if (this.isNullOrUndefined(value)) {
      return false;
    }

    return typeof value === type;
  };

  isEmpty = <T>(value: T | null | undefined): boolean => {
    if (this.isNullOrUndefined(value)) {
      return false;
    }

    if (this.isTypeOf(value, 'string')) {
      return (<string>value).length === 0;
    }

    if (this.isTypeOf(value, 'Array')) {
      return (<Array<any>>value).length === 0;
    }

    return false;
  };

  mustBeTypeOf = <T>(value: T | null | undefined, type: string | null | undefined): T | null | undefined => {
    if (!this.isTypeOf(value, type)) {
      throw new ArgumentError(`Value must be of type ${type}.`);
    }

    return value;
  };

  getValueOrDefault = <T>(value: T | null | undefined, defaultValue: T | null | undefined): T | null | undefined => {
    if (this.isNullOrUndefined(value)) {
      return defaultValue;
    }

    return value;
  };

  cannotBeNullOrEmpty = <T>(value: T | null | undefined): T => {
    if (this.isNullOrUndefined(value)) {
      throw new ArgumentError('Value cannot be null or empty.');
    }

    if (this.isEmpty(value)) {
      throw new ArgumentError('Value cannot be null or empty.');
    }

    return value;
  };
}
