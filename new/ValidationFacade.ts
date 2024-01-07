import { Validation } from './validation';
import { ConstraintViolation } from './ConstraintViolation';

export class ValidationFacade {
  private validation: Validation;

  constructor() {
    this.validation = Validation.getInstance();
  }

  validateModel(model: any): void {
    const violations = this.validation.validate(model);
    if (violations.size > 0) {
      let errorMessages = '';
      violations.forEach((violation: ConstraintViolation) => {
        errorMessages += violation.getMessage() + '\n';
      });
      throw new Error(errorMessages);
    }
  }
}
