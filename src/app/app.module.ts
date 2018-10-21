import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'
import { ROUTES } from './routes/routes'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';

import { FormsModule, ReactiveFormsModule} from "@angular/forms"
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGurad } from './guard/auth.guard';
import { AuthedGurad } from './guard/authed.guard';

import { NotifyComponent } from './notify/notify.component';
import { NotifyService } from './services/notify.service';
import { ProfileComponent } from './profile/profile.component';
import { UserService } from './services/user.service';
import { PrettyDatePipe } from './pipes/prettify-date.pipe';

import { NgProgressModule } from '@ngx-progressbar/core';
import { WallComponent } from './profile/wall/wall.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { FollowComponent } from './profile/follow/follow.component';
import { FollowService } from './services/follow.service';
import { CreateJokeComponent } from './create-joke/create-joke.component';
import { JokeService } from './services/joke.service';
import { ProgressBarService } from './services/progressbar.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DashboardComponent,
    LoginComponent,
    NotifyComponent,
    ProfileComponent,
    PrettyDatePipe,
    WallComponent,
    EditProfileComponent,
    FollowComponent,
    CreateJokeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    NgProgressModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGurad, AuthedGurad,
              NotifyService, UserService, FollowService,
              JokeService, ProgressBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
