import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { EquipmentService } from '../_services/equipment.service';
import { LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faClipboard,faSave, faClipboardList, faInfo, faInfoCircle, faInfoSquare, faPen, faPencilRuler, faRulerCombined } from '@fortawesome/pro-duotone-svg-icons';


@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css']
})
export class EquipmentFormComponent implements OnInit {

  form: any;
  form2: any;

  private sub: any;
  
  faInfo = faInfo;
  faInfoCircle = faInfoCircle;
  faClipoard = faClipboard;
  faClipoardList = faClipboardList;
  faSave = faSave;
  faPencilRuler = faPencilRuler;

  faRulerCombined = faRulerCombined;
  
  
  constructor(private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) private locale: string, 
    private route: ActivatedRoute,
    private router: Router,    
    private equipmentService: EquipmentService) {

    this.form = this.formControls; 

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    // if( !this.sub)
    //   this.sub.unsubscribe();
  }

  get formControls(){
    return this.formBuilder.group({
      equipment_id:  [null, Validators.required],
      department_owner: [null ],
      manufacturer_id: [null],
      model_number: [null],
      equipment_description: [null]
    });
  }

  // This form does not require a user to be logged in
  AddEquipment(){


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
