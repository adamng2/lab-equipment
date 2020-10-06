import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[ag-grid-resize]'
})

// This directive keeps an ag-grid's columns in the viewport when window is resized
export class AgGridResizeDirective {
  private gridApi;
  @HostListener('window:resize')

  onResize() {
    if (!this.gridApi) return;

    setTimeout(() => {
      this.gridApi.sizeColumnsToFit();
    });
  }

  @HostListener('gridReady', ['$event'])

  onGridReady(params) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }

}