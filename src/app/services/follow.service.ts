import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders} from "@angular/common/http"
import { NotifyService } from "./notify.service";
import { CONFIG } from "../config/config";
import { AuthService } from "./auth.service";
import { ProgressBarService } from "./progressbar.service";

@Injectable()
export class FollowService{

    headers: HttpHeaders;

    constructor(private httpc: HttpClient,
               private notify: NotifyService,
               private authService: AuthService,
               private progressBarService: ProgressBarService){
                const authorizationMsg = `Bearer ${this.authService.getToken()}`;
                this.headers = new HttpHeaders({
                     'Authorization': authorizationMsg, 
                })
               }

    isFollowing(id: number): Promise<Boolean>{

        const isFollowingURL = `${CONFIG.API_URL}/user/is/following`;
        const body = {
            user_to_check_if_is_following_id: id
        }
        const options = {
            headers: this.headers
        }

        return this.httpc.post<any>(isFollowingURL, body, options)
                        .toPromise()
                        .then( (res)=>{
                            return res.following;
                        })
    }

    follow(id: number){

        this.progressBarService.start();
        const followURL = `${CONFIG.API_URL}/user/follow`;
        const body = {
            user_to_follow_id: id
        }
        const options = {
            headers: this.headers
        }

      
        return this.httpc.post(followURL, body, options)
                        .toPromise()
                        .then( (res)=>{
                            this.progressBarService.complete();
                            return res;
                        })
    }

    unfollow(id: number){

        this.progressBarService.start();
        const followURL = `${CONFIG.API_URL}/user/unfollow`;
        const body = {
            user_to_unfollow_id: id
        }
        const options = {
            headers: this.headers
        }

        return this.httpc.post(followURL, body, options)
                        .toPromise()
                        .then( (res)=>{
                            this.progressBarService.complete();
                            return res;
                        })
    }
}