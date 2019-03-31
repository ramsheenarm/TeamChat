import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

import { Message, User } from  './model';
import { AnyARecord } from 'dns';
import { json } from 'body-parser';

export class ChatServer {
    public static readonly PORT: number = 8080;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;
   private user:User;
   private activeUsers:User[]=[];
    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private config(): void {
        this.port = process.env.PORT || ChatServer.PORT;
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

 
    setActiveUsers(m: Message,scoketid:string) {
       this.user  =m.from;// JSON.stringify(m);
       this.user.active = true;
       this.user.socketId=scoketid;
       
       this.activeUsers.push(this.user);

    console.log(this.activeUsers);
          }
          makeUserInactive(scoketid:string) {
        //   let index=   this.activeUsers.findIndex(user => this.user.socketId == scoketid)
  ///findIndex not availiable in es5 , my sample is in es5 :)

         this.activeUsers.forEach( (item, i, users) =>{
         if( users[i].socketId == scoketid){
             console.log(users[i]);
             users[i].active=false;
         }
        }
         
         );


               }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });


        this.io.on('connect', (socket: any) => {
            

            console.log('Connected client on port %s.', this.port);
            socket.on('message', (m: Message) => {
                console.log('[serversdfsfsdf](message): %s', JSON.stringify(m));               
                this.setActiveUsers(m,socket.id);
                this.io.emit('users', this.activeUsers); 
                this.io.emit('message', m);
            });

            socket.on('disconnect', () => {
                console.log('socket.id'  + socket.id);
                this.makeUserInactive(socket.id)
                console.log('Client disconnected');
                console.log(this.activeUsers);
                this.io.emit('users', this.activeUsers);

            });

            // socket.on('users', () => {
            //     // this.makeUserInactive(socket.id)
            //     // console.log('Client disconnected');
            //     console.log("Am called from users");
            //     console.log(this.activeUsers);
            // });

        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}