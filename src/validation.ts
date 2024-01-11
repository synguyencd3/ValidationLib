import { ConstraintViolation } from './ConstraintViolation';
import { ValidationFactory } from './ValidationFactory';

export interface ErrorHandler {
  update(constraint: ConstraintViolation): void;
}
export class Validation {
  private static instance: Validation;
  private listeners: ErrorHandler[] = [];

  private constructor() {}

  public addListener(listener: ErrorHandler): void {
    this.listeners.push(listener);
  }

  public removeListener(listener: ErrorHandler): void {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }

  public validate(target: object): Set<ConstraintViolation> {
    const set = new Set<ConstraintViolation>();
    const fields: any[] = Object.getOwnPropertyNames(target);
    for (let field of fields) {
      const result = this.validateField(target, field);
      if (result != null) {
        set.add(result);
        this.notifyListeners(result);
      }
    }
    return set;
  }

  private notifyListeners(constraint: ConstraintViolation): void {
    for (let listener of this.listeners) {
      listener.update(constraint);
    }
  }

  private validateField(target: object, field: string): ConstraintViolation {
    const annotations: any[] = Reflect.getMetadataKeys(target, field).filter((key) =>
      key.toString().startsWith('Validation')
    );
    const params: any[] = annotations
      .filter((key) => key.toString())
      .reduce((values, key) => {
        const currValues = Reflect.getMetadata(key, target, field);

        // If currValues is an array, add currValues as a single element to values
        // Ref: https://stackoverflow.com/questions/62629488/add-subarray-to-an-array-that-contains-subarrays-in-javascript
        values.push(currValues);
        return values;
      }, []);
    for (let i = 0; i < annotations.length; i++) {
      const validator = ValidationFactory.getFactory(annotations[i], params[i]);
      const constraint = validator.validate(target, field);
      if (constraint.invalid()) {
        return constraint;
      }
    }
    return null;
  }

  public static getInstance(): Validation {
    if (!Validation.instance) Validation.instance = new Validation();
    return Validation.instance;
  }
}
