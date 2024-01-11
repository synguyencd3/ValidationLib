import { Between } from './validator/BetweenDecorator';
import { ValidationFacade } from './ValidationFacade';
import { MustMatch } from './validator/MustMatchDecorator';
import { NotNullOrEmpty } from './validator/NotNullOrEmptyDecorator';

class NotNullOrEmptyClass {
  @NotNullOrEmpty()
  input: string;
}

class MustMatchClass {
  @MustMatch(/^[0-9]{3}$/)
  input: string;
}

class BetweenClass {
  @Between([0, 100])
  input: number;
}

const validators = {
  NotNullOrEmpty: new NotNullOrEmptyClass(),
  MustMatch: new MustMatchClass(),
  Between: new BetweenClass(),
};

export function validate(selectedValidator: string, inputValue: string, regex?: RegExp, range?: number[]) {
  // Get the selected validator function
  let model = validators[selectedValidator];

  if (selectedValidator === 'MustMatch' && regex) {
    model = new MustMatchClass();
    Reflect.defineMetadata('Validation:MustMatch', regex, model, 'input');
  }

  if (selectedValidator === 'Between' && range) {
    model = new BetweenClass();
    Reflect.defineMetadata('Validation:Between', range, model, 'input');
  }

  model.input = inputValue;

  const facade = new ValidationFacade();

  try {
    facade.validateModel(model);
    return 'Validation passed';
  } catch (error) {
    return 'Validation failed with the following violations: ' + error.message;
  }
}
