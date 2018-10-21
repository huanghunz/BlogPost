
import {User} from './user/user'

export class UserData{
    constructor(
        public token: string,
        public user: User,
    ){

    }
}