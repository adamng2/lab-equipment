import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dimensional-form',
  templateUrl: './dimensional-form.component.html',
  styleUrls: ['./dimensional-form.component.css']
})
export class DimensionalFormComponent implements OnInit {

  @Input() dimensional : FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
