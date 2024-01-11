import 'reflect-metadata';

export function Between(range: [number, number]) {
  console.log(range);
  return (target: Object, propertyKey: string) =>
    Reflect.defineMetadata("Validation:Between", range, target, propertyKey);
}