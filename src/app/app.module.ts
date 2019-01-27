import { TournamentService } from './services/tournament.service';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { PmComponent } from './pm/pm.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { TokenStorageService } from './auth/token-storage.service';
import { AuthService } from './auth/auth.service';
import { CreateTournamnetComponent } from './tournament/create-tournamnet/create-tournamnet.component';
import { TournamnetDetailsComponent } from './tournament/tournamnet-details/tournamnet-details.component';
import { TournamentListComponent } from './tournament/tournament-list/tournament-list.component';
import { TournamentUserlistComponent } from './tournament/tournament-userlist/tournament-userlist.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    PmComponent,
    CreateTournamnetComponent,
    TournamnetDetailsComponent,
    TournamentListComponent,
    TournamentUserlistComponent,
    UserListComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [httpInterceptorProviders, TokenStorageService, AuthService, UserService, TournamentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
