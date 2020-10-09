import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { faCheckCircle } from '@fortawesome/pro-duotone-svg-icons';
import { environment } from 'src/environments/environment';


export interface DialogData{
  id: string;
  key: string;
  recipient: string;

}


@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})

export class AlertDialogComponent {

  private _appUrl = `${environment.appUrl}`;
  
  faCheckCircle = faCheckCircle;

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

      console.log( data );
  }
    
    

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}
