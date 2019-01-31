import { ValidatorFn, AbstractControl } from "@angular/forms";

export function stringExistsValidator(stringArray: string[]): ValidatorFn {
  return (control: AbstractControl): {
    [key: string]: boolean } | null => {
      stringArray = stringArray.map( str => str.toLocaleLowerCase());
      let lowCaseVal = control.value.toLocaleLowerCase();
    return stringArray.includes(lowCaseVal) ? { stringExists: true } : null;
  };
}
