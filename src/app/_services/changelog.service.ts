import { Injectable } from '@angular/core';

export interface Changelog {
  id: number;
  action_by: number;
  action: string;
  field: string;
  collection: string,
  old_value?: any;
  new_value?: any;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ChangelogService {
  constructor() {}

  getChangelog(revisions: any): Changelog[] {
    const changelog: Changelog[] = [];
    revisions.forEach(({ id, delta, activity, collection }, i: number) => {
      Object.keys(delta).forEach((changed_field) => {
        let old_value = '';
        const new_value = delta[changed_field];
        if (activity.action == 'update') {
          old_value = revisions[i - 1].data[changed_field];
        }

        if (activity.action == 'create' || old_value != new_value) {
          changelog.push({
            id,
            collection,
            action_by: activity.action_by,
            action: activity.action,
            field: changed_field,
            old_value,
            new_value,
            date: activity.action_on,
          });
        }
      });
    });
    return changelog.reverse();
  }
}
