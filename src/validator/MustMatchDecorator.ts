import 'reflect-metadata';

export function MustMatch(regex: RegExp)
{
  return (target: Object, propertyKey: string) => Reflect.defineMetadata("Validation:MustMatch", regex, target, propertyKey); 
}