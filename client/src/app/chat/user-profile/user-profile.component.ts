import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../shared/model/user';

@Component({
  selector: 'tcc-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  usernameFormControl = new FormControl('', [Validators.required]);
  lastnameFormControl= new FormControl('');
  previousUsername: string;
 

  constructor(public dialogRef: MatDialogRef<UserProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public params: any) {
      // console.log('hellofrom constru');
      // console.log(params.username);
    this.previousUsername = params.username ? params.username : undefined;
  }

  ngOnInit() {
  }

  public onSave(): void {
    this.dialogRef.close({
      username: this.params.username,
      lastname:this.params.lastname,
      dialogType: this.params.dialogType,
      previousUsername: this.previousUsername
    });
  }
}
