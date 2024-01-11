import { Validation } from './validation';
import { ThrowErrorHandler } from './ValidationErrorHandler';

export class ValidationFacade {
  private validation: Validation;
  private errorHandler: ThrowErrorHandler;

  constructor() {
    this.validation = Validation.getInstance();
    this.errorHandler = new ThrowErrorHandler();
    this.validation.addListener(this.errorHandler);
  }

  validateModel(model: any): void {
    this.validation.validate(model);
    this.errorHandler.throwErrorIfAny();
  }
}
