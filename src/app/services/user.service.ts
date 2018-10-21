import { Injectable, EventEmitter } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIG } from '../config/config'
import { User } from "../data/user";
import { ProgressBarService } from "./progressbar.service";

@Injectable()
export class UserService{

    public userProfileUpdated: EventEmitter<User>

    private headers: HttpHeaders;

    constructor(private authService: AuthService,
                private httpc: HttpClient,
                private progressBarService: ProgressBarService) {
 
        const authorizationMsg = `Bearer ${this.authService.getToken()}`;
        this.headers = new HttpHeaders({
             'Authorization': authorizationMsg, 
        })
        this.userProfileUpdated = new EventEmitter<User>()
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

    getUserWall(id: number): Promise<any> {
        this.progressBarService.start();
        const httpOptions = {
            headers: this.headers
          };

        const url = `${CONFIG.API_URL}/user/profile/${id}/wall`
        return this.httpc.get(url, httpOptions)
                    .toPromise()
                    .then(res =>{
                        this.progressBarService.complete();
                        return res;
                    });

    }

    updateProfile(name: string, email: string):Promise<User>{

        this.progressBarService.start();
        const url = `${CONFIG.API_URL}/user/update`

        const body ={
            name: name,
            email: email
        }

        const httpOptions = { headers: this.headers };

        // HACK: Using <any> instead of <User> because 
        //       the object structure is different than a User class
        return this.httpc.put<any>(url, body, httpOptions)
                        .toPromise()
                        .then((res)=>{
                            this.progressBarService.complete();
                            localStorage.setItem(CONFIG.USER, JSON.stringify(res));

                            const updatedUser = res.data as User;
                            this.userProfileUpdated.emit(updatedUser);
                            return updatedUser;
                        })
    }
}