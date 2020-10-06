import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';


@Component({
  selector: 'app-dimensional-form',
  templateUrl: './dimensional-form.component.html',
  styleUrls: ['./dimensional-form.component.css']
})
export class DimensionalFormComponent implements OnInit {

  
  form: any;

  constructor(private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) private locale: string) {
      this.form = this.formBuilder.group({
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


  ngOnInit(): void {
  }

}
