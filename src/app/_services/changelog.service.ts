import { Injectable } from '@angular/core';

export interface Changelog {
  id: number;
  action: string,
  field: string,
  old_value?: any,
  new_value?: any,
  date: Date
}



@Injectable({
  providedIn: 'root'
})
export class ChangelogService {

  constructor() { }

  getChangelog(revisions: any): Changelog[] {
    const changelog: Changelog[] = [];
    revisions.forEach(({id, delta, activity}, i: number) => {
      Object.keys(delta).forEach((changed_field) => {
        let old_value = '';
        if (activity.action == 'update') {
          old_value = revisions[i - 1].data[changed_field];
        }
        changelog.push({
          id,
          action: activity.action,
          field: changed_field,
          old_value,
          new_value: delta[changed_field],
          date: activity.action_on,
        });
      });
    });
    return changelog;
  }
}
