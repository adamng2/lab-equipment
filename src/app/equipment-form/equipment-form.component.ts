import { forkJoin } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { EquipmentService } from '../_services/equipment.service';
import { LookupService } from '../_services/lookup.service';
import { TranslationService } from '../_services/translation.service';
import { LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { faClipboard, 
  faBuilding,
  faUserEdit,
  faSave, 
  faClipboardList, 
  faInfo, 
  faInfoCircle, 
  faInfoSquare,
  faPencilRuler, 
  faRulerCombined, 
  faDollarSign, 
  faBolt } from '@fortawesome/pro-duotone-svg-icons';

  import { faPen, faPlus} from '@fortawesome/pro-light-svg-icons';

import { Equipment } from '../_model/equipment';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

function _window() : any {
  // return the global native browser window object
  return window;
}


@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css']
})
export class EquipmentFormComponent implements OnInit {

  form: any;
  existingEquipmentId = -1; // -1 not existing
  title = "";

  // dropdowns
  // department_owner_options: any[] = [];
  // department_owner_filtered_options: Observable<any[]>;

  lookups: any
  
  // icons
  faInfo = faInfo;
  faBolt = faBolt;
  faInfoCircle = faInfoCircle;
  faPlus = faPlus;
  faClipoard = faClipboard;
  faClipoardList = faClipboardList;
  faSave = faSave;
  faPencilRuler = faPencilRuler;
  faDollarSign = faDollarSign;
  faPen = faPen;  
  faUserEdit = faUserEdit;
  faBuilding = faBuilding;
  
  editingMode: boolean = false;
  
  constructor(private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) private locale: string,
    public dialog: MatDialog, 
    private route: ActivatedRoute,
    private router: Router,    
    private equipmentService: EquipmentService,
    private translationService: TranslationService,
    private lookupService: LookupService) {
      this.lookups = {
        department_owner: {
          options: [],
          filtered_options: undefined
        },
        manufacturer: {
          options: [],
          filtered_options: undefined
        }
      }
  }

  ngOnInit(): void {
    
    this.form = this.mainControls;
    this.form.addControl("asset", this.assetControls);
    this.form.addControl("dimensional", this.dimensionalControls);
    this.form.addControl("department_information", this.departmentInformationControls);
    forkJoin([this.lookupService.getManufacturers()]).subscribe(result => {
      const [manufacturers] = result;

      this.lookups.manufacturer.options = this.translationService.changeReltoID(manufacturers, "manufacturer");
     
      const lookup_names = ["manufacturer"];
      
      lookup_names.forEach(lookup_name => {
        this.lookups[lookup_name].filtered_options = this.form.controls[lookup_name].valueChanges.pipe(
          startWith(''),
          map((value: any) => typeof value === "object" ? this.lookups[lookup_name].options.find(dept => {return dept.id === value.id}).name : typeof value === 'string' ? value : ""),
          map((name: any) => name ? this._filter(lookup_name,name) : this.lookups[lookup_name].options.slice())
        );
      })
  
      this.route.params.forEach((params: Params) => {
        if (params['id'] !== undefined) {
          this.editingMode = true;
          const id = this.existingEquipmentId = +params['id'];
          //this.navigated = true;
          this.equipmentService.getEquipment(id).subscribe( result => {
  
            this.title = "Edit equipment " + result.equipment_id;
            //Add id's controls patch sub-objects
            this.form.get('asset').addControl('id', new FormControl('', Validators.required));
            this.form.get('dimensional').addControl('id', new FormControl('', Validators.required));
            this.form.get('department_information').addControl('id', new FormControl('', Validators.required));
            // This will throw an error of any of our sub-object have a 
            // null value i.e. equipment.dimensional = null
            console.log(result );
            this.form.patchValue(result);
            
          });
        }else{
          this.editingMode = false;
          this.title = "New equipment"
        }
      });

    })


  }

  // FOR LOOKUPS

  genericDisplayFn(value: any, lookup_name: string) {
    if (typeof value === "object" && value !== null) {
      value = value.id
    }
    return value ? this.lookups[lookup_name].options.find(obj => obj.id === value).name : ""
  }

  displayManufacturerFn = (value: any) => {
    return this.genericDisplayFn(value, "manufacturer")
  }

  private _filter(lookup_name:string, name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.lookups[lookup_name].options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnDestroy() {
    // if( !this.sub)
    //   this.sub.unsubscribe();
  }

   get mainControls(){
    return this.formBuilder.group({
      equipment_id:  [null, Validators.required],
      // department_owner: [null ],

      name: [null ],
      manufacturer: [null ],
      model_number: [null],
      serial_number: [null],
      equipment_description: [null],
      link_to_manual: [null],
      notes: [null]
    });
  }

  get assetControls(){
    return this.formBuilder.group({
      unspsc_code:  [null],
      unspsc_title: [null ],
      equipment_current_building_location: [null],
      acquisition_date: [null],
      acquisition_value: [null],
      accumulated_amortization: [null],
      current_value: [null],
      replacement_cost: [null],
      relocation_cost: [null],
      available_redundancy: [null],
      core_to_capability: [null],
      is_obsolete: [null],
      is_kept_for_spare_parts: [null],
      maximum_out_of_service_time: [null],
    //  estimated_remaining_useful_life: [null],
      is_end_of_service: [null],
      cost_to_keep_running: [null],
      can_be_relocated: [null],
      asset_decision: [null]
    });
  }

  get dimensionalControls(){
    return this.formBuilder.group({
      equipment_width: [null],
      footprint_length: [null],
      footprint_height: [null],
  
      clearance_width: [null],
      clearance_length: [null],
      equipment_weight: [null],
  
      notes: [null],
    });

  }

  get departmentInformationControls(){
    return this.formBuilder.group({
      department_owner: [null],
      address: [null],
      contact_name: [null],
      contact_email: [null],
      notes: [null],
    });

  }

  // Save equipment, new or update
  Save(){
    let tempEquipment: Equipment = this.form.value;
    console.log(tempEquipment);
    if(this.form.valid){
      this.equipmentService.saveEquipment(tempEquipment, this.existingEquipmentId)
      .subscribe( (result: any) =>
      {
        console.log(result);
        this.openDialog( result.data.id );
        //this.router.navigateByUrl('equipments/' + result.data);
      },
      error => {
        console.error( error );
        //service call failed, reset
      });
    }
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data:  { 
          id: id,
          msg: "equipment updated",
          isSuccess: true
      },
      // disableClose: true,
      position: { top: "100px"}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('equipment/' + id);
    });
  }

  showRevisions(id: number){
    this.router.navigateByUrl(`equipment/${id}/revisions`);
  }

}
