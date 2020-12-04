import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LookupService } from 'src/app/_services/lookup.service';
import { TranslationService } from 'src/app/_services/translation.service';

@Component({
  selector: 'departmental-form',
  templateUrl: './department-information-form.component.html',
  styleUrls: ['./department-information-form.component.css']
})
export class DepartmentInformationFormComponent implements OnInit {

  @Input() department_information : FormGroup;
  lookups: any

  constructor(
    private lookupService: LookupService,
    private translationService: TranslationService,
  ) {

    this.lookups = {
      department_owner: {
        options: [],
        filtered_options: undefined
      }
    }
   }

  ngOnInit(): void {
    forkJoin([this.lookupService.getDepartments()]).subscribe(result => {
      const [departments] = result;

      this.lookups.department_owner.options = this.translationService.changeReltoID(departments, "department");
      const lookup_names = ["department_owner"];
      
      lookup_names.forEach(lookup_name => {
        this.lookups[lookup_name].filtered_options = this.department_information.controls[lookup_name].valueChanges.pipe(
          startWith(''),
          map((value: any) => typeof value === "object" ? this.lookups[lookup_name].options.find(dept => {return dept.id === value.id}).name : typeof value === 'string' ? value : ""),
          map((name: any) => name ? this._filter(lookup_name,name) : this.lookups[lookup_name].options.slice())
        );
      })
    });
  }

  private _filter(lookup_name:string, name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.lookups[lookup_name].options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  genericDisplayFn(value: any, lookup_name: string) {
    if (typeof value === "object" && value !== null) {
      value = value.id
    }
    return value ? this.lookups[lookup_name].options.find(obj => obj.id === value).name : ""
  }

  displayDepartmentOwnerFn = (value: any) => {
    return this.genericDisplayFn(value, "department_owner")
  }

}
