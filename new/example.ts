
import { validation } from "./validation";
import { NotNullOrEmpty } from "./validator/NotNullOrEmptyDecorator";
import { MustMatch } from "./validator/MustMatchDecorator";


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
const value = 'cd.synguyen@gmail.com';
model.input = value;
//model.output = 14;


 var valid = new validation;
 const violations = valid.validate(model);
  if (violations.size==0)
  {
    console.log("valid");
  } 
  else
  {
    console.log("invalid")
  }