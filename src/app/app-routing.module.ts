import { TournamentUserlistComponent } from './tournament/tournament-userlist/tournament-userlist.component';
import { TournamentListComponent } from './tournament/tournament-list/tournament-list.component';
import { CreateTournamnetComponent } from './tournament/create-tournamnet/create-tournamnet.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { PmComponent } from './pm/pm.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
},
{
    path: 'user',
    component: UserComponent
},
{
    path: 'pm',
    component: PmComponent
},
{
    path: 'admin',
    component: AdminComponent
},
{
    path: 'auth/login',
    component: LoginComponent
},
{
    path: 'signup',
    component: RegisterComponent
},
{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
},
{
  path: 'tournament',
  component: TournamentListComponent
},
{
  path: 'addtour',
  component: CreateTournamnetComponent
},
{
  path: 'scoreboard',
  component: UserListComponent
},
{
  path: 'usertournament',
  component: TournamentUserlistComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
