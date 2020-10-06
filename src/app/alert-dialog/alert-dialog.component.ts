import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
  
  mailTo: string;
  formLink: string;

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

      console.log( data );
      let collection_uri = "receiving"
      // if( data.formType == FormType.SHIPPING)
      //   collection_uri = "shipping"


      this.formLink = this._appUrl + collection_uri  + "?"
      + "id=" + data.id
      + "&key=" + data.key

      this.mailTo = "mailto:"
        + data.recipient 
        + "?subject=" + encodeURIComponent("Fill out form please")
        + "&body=" + encodeURIComponent(this.formLink)
    }
    

  onNoClick(): void {
    this.dialogRef.close();
  }

}
