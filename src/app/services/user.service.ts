import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIG } from '../config/config'
import {Headers, Http, RequestOptions} from "@angular/http";
import { User } from "../data/user";
import { UserData } from "../data/userData";
@Injectable()
export class UserService{

    private headers: HttpHeaders;

    constructor(private authService: AuthService,
                private httpc: HttpClient) {
                    this.authService.getToken(); 
        const authorizationMsg = `Bearer ${this.authService.getToken()}`;
         this.headers = new HttpHeaders({
             'Authorization': authorizationMsg, 
         })
    }

    getUserById(id: number) : Promise<User>{
        if (id == this.authService.getAuthUserId()){
            return Promise.resolve(this.authService.getAuthUser());
        }

        const httpOptions = {
            headers: this.headers
          };

        const url = `${CONFIG.API_URL}/user/${id}`
        return this.httpc.get<User>(url, httpOptions)
                    .toPromise()
                    .then(res =>{
                        return res;
                    });

    }

    updateProfile(name: string, email: string):Promise<User>{

        const url = `${CONFIG.API_URL}/user/update`

        const body ={
            name: name,
            email: email
        }

        const httpOptions = { headers: this.headers };

        return this.httpc.put<User>(url, body, httpOptions)
                        .toPromise()
                        .then( (res)=>{
                            localStorage.setItem(CONFIG.USER, JSON.stringify(res));
                            return res as User;
                        })
    }
}