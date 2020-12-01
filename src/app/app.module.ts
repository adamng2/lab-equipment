import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule, MatNativeDateModule, MatRippleModule, MAT_DATE_FORMATS, DateAdapter, NativeDateAdapter, } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { AgGridModule } from '@ag-grid-community/angular';
import { AllModules } from "@ag-grid-enterprise/all-modules";
import { NumberDirective } from './_directives/numbers-only.directive';
import { AgGridResizeDirective } from './_directives/ag-grid-resize.directive';

import { 
  AuthGuardService as AuthGuard 
} from './_services/auth-guard.service';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { InfoSavedComponent } from './info-saved/info-saved.component';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
import { EquipmentsGridComponent } from './equipments-grid/equipments-grid.component';
import { HomeComponent } from './home/home.component';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { RevisionListComponent } from './revision-list/revision-list.component';
import { FlatTreeComponent } from './flat-tree/flat-tree.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DimensionalFormComponent } from './_forms/dimensional-form/dimensional-form.component';
import { NgxMarkjsModule } from 'ngx-markjs';
import { MatTableModule } from '@angular/material/table';
import { InstructionsComponent } from './instructions/instructions.component';

import { FormlyModule } from '@ngx-formly/core';

import { FormlyMaterialModule } from '@ngx-formly/material';
import { CreateLookupComponent } from './create-lookup/create-lookup.component';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { RepeatTypeComponent } from './create-lookup/repeat-section.type';


export const APP_DATE_FORMATS = {
  parse: {dateInput: {month: 'short', year: 'numeric', day: 'numeric'}},
  display: {
      dateInput: 'input',
      monthYearLabel: {year: 'numeric', month: 'short'},
      dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
      monthYearA11yLabel: {year: 'numeric', month: 'long'}
  }
};

@Injectable()
export class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
      // console.log(date);
      if (displayFormat === 'input') {
          return formatDate(date,'yyyy-MM-dd',this.locale, "+0430");
      } else {
          return formatDate(date, 'MMM-yyyy', this.locale, "+0430");
      }
  }
}

const appRoutes: Routes = [
  { path: 'instructions', component: InstructionsComponent },
  { path: 'lookup/create', component: CreateLookupComponent },
  { path: 'equipments', component: EquipmentListComponent },
  { path: 'equipment', component: EquipmentFormComponent },
  { path: 'equipment/:id', component: EquipmentFormComponent },
  { path: 'equipment/:id/revisions', component: RevisionListComponent },
  { path: 'home', component: HomeComponent },
  
  // { path: 'link', 
  //   component: LinkFormComponent,
  //   canActivate: [AuthGuard] 
  // },
   { path: 'saved', component: InfoSavedComponent },
  // { path: 'login', component: LoginComponent },

  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertDialogComponent,
    InfoSavedComponent,
    EquipmentFormComponent,
    NumberDirective,
    AgGridResizeDirective,
    EquipmentsGridComponent,
    HomeComponent,
    EquipmentListComponent,
    FlatTreeComponent,
    DimensionalFormComponent,
    RevisionListComponent,
    InstructionsComponent,
    CreateLookupComponent,
    RepeatTypeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatBadgeModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDividerModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatRadioModule,
    MatOptionModule,
    MatPaginatorModule,
    MatSelectModule,
    MatStepperModule,
    MatListModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatTableModule,
    FontAwesomeModule,
    ScrollingModule,
    NgxMarkjsModule,
    AgGridModule.withComponents([]),
    RouterModule.forRoot(appRoutes, {
      useHash: true,
      relativeLinkResolution: 'legacy',
    }),
    FormlyModule.forRoot({
      extras: { lazyRender: true },
      types: [{ name: 'repeat', component: RepeatTypeComponent }],
    }),
    FormlyMaterialModule,
    MatNativeDateModule,
    FormlyMatDatepickerModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
