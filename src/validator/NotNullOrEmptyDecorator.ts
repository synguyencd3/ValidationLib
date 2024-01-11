import 'reflect-metadata';

export function NotNullOrEmpty(){
    return (target: Object, propertyKey: string) => Reflect.defineMetadata("Validation:NotNullOrEmpty", "", target, propertyKey); 
  }