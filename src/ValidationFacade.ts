import { Validation } from './validation';
import { ValidationErrorHandler } from './ValidationErrorHandler';

export class ValidationFacade {
  private validation: Validation;
  private errorHandler: ValidationErrorHandler;

  constructor() {
    this.validation = Validation.getInstance();
    this.errorHandler = new ValidationErrorHandler();
    this.validation.addObserver(this.errorHandler);
  }

  validateModel(model: any): void {
    this.validation.validate(model);
    this.errorHandler.throwErrorIfAny();
  }
}
