import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'englishLettersOnly'})
export class EnglishLettersOnlyPipe implements PipeTransform {
  transform(str: string): string {
    return str.replace(/[^a-z0-9\ ]/gi,'');
  }
}