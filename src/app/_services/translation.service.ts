import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor() {}

  getLanguage(): string {
    return "en";
  }

  changeReltoID(list: any[],key: string): any[] {
    return list.map(item => {
      const id = item[key]
      delete item[key]
      return {
        ...item,
        id
      }
    })
  }
}
