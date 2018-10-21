import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIG } from '../config/config'
import {Headers, Http, RequestOptions} from "@angular/http";
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

    getUserById(id: number){
        if (id == this.authService.getAuthUserId()){
            return this.authService.getAuthUser();
        }

        const HTTP_OPTIONS = {
            headers: this.headers
          };

        //   let options = new RequestOptions({
        //       headers: this.headers
        //   })

          console.log("id: ", id);

        const url = `${CONFIG.API_URL}user/${id}`
        return this.httpc.get(url, HTTP_OPTIONS)
                    .toPromise()
                    .then(res =>{
                        console.log("user service: ", res);
                    });

    }
}