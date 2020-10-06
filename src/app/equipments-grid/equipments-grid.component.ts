import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Module, AllModules, GridOptions } from "@ag-grid-enterprise/all-modules";
import { Router } from '@angular/router';
// import { LocalDataService } from '../services/local-data.service';
// import { Request, RequisitionItem } from '../models/requisition-item';
import { formatDate, formatNumber, formatPercent, formatCurrency } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EquipmentService } from '../_services/equipment.service';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-equipments-grid',
  templateUrl: './equipments-grid.component.html',
  styleUrls: ['./equipments-grid.component.css']
})
export class EquipmentsGridComponent implements OnInit {

  faSearch = faSearch;
    // Angular
  public modules: Module[] = AllModules;

  public gridApi;
  public getRowNodeId;
  public gridColumnApi;
  public rowClassRules;

  public rowData: any;
  public context;
  public frameworkComponents;

  public gridOptions: GridOptions;
  public connected: boolean;

  public columnDefs: any;
  public myGridColumns: any;
  public headerHeight: number;
  public defaultColDef: any;
  public detailCellRendererParams;

  selectedColumnGroups = [];

  public columnGroups = [
    { id: "asset", name : "Asset Information", color: "red" },
    { id: "dimensional", name : "Dimensional Information", color: "green" }
  ]

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private router: Router,
    private equipmentService: EquipmentService,
    public dialog: MatDialog) {

          // This is the default column all columns will inherit from
    this.defaultColDef = {
      width: 150,
      editable: false,
      sortable: true,
      //cellStyle: { 'white-space': 'normal' },
      filter: true,
      resizable: true
    };

    this.columnDefs = [
      { headerName: 'Equipment ID', field: 'equipment_id', minWidth: 160},
      { headerName: 'New Department Owner', field: 'department_owner', minWidth: 240},
      { headerName: 'Description', field: 'equipment_description', minWidth: 240},
      { headerName: 'Manufacturer', field: 'manufacturer_id', minWidth: 240},
      { headerName: 'Model Number', field: 'model_number', minWidth: 200},

      { headerName: 'UNSPSC Code', field: 'asset.unspsc_code', minWidth: 240, 
         headerClass: 'my-ag-column-orange'},
      { headerName: 'UNSPSC Title', field: 'asset.unspsc_title', minWidth: 240,
         headerClass: 'my-ag-column-orange'},
      { headerName: 'Current Building Location', field: 'asset.equipment_current_building_location', minWidth: 240,
         headerClass: 'my-ag-column-orange'},
      { headerName: 'Acquisition date', field: 'asset.aquisition_date', minWidth: 240, 
         headerClass: 'my-ag-column-orange'},
      { headerName: 'Age (years)', field: 'asset.age_in_years', minWidth: 240, 
         headerClass: 'my-ag-column-orange'},


      { headerName: 'Width', field: 'dimensional.width', minWidth: 240, 
         headerClass: 'my-ag-column-green'},
      { headerName: 'UNSPSC Title', field: 'dimensional.depth', minWidth: 240,
         headerClass: 'my-ag-column-green'},
      { headerName: 'Current Building Location', field: 'dimensional.height', minWidth: 240,
         headerClass: 'my-ag-column-green'},
      { headerName: 'Acquisition date', field: 'dimensional.bench_spacing', minWidth: 240, 
         headerClass: 'my-ag-column-green'},
      { headerName: 'Age (years)', field: 'dimensional.is_stand_alone', minWidth: 240, 
         headerClass: 'my-ag-column-green'}
    ]

    this.gridOptions = <GridOptions>{
      context: { componentParent: this }
    };

  }

  ngOnInit(): void {
    this.equipmentService.getEquipments()
    .subscribe(data => {
      console.log( data );
      this.rowData = data.data;
    });

    //this.addColumns("asset_information");
  }

  public onGridReady(params) {
    this.gridApi = params.api;
    // this.gridOptions.suppressHorizontalScroll = true;
    this.myGridColumns = this.gridOptions.columnApi.getAllColumns();
    console.log( this.myGridColumns );

    this.columGroupsChanged([]);
    this.gridApi.sizeColumnsToFit();
    //this.gridApi.closeToolPanel();
  }

  
  public onQuickFilterChanged($event) {
    this.gridOptions.api.setQuickFilter($event.target.value);
  }

  // Toggle visibility of columns
  toggle(column: any, checked: any) {
    console.log( column + ":" + checked);
    this.gridOptions.columnApi.
      setColumnsVisible(this.myGridColumns.filter(c => c.colId.startsWith(column + ".")), checked);
    this.gridApi.sizeColumnsToFit();
  }

  columGroupsChanged( event) {
    console.log("Model changed " + event);
    //Reset
    this.columnGroups.forEach( (group: any) => {
      if(event.includes( group.id)){
        // console.log("Setting to true: " + group.id)
        this.gridOptions.columnApi.
        setColumnsVisible(this.myGridColumns.filter(c => c.colId.startsWith(group.id + ".")), true);
      }
      else{
        this.gridOptions.columnApi.
        setColumnsVisible(this.myGridColumns.filter(c => c.colId.startsWith(group.id + ".")), false);
      }
    });

    // console.log("Showing: " + this.selectedColumnGroups);

    // this.selectedColumnGroups.forEach( (group: any) => {

    // })
  }


  // hideAuxiliaryColumns(){
  //   this.gridOptions.columnApi.
  //   setColumnsVisible(this.myGridColumns.filter(c => c.colId.includes(".")), false);
  // }



}
