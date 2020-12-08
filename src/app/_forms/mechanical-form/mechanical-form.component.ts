import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mechanical-form',
  templateUrl: './mechanical-form.component.html',
  styleUrls: ['./mechanical-form.component.css']
})
export class MechanicalFormComponent implements OnInit {

  @Input() dimensional : FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
