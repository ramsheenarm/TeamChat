import {User} from './user';

export class Message {
    constructor(public from: User, private content: string) {}
}