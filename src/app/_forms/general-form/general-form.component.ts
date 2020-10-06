import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faSave, faDollarSign } from '@fortawesome/pro-duotone-svg-icons';
import { EquipmentService } from 'src/app/_services/equipment.service';

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrls: ['./general-form.component.css']
})
export class GeneralFormComponent implements OnInit {

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
      equipment_id:  [null, Validators.required],
      department_owner: [null ],
      manufacturer_id: [null],
      model_number: [null],
      equipment_description: [null]
    });
  }

}
