import 'reflect-metadata';
import { CannotBeUpperCaseValidator } from './cannot.uppercase.validator';
import { getValidationDecorator } from '../../../validation.decorator';

/**
 * Validates that the value is not an uppercase string.
 * @export
 * @param {string} [message] - The custom validation message.
 * @param {(string | null)} [validationContext] - The custom validation context.
 * @returns - The decorator.
 */
export function CannotBeUpperCase(message?: string, validationContext?: string | null) {
  return getValidationDecorator(new CannotBeUpperCaseValidator(message, validationContext));
}
