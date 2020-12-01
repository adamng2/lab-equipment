import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { LookupService } from '../_services/lookup.service';
import { directus_fields } from '../constants';
import {
  faEdit,
  faCheckSquare,
  faTimesSquare,
} from '@fortawesome/pro-duotone-svg-icons';

interface GenericSelect {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-lookup',
  templateUrl: './create-lookup.component.html',
  styleUrls: ['./create-lookup.component.css'],
})
export class CreateLookupComponent implements OnInit {
  constructor(private lookupService: LookupService) {}

  // icons
  faEdit = faEdit;
  faCheckSquare = faCheckSquare;
  faTimesSquare = faTimesSquare;

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];
  collectionNames: GenericSelect[] = [
    { value: 'department', viewValue: 'Department' },
    { value: 'manufacturer', viewValue: 'Manufacturer' },
  ];
  selectedCollection: string = 'manufacturer';
  success: boolean;
  error: boolean;
  isLoading: boolean;

  onSubmit() {
    console.log(this.model);
    this.lookupService
      .createLookup(this.selectedCollection, this.model)
      .subscribe(
        () => ((this.success = true), (this.error = false)),
        () => ((this.error = true), (this.success = false))
      );
  }

  onCollectionChange() {
    this.updateForm();
  }

  ngOnInit(): void {
    this.updateForm();
  }

  updateForm() {
    this.isLoading = true;
    let new_fields = [];
    this.lookupService
      .getCollection(this.selectedCollection)
      .toPromise()
      .then((result: any) => {
        let translation_exists: boolean = false;
        const fields = result.fields;
        Object.keys(fields).forEach((field) => {
          if (directus_fields.includes(field)) {
            return;
          }
          if (fields[field].interface === 'translation') {
            translation_exists = true;
            return;
          }

          const common_options = {
            key: field,
            templateOptions: {
              label: field,
              placeholder: 'Enter ' + field,
              required: true,
            },
          };
          if (fields[field].interface === 'date') {
            new_fields.push({
              ...common_options,
              type: 'datepicker',
            });
          }
          if (fields[field].interface === 'textarea') {
            new_fields.push({
              ...common_options,
              type: 'textarea',
              templateOptions: {
                ...common_options.templateOptions,
                rows: 4,
              },
            });
          }
          if (fields[field].interface === 'numeric') {
            new_fields.push({
              ...common_options,
              type: 'input',
              templateOptions: {
                ...common_options.templateOptions,
                type: 'number',
              },
            });
          }
          if (fields[field].interface === 'text-input') {
            new_fields.push({
              ...common_options,
              type: 'input',
            });
          }
        });
        if (translation_exists) {
          this.lookupService
            .getCollection(this.selectedCollection + '_translations')
            .toPromise()
            .then((result: any) => {
              const fields = result.fields;
              Object.keys(fields).forEach((field) => {
                if (directus_fields.includes(field)) {
                  return;
                }
                this.model.translations = [];
                this.model.translations.push({ language: 'en' });
                this.model.translations[0][field] = undefined;
                this.model.translations.push({ language: 'fr' });
                this.model.translations[1][field] = undefined;
                if (fields[field].interface === 'text-input') {
                  new_fields.push({
                    key: 'translations',
                    type: 'repeat',
                    fieldArray: {
                      fieldGroup: [
                        {
                          type: 'input',
                          key: field,
                          templateOptions: {
                            label: field,
                            type: 'text',
                            required: true,
                          },
                        },
                      ],
                    },
                  });
                }
              });
              this.fields = new_fields;
              this.isLoading = false;
            });
        } else {
          this.fields = new_fields;
          this.isLoading = false;
        }
      });
    
  }
}
