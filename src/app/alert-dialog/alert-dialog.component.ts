import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { faCheckCircle, faCheckSquare, faTimesCircle, IconDefinition } from '@fortawesome/pro-duotone-svg-icons';
import { environment } from 'src/environments/environment';


export interface DialogData{
  id: string;
  key: string;
  recipient: string;
  msg: string;
  isSuccess: boolean;
}


@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})

export class AlertDialogComponent {

  private _appUrl = `${environment.appUrl}`;
  
  icon: IconDefinition

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.icon = data.isSuccess ? faCheckSquare : faTimesCircle
  }
    
    

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}
