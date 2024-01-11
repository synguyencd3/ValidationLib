import { validate } from './example';

// Expose the validate function to the global scope
(window as any).validate = function () {
  const selectedValidator = (document.getElementById('validatorSelect') as HTMLSelectElement).value;
  const inputValue = (document.getElementById('inputValue') as HTMLInputElement).value;
  const regexInput = (document.getElementById('regexInput') as HTMLInputElement).value;
  const minValueInput = (document.getElementById('minValue') as HTMLInputElement).value;
  const maxValueInput = (document.getElementById('maxValue') as HTMLInputElement).value;
  const messageElement = document.getElementById('message') as HTMLParagraphElement;

  const regex = selectedValidator === 'MustMatch' ? new RegExp(regexInput) : undefined;
  const minMax = selectedValidator === 'Between' ? [Number(minValueInput), Number(maxValueInput)] : undefined;
  const msg = validate(selectedValidator, inputValue, regex, minMax);

  messageElement.innerText = msg;
};

(window as any).toggleRegexInput = function () {
  const selectedValidator = (document.getElementById('validatorSelect') as HTMLSelectElement).value;
  const regexInput = document.getElementById('regexInput') as HTMLInputElement;
  const betweenInputs = document.getElementById('betweenInputs') as HTMLDivElement;

  if (selectedValidator === 'MustMatch') {
    regexInput.style.display = 'block';
    betweenInputs.style.display = 'none';
  } else if (selectedValidator === 'Between') {
    regexInput.style.display = 'none';
    betweenInputs.style.display = 'flex';
  } else {
    regexInput.style.display = 'none';
    betweenInputs.style.display = 'none';
  }
};
