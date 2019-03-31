import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Message } from '../model/message';
import { Event } from '../model/event';

import * as socketIo from 'socket.io-client';
import { User } from '../model/user';

const SERVER_URL = 'http://localhost:8080';


@Injectable()
export class SocketService {
    private socket: SocketIOClient.Socket;

    public users:User[];
    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
       
    }

    // public test(){ 
    //     console.log(this.socket);
    // //    this.socket.clients((error, clients) => {
    // //         if (error) throw error;
    // //         console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
    // //       });
    // }
    public send(message: Message): void {
        this.socket.emit('message', message);
        //this.test();
    }

    public onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
  
    public getUsers():Observable<any>  {
        // console.log("From GetUses");
        return new Observable<Event>(observer => {
        this.socket.on('users', (users) => {
            this.users = users;
            // this.users = this.removeDups(users);
            // console.log(this.users);
          });
         
    });
}

//  removeDups(users:User[]) {
//     let unique = {};
//     users.forEach(function(i) {
//       if(!unique[i.name]) {
//         unique[i.name] = true;
//       }
//     });
//     return Object.keys(unique) as User[];
//   }

}
