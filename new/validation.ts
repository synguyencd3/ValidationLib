import { ConstraintViolation } from './ConstraintViolation';
import { ValidationFactory } from './ValidationFactory';

export interface ValidationObserver {
  update(constraint: ConstraintViolation): void;
}
export class Validation {
  private static instance: Validation;
  private observers: ValidationObserver[] = [];

  private constructor() {}

  public addObserver(observer: ValidationObserver): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: ValidationObserver): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  public validate(target: object): Set<ConstraintViolation> {
    const set = new Set<ConstraintViolation>();
    const fields: any[] = Object.getOwnPropertyNames(target);
    for (let field of fields) {
      const result = this.validateField(target, field);
      if (result != null) {
        set.add(result);
        this.notifyObservers(result);
      }
    }
    return set;
  }

  private notifyObservers(constraint: ConstraintViolation): void {
    for (let observer of this.observers) {
      observer.update(constraint);
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
        return values.concat(currValues);
      }, []);
    for (let i = 0; i < annotations.length; i++) {
      const validator = ValidationFactory.create(annotations[i], params[i]);
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
