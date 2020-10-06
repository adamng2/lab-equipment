import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { EquipmentService } from '../_services/equipment.service';
import { LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faClipboard,faSave, faClipboardList, faInfo, faInfoCircle, faInfoSquare, faPen, faPencilRuler, faRulerCombined, faDollarSign } from '@fortawesome/pro-duotone-svg-icons';


@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css']
})
export class EquipmentFormComponent implements OnInit {

  form: any;

  private sub: any;
  
  faInfo = faInfo;
  faInfoCircle = faInfoCircle;
  faClipoard = faClipboard;
  faClipoardList = faClipboardList;
  faSave = faSave;
  faPencilRuler = faPencilRuler;
  faDollarSign = faDollarSign;

  faRulerCombined = faRulerCombined;
  
  
  constructor(private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) private locale: string, 
    private route: ActivatedRoute,
    private router: Router,    
    private equipmentService: EquipmentService) {

      this.form = this.mainControls;
      this.form.addControl("asset", this.assetControls);
      this.form.addControl("dimensional", this.dimensionalControls);

   // this.form = this.formControls; 

  }

  ngOnInit(): void {

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
      is_floor_bench: [null ]
    });

  }





  // This form does not require a user to be logged in
  AddEquipment(){

    console.log("Adding: " + JSON.stringify(this.form.value));
    if(this.form.valid){
      // let shipment: Shipment = this.form.value;
      //Parse date in accepted format
      // shipment.expiry_date = formatDate(shipment.expiry_date,'yyyy-MM-dd', this.locale);
      // shipment.manufactured_date =  formatDate(shipment.manufactured_date,'yyyy-MM-dd', this.locale);
      console.log(this.form.value);
      this.sub = this.equipmentService.postEquipment(this.form.value)
      .subscribe( (result: any) =>
      {
        console.log( result);
        this.router.navigateByUrl('saved');
      },
      error => {
        console.error( error );
        //service call failed, reset
      });
    }
  }

}
