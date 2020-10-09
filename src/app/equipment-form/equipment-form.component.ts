import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { EquipmentService } from '../_services/equipment.service';
import { LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { faClipboard, 
  faSave, 
  faClipboardList, 
  faInfo, 
  faInfoCircle, 
  faInfoSquare, 
  faPen, 
  faPencilRuler, 
  faRulerCombined, 
  faDollarSign, 
  faBolt } from '@fortawesome/pro-duotone-svg-icons';

import { Equipment } from '../_model/equipment';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';


@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css']
})
export class EquipmentFormComponent implements OnInit {

  form: any;
  existingEquipmentId = -1; // -1 not existing

  
  // icons
  faInfo = faInfo;
  faBolt = faBolt;
  faInfoCircle = faInfoCircle;
  faClipoard = faClipboard;
  faClipoardList = faClipboardList;
  faSave = faSave;
  faPencilRuler = faPencilRuler;
  faDollarSign = faDollarSign;
  faRulerCombined = faRulerCombined;
  
  
  constructor(private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) private locale: string,
    public dialog: MatDialog, 
    private route: ActivatedRoute,
    private router: Router,    
    private equipmentService: EquipmentService) {
  }

  ngOnInit(): void {
    
    this.form = this.mainControls;
    this.form.addControl("asset", this.assetControls);
    this.form.addControl("dimensional", this.dimensionalControls);


    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = this.existingEquipmentId = +params['id'];
        //this.navigated = true;
        this.equipmentService.getEquipment(id).subscribe( result => {
          console.log( "EXISTING "  + this.existingEquipmentId );
          this.form.patchValue(result);
        });
      }
    });

  }

  ngOnDestroy() {
    // if( !this.sub)
    //   this.sub.unsubscribe();
  }

   get mainControls(){
    return this.formBuilder.group({
      equipment_id:  [null, Validators.required],
      department_owner: [null ],
      manufacturer_id: [null],
      model_number: [null],
      equipment_description: [null]
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
      height: [null],
      width: [null ],
      depth: [null ],
      bench_spacing: [null],
  
      is_stand_alone: [null],
      is_relocatable: [null],
      weight: [null],
  
      is_clean: [null ],
      is_humidity_sensitive: [null ],
      is_static_sensitive: [null ],
      is_light_sensitive: [null ],
      is_noise_sensitive: [null ],
      is_air_pressure_sensitive: [null ],
      is_vibration_sensitive: [null ],
      is_floor_or_bench: [null ]
    });

  }

  // Save equipment, new or update
  Save(){
    let tempEquipment: Equipment = this.form.value;
    console.log(tempEquipment);
    if(this.form.valid){
      // shipment.expiry_date = formatDate(shipment.expiry_date,'yyyy-MM-dd', this.locale);
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
          id: id
      },
      // disableClose: true,
      position: { top: "100px"}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('equipment/' + id);
    });
  }

}
