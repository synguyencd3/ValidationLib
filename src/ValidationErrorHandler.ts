import { ConstraintViolation } from './ConstraintViolation';
import { ValidationObserver } from './validation';

export class ValidationErrorHandler implements ValidationObserver {
  private errorMessages = '';

  update(constraint: ConstraintViolation): void {
    this.errorMessages += constraint.getMessage() + '\n';
  }

  throwErrorIfAny(): void {
    if (this.errorMessages) {
      throw new Error(this.errorMessages);
    }
  }
}
