import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import {
  faEdit,
  faCheckSquare,
  faTimesSquare,
} from '@fortawesome/pro-duotone-svg-icons';
import { isEmpty as _isEmpty } from 'lodash';
import { LookupService } from '../_services/lookup.service';
import { directus_fields } from '../constants';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

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
  // Icons
  faEdit = faEdit;
  faCheckSquare = faCheckSquare;
  faTimesSquare = faTimesSquare;

  // Formly
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  // Dropdown
  collectionNames: GenericSelect[] = [
    { value: 'department', viewValue: 'Department' },
    { value: 'manufacturer', viewValue: 'Manufacturer' },
  ];
  selectedCollection: string = 'manufacturer';

  // Attributes
  isLoading: boolean;
  editingMode: boolean;

  constructor(
    private lookupService: LookupService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((result) => {
      const collection_name = result.get('collection');
      const object_id = result.get('id');

      if (collection_name && object_id) {
        this.editingMode = true;
        this.selectedCollection = collection_name;
      } else {
        this.editingMode = false;
        if (!_isEmpty(this.model)) {
          this.options.resetModel();
        }
        
        this.selectedCollection = 'manufacturer';
      }

      this.updateForm();
    });
  }

  onCollectionChange() {
    this.updateForm();
  }

  openDialog(isSuccess: boolean, msg: string, id?: number): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: {
        id,
        msg,
        isSuccess,
      },
      position: { top: '100px' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (isSuccess) {
        this.router.navigateByUrl(
          'lookup/create?collection=' + this.selectedCollection + '&id=' + id
        );
      }
    });
  }

  private getURLParams() {
    const route_collection_name = this.route.snapshot.queryParamMap.get(
      'collection'
    );
    const route_id = this.route.snapshot.queryParamMap.get('id');
    return [route_collection_name, route_id];
  }

  private hasValidURLParams() {
    // TODO
  }

  async updateForm() {
    this.isLoading = true;
    let new_fields = [];

    const [collection_name, object_id] = this.getURLParams();
    let object = undefined;
    if (this.editingMode) {
      object = await this.lookupService
        .getLookup(collection_name, object_id)
        .toPromise();
    }

    const result: any = await this.lookupService
      .getCollection(this.selectedCollection)
      .toPromise();
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

      if (this.editingMode) {
        common_options['defaultValue'] = object[field];
      }
      // create other mappings here if needed
      const interface_directus_mapper = {
        date: {
          ...common_options,
          type: 'datepicker',
        },
        textarea: {
          ...common_options,
          type: 'textarea',
          templateOptions: {
            ...common_options.templateOptions,
            rows: 4,
          },
        },
        numeric: {
          ...common_options,
          type: 'input',
          templateOptions: {
            ...common_options.templateOptions,
            type: 'number',
          },
        },
        'text-input': {
          ...common_options,
          type: 'input',
        },
      };

      if (interface_directus_mapper.hasOwnProperty(fields[field].interface)) {
        new_fields.push(interface_directus_mapper[fields[field].interface]);
      }
    });

    if (translation_exists) {
      const result: any = await this.lookupService
        .getCollection(this.selectedCollection + '_translations')
        .toPromise();

      const fields = result.fields;
      this.model.translations = [{ language: 'en' }, { language: 'fr' }];
      if (this.editingMode) {
        this.model.translations[0].id = object.translations[0].id;
        this.model.translations[1].id = object.translations[1].id;
      }
      Object.keys(fields).forEach((field) => {
        if (directus_fields.includes(field)) {
          return;
        }
        
        if (this.editingMode) {
          this.model.translations[0][field] = object.translations[0][field];
          this.model.translations[1][field] = object.translations[1][field];
        } else {
          this.model.translations[0][field] = undefined;
          this.model.translations[1][field] = undefined;
        }
        // Create other mappings here once needed
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
    } else {
      this.fields = new_fields;
      this.isLoading = false;
    }
  }

  save() {
    console.log(this.model)
    let object_id: string | number = -1;

    if (this.editingMode) {
      object_id = this.getURLParams()[1];
    }
    this.lookupService
      .saveLookup(this.selectedCollection, this.model, object_id)
      .subscribe(
        (result: any) => {
          this.openDialog(true, `Lookup (${this.selectedCollection}) ${this.editingMode ? "Updated" : "Created"}`, result.data.id);
        },
        (err: any) => {
          this.openDialog(false, "Error");
        }
      );
  }
}
