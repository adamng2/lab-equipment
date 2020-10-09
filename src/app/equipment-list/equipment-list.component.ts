import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '../_services/equipment.service';
import { Equipment } from '../_model/equipment';
import { faHomeAlt, faBarcodeAlt, faCalendar, faBuilding, faRunning, faDatabase, faCircle, faUserTag } from '@fortawesome/pro-duotone-svg-icons';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {

  
  faHomeAlt = faHomeAlt;
  faBarcodeAlt = faBarcodeAlt;
  faCalendar = faCalendar;
  faBuilding = faBuilding;
  faRunning = faRunning;
  faUserTag = faUserTag;
  faCircle = faCircle;

  datasource: MatTableDataSource<Equipment>;
  equipments: Equipment[];

  
  constructor(  private equipmentService: EquipmentService,
    private router: Router) { }

  ngOnInit(): void {
    this.equipmentService.getEquipments()
    .subscribe(equipments => {
      this.datasource = new MatTableDataSource(equipments);
      console.log( equipments )
    });
  }

  showDetails(id: number){
    this.router.navigate([]).then(result => { window.open('#/equipment/' + id, '_blank'); });
  }

  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }


}
