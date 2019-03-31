import { Component, OnInit,Input,ViewChild,AfterViewInit } from '@angular/core';
import { DialogUserType } from './chat/dialog-user/dialog-user-type';
import { User, Country, ChatUsers } from './chat/shared/model/user';
import { MatDialog, MatDialogRef, MatList, MatListItem } from '@angular/material';
import { UserProfileComponent } from './chat/user-profile/user-profile.component';
import { SocketService } from './chat/shared/services/socket.service';
import { Action } from './chat/shared/model/action';
import { Message } from './chat/shared/model/message';
import { Event } from './chat/shared/model/event';
import {ChatService} from './chat.service';
import {ChatComponent} from './chat/chat.component';
import { useAnimation } from '@angular/core/src/animation/dsl';
import {CHATUSERS} from './chat/shared/model/mock-user';
import { FormGroup, FormBuilder } from '@angular/forms';


const AVATAR_URL = 'https://api.adorable.io/avatars/285';

@Component({
  selector: 'tcc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//, AfterViewInit
export class AppComponent implements OnInit{
  user: User;
  action = Action;
  dialogRef: MatDialogRef<UserProfileComponent> | null;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;
  lastname: any;
  routeLinks:any;
  countryFlag:string;
  countryCode:string;
  @Input() userFromChat:User;
  chatusers= CHATUSERS;
  clickstatus:boolean=false;
  
  // @ViewChild(ChatComponent) chat;

  // defaultDialogUserParams: any = {
  //   disableClose: true,
  //   data: {
  //     title: 'Welcome',
  //     dialogType: DialogUserType.NEW
  //   }
  // };
  public country:Country[];
  activeUsers: any;
  constructor(private socketService: SocketService, private chatService: ChatService, public dialog: MatDialog, private fb: FormBuilder) {
    console.log("AM I Called");
    this.chatService.GetCountryData().subscribe(countries=>{
      this.country = countries; 
      });
    //  this.user= this.chatService.getValue();
    } 
  ngOnInit(): void {
    // console.log(this.userFromChat);
    // this.user=this.userFromChat;
  

    // this.socketService.initSocket();

    // this.ioConnection = this.socketService.onMessage()
    //   .subscribe((message: Message) => {
    //     this.messages.push(message);
    //   });


    // this.socketService.onEvent(Event.CONNECT)
    //   .subscribe(() => {
    //     console.log('connected');
    //   });

    // this.socketService.onEvent(Event.DISCONNECT)
    //   .subscribe(() => {
    //     console.log('disconnected');
    //   });


    //   this.socketService.getUsers().subscribe(() => { activeusers=>{
    //     console.log("from here" + activeusers);
    //     this.activeUsers = activeusers;
    //   }
      // });

    this.initModel();
   
  }
    private initModel(): void {
     
      const randomId = this.getRandomId();
      this.user = {
        id: randomId,
        avatar: `${AVATAR_URL}/${randomId}.png`,
        countrycode:"+65",
        telphoneno:"82672065",
       flag:"https://restcountries.eu/data/sgp.svg"
      };
      this.chatService.setValue(this.user);
    }
    private getRandomId(): number {
      return Math.floor(Math.random() * (1000000)) + 1;
    }
  
    private openUserPopup(params): void {
      
      this.dialogRef = this.dialog.open(UserProfileComponent, params);

      this.dialogRef.afterClosed().subscribe(paramsDialog => {
    //  this.user.name = paramsDialog.username;
     this.user= this.chatService.getValue();
     console.log(this.user.name );
  // this.lastname = paramsDialog.lastname;
      });
    }
   
    
  public onClickUserInfo() {
   this.user= this.chatService.getValue();
    this.openUserPopup({
      data: {
        avatar:this.user.avatar,
        username: this.user.name,
        lastname: this.user.lastname,
        countrycode: this.user.countrycode,
        telphoneno: this.user.telphoneno,
        flag: this.user.flag,
        title: 'Profile',
        dialogType: DialogUserType
      }
    });
    
  }
  onSelect(index) {
    this.user= this.chatService.getValue();
    this.user.flag =this.country[index].flag;
    this.user.countrycode =this.country[index].callingCodes;
  
    this.countryFlag=this.country[index].flag;
    this.countryCode=this.country[index].callingCodes;
    this.chatService.setValue(this.user);
  }
  onClickChatUser(val){
    this.activeUsers = this.socketService.users;
   this.clickstatus=!this.clickstatus;
  }

}
