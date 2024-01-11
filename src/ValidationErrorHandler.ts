import { ConstraintViolation } from './ConstraintViolation';
import { ErrorHandler } from './validation';

export class ThrowErrorHandler implements ErrorHandler {
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
