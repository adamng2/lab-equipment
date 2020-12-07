import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { conversionMap, convertFormValue } from "../../convertions";

@Component({
  selector: 'electrical-form',
  templateUrl: './electrical-form.component.html',
  styleUrls: ['./electrical-form.component.css']
})
export class ElectricalFormComponent implements OnInit {

  @Input() electrical: FormGroup;
  voltageUnitsHint: string = "";


  constructor(
  ) {

  }

  ngOnInit(): void {


  }

  private convertedInputChanged(key: string, units_key: string) {
    const converted = (this.electrical.value[key] * conversionMap.electrical[key][this.electrical.value[units_key]]).toFixed(2)
    this.voltageUnitsHint = "The above value will be stored as " + converted + " VAC"
  }

  voltageChanged() {
    this.convertedInputChanged("voltage", "voltage_units");
  }

  unitsChanged() {
    this.convertedInputChanged("voltage", "voltage_units");

  }

}
