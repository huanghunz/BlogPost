import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIG } from '../config/config'
import {Headers, Http, RequestOptions} from "@angular/http";
import { User } from "../data/user";
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

        const HTTP_OPTIONS = {
            headers: this.headers
          };

        const url = `${CONFIG.API_URL}/user/${id}`
        return this.httpc.get<User>(url, HTTP_OPTIONS)
                    .toPromise()
                    .then(res =>{
                        return res;
                    });

    }
}