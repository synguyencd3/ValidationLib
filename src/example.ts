import { NotNullOrEmpty } from './validator/NotNullOrEmptyDecorator';
import { MustMatch } from './validator/MustMatchDecorator';
import { ValidationFacade } from './ValidationFacade';

// function CannotBeUpperCase(message?: string){
//   return (target: Object, propertyKey: string) => Reflect.defineMetadata("Validation:CannotBeUpperCase", "", target, propertyKey);
//   //return (target: Object, propertyKey: string) => Reflect.defineMetadata("CannotBeUpperCaseValidator", new  CannotBeUpperCaseValidator(message,null), target, propertyKey);
//   //Reflect.defineMetadata("Validation", "Validate", target, propertyKey);
// }

export class Model {
  @NotNullOrEmpty()
  @MustMatch(/^[a-z]+$/)
  input: string | null = null;

  @NotNullOrEmpty()
  output: any | null = 1;
}

const model = new Model();
const value = '123';
model.input = value;
//model.output = 14;

const facade = new ValidationFacade();
try {
  facade.validateModel(model);
  console.log('Validation passed');
} catch (error) {
  console.log('Validation failed with the following violations:');
  console.log(error.message);
}
