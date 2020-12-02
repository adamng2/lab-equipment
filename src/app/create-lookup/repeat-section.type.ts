import { Component } from '@angular/core';
import { FieldArrayType, FormlyFormBuilder } from '@ngx-formly/core';
import { faClipboard, faGlobe } from '@fortawesome/pro-duotone-svg-icons';

@Component({
  selector: 'formly-repeat-section',
  template: `
    <mat-accordion multi>
      <mat-expansion-panel expanded="true">
        <mat-expansion-panel-header>
          <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="10px">
            <div class="icon" aria-label="Icon displaying form section">
              <fa-duotone-icon
                [icon]="faGlobe"
                size="lg"
              >
              </fa-duotone-icon>
            </div>
            <div>Translations</div>
          </div>
        </mat-expansion-panel-header>

        <div class="section-form">
          <div fxLayout="column" fxLayoutAlign="start none" fxLayoutGap="20px">
            <div
              *ngFor="let field of field.fieldGroup; let i = index"
              class="row"
            >
              <div *ngIf="i == 0">English</div>
              <div *ngIf="i == 1">French</div>
              <formly-field class="col" [field]="field"></formly-field>
            </div>
            <div
              *ngIf="showError"
              class="invalid-feedback"
              [style.display]="'block'"
            >
              <formly-validation-message
                [field]="field"
              ></formly-validation-message>
            </div>
          </div>
        </div>
      </mat-expansion-panel>
    </mat-accordion>
    <br>
  `,
})
export class RepeatTypeComponent extends FieldArrayType {
  // icons
  faGlobe = faGlobe;

  constructor(builder: FormlyFormBuilder) {
    super(builder);
  }
}
