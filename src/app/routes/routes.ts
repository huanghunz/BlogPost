import {RegisterComponent} from './../register/register.component'
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { AuthGurad } from '../guard/auth.guard';
import { AuthedGurad } from '../guard/authed.guard';
import { ProfileComponent } from '../profile/profile.component';

import { WallComponent } from './../profile/wall/wall.component';
import { EditProfileComponent } from './../profile/edit-profile/edit-profile.component';
import { CreateJokeComponent } from '../create-joke/create-joke.component';


export const ROUTES = [
    {
        path:'auth/register',
        component: RegisterComponent,
        canActivate:[AuthedGurad]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate:[AuthGurad]
    },
    {
        path: 'auth/login',
        component: LoginComponent
    },
    {
        path: "user/profile/:id",
        component: ProfileComponent,
        canActivate:[AuthGurad],
        children:[
            {
                path: '',
                component: WallComponent
            },
            {
                path: 'edit',
                component: EditProfileComponent
            }
        ]
    },
    {
        path: 'create/joke',
        component: CreateJokeComponent
    }
]