import { Between } from './validator/Between';
import { MustMatch } from './validator/MustMatch';
import { NotNullOrEmpty } from './validator/NotNullOrEmpty';
import { Validator } from './validator/Validator';

abstract class ValidatorFactory {
  abstract create(param?: any): Validator;
}

class NotNullOrEmptyFactory extends ValidatorFactory {
  create(): Validator {
    return new NotNullOrEmpty();
  }
}

class MustMatchFactory extends ValidatorFactory {
  create(param: any): Validator {
    return new MustMatch(param);
  }
}

class BetweenFactory extends ValidatorFactory {
  create(param: any): Validator {
    return new Between(param);
  }
}

export class ValidationFactory {
  static map = new Map<String, ValidatorFactory>([
    ['Validation:NotNullOrEmpty', new NotNullOrEmptyFactory()],
    ['Validation:MustMatch', new MustMatchFactory()],
    ['Validation:Between', new BetweenFactory()],
  ]);

  public static getFactory(validatorName: string, param?: any): Validator {
    const factory = ValidationFactory.map.get(validatorName);
    return factory ? factory.create(param) : null;
  }
}
