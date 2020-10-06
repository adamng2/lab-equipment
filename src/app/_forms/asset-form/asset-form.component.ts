import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';
import { EquipmentService } from '../../_services/equipment.service';
import { faSave, faDollarSign } from '@fortawesome/pro-duotone-svg-icons';
import { Asset } from 'src/app/_model/asset';

@Component({
  selector: 'app-asset-form',
  templateUrl: './asset-form.component.html',
  styleUrls: ['./asset-form.component.css']
})
export class AssetFormComponent implements OnInit {

  form: any;
  faSave = faSave;
  faDollarSign = faDollarSign;

  constructor(private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) private locale: string, 
    private equipmentService: EquipmentService) {

    this.form = this.formControls; 

  }

  ngOnInit(): void {
  }

  get formControls(){
    return this.formBuilder.group({
      unspsc_code:  [null, Validators.required],
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

    // This form does not require a user to be logged in
    AddAsset(){
      if(this.form.valid){
        let asset: Asset  = this.form.value;

        asset.acquisition_date = formatDate(asset.acquisition_date,'yyyy-MM-dd', this.locale);
        // let shipment: Shipment = this.form.value;
        //Parse date in accepted format
        // shipment.expiry_date = formatDate(shipment.expiry_date,'yyyy-MM-dd', this.locale);
        // shipment.manufactured_date =  formatDate(shipment.manufactured_date,'yyyy-MM-dd', this.locale);
        console.log(JSON.stringify(asset));
        this.equipmentService.postAsset(this.form.value)
        .subscribe( (result: any) =>
        {
          console.log( result);
        },
        error => {
          console.error( error );
          //service call failed, reset
        });
      }
    }
}
