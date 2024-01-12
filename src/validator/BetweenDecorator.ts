import 'reflect-metadata';

export function Between(range: [lower: any, upper: any]) {
  return (target: Object, propertyKey: string) =>
    Reflect.defineMetadata("Validation:Between", range, target, propertyKey);
}