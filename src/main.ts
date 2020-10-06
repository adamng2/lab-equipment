import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {LicenseManager} from "@ag-grid-enterprise/core";

LicenseManager.setLicenseKey("CompanyName=Government of Canada,LicensedGroup=Translation Bureau,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=0,ExpiryDate=26_February_2021_[v2]_MTYxNDI5NzYwMDAwMA==5d82051122ed441313bc6e211ccbc377");


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
