import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../shared/model/user';
import { ChatService } from 'app/chat.service';


const AVATAR_URL = 'https://api.adorable.io/avatars/285';

@Component({
  selector: 'tcc-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.css']
})



export class DialogUserComponent implements OnInit {
  @Input() username: string;
  usernameFormControl = new FormControl('', [Validators.required]);
  previousUsername: string;
  user: User;


  private getRandomId(): number {
    return Math.floor(Math.random() * (1000000)) + 1;
  }


  constructor(public dialogRef: MatDialogRef<DialogUserComponent>,
    @Inject(MAT_DIALOG_DATA) public params: any,private chatService:ChatService) {
    this.previousUsername = params.username ? params.username : undefined;
  }

  ngOnInit() {
  }

  public onSave(): void {
  const  randomId =this.getRandomId();

    this.user = this.chatService.getValue();
    this.user.name = this.params.username;
    this.chatService.setValue(this.user);
   
    this.dialogRef.close({
      username: this.params.username,
      dialogType: this.params.dialogType,
      previousUsername: this.previousUsername
    });
  }
}
