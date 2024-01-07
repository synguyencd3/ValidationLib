import { Validation } from './validation';
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
  @MustMatch(/^[A-Za-z0-9+_.-]+@(.+)$/)
  input: string | null = null;

  @NotNullOrEmpty()
  output: any | null = null;
}

const model = new Model();
const value = 'cd.synguyengmail.com';
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
