import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '../_services/equipment.service';
import { Equipment } from '../_model/equipment';
import { faPencilRuler, faCogs, faBolt, faBuilding, faRunning, faDatabase, faCircle } from '@fortawesome/pro-duotone-svg-icons';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {

  faPencilRuler = faPencilRuler;
  faCogs = faCogs;
  faBolt = faBolt;
  faBuilding = faBuilding;
  faRunning = faRunning;
  faDatabase = faDatabase;
  faCircle = faCircle;

  equipments: Equipment[];

  columnsToDisplay = ['asset', 'weight', 'symbol', 'position'];
  
  constructor(  private equipmentService: EquipmentService) { }

  ngOnInit(): void {
    this.equipmentService.getEquipments()
    .subscribe(data => {
      this.equipments = data.data;
      console.log( this.equipments )
    });
  }

}
