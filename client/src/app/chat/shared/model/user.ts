export interface User {
    id?: number;
    name?: string;
    avatar?: string;
    lastname?: string;
    countrycode?: string;
    telphoneno?: string;
    flag?:string;
}

export interface Country {
    name:string;
    callingCodes:string;
    alpha2Code:string;
    flag:string;
}
export interface ChatUsers {
    status:boolean;
    name: string;
}
