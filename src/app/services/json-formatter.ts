import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatJson',
})
export class JsonFormatter implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    try {
      const obj = JSON.parse(value);
      return JSON.stringify(obj, null, 4);
    } catch (e) {
      return value;
    }
  }
}
