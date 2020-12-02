import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { LookupService } from '../_services/lookup.service';
import { BtnCellRenderer } from './btn-cell-renderer.component';

@Component({
  selector: 'app-list-lookup',
  templateUrl: './list-lookup.component.html',
  styleUrls: ['./list-lookup.component.css'],
})
export class ListLookupComponent implements OnInit {
  public frameworkComponents;
  public modules: any[] = AllCommunityModules;
  // public modules: any[] = AllModules;
  public detailCellRendererParams = {};

  public collectionNames: any[] = [
    { value: 'department', viewValue: 'Department' },
    { value: 'manufacturer', viewValue: 'Manufacturer' },
  ];
  public selectedCollection: string = 'department';

  columnDefs = [];

  rowData = [];

  constructor(private lookupService: LookupService, private router: Router) {
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderer,
    };
  }

  ngOnInit(): void {}

  onGridReady(params) {
    this.updateGrid();
  }

  onCollectionChange() {
    this.updateGrid();
  }

  onFirstDataRendered(params) {
    setTimeout(function () {
      params.api.getDisplayedRowAtIndex(1).setExpanded(true);
    }, 0);
  }

  updateGrid() {
    this.lookupService.getLookup(this.selectedCollection).subscribe((data) => {
      if (data) {
        let translations_exists: boolean = false;
        this.columnDefs = Object.keys(data[0]).map((key) => {
          const columnDefs: any = { field: key };
          if (key === 'translations') {
            translations_exists = true;
            columnDefs.cellRenderer = 'agGroupCellRenderer';
          }
          return columnDefs;
        });
        this.columnDefs.push({
          field: '',
          cellRenderer: 'btnCellRenderer',
          cellRendererParams: {
            clicked: (id: any) => {
              this.router.navigateByUrl('lookup/create?collection=' + this.selectedCollection +  "&id="+id);
            },
          },
        });

        if (translations_exists) {
          const detailColumnDefs = Object.keys(data[0].translations[0]).map(
            (key) => {
              return { field: key };
            }
          );
          console.log(detailColumnDefs);
          this.detailCellRendererParams = {
            detailGridOptions: {
              columnDefs: detailColumnDefs,
              defaultColDef: { flex: 1 },
            },
            getDetailRowData: function (params) {
              params.successCallback(params.data.translations);
            },
          };
        }
        this.rowData = data;
      }
    });
  }
}
