import { validate } from './example';

// Expose the validate function to the global scope
(window as any).validate = function () {
  const selectedValidator = (document.getElementById('validatorSelect') as HTMLSelectElement).value;
  const inputValue = (document.getElementById('inputValue') as HTMLInputElement).value;
  const regexInput = (document.getElementById('regexInput') as HTMLInputElement).value;
  const messageElement = document.getElementById('message') as HTMLParagraphElement;

  const regex = selectedValidator === 'MustMatch' ? new RegExp(regexInput) : undefined;
  const msg = validate(selectedValidator, inputValue, regex);

  messageElement.innerText = msg;
};

(window as any).toggleRegexInput = function () {
  const selectedValidator = (document.getElementById('validatorSelect') as HTMLSelectElement).value;
  const regexInput = document.getElementById('regexInput') as HTMLInputElement;

  if (selectedValidator === 'MustMatch') {
    regexInput.style.display = 'block';
  } else {
    regexInput.style.display = 'none';
  }
};
