import { FriendListComponent } from './friend/friend-list/friend-list.component';
import { TournamentEditListComponent } from './tournament/tournament-edit-list/tournament-edit-list.component';
import { UserStatisticsComponent } from './user/user-statistics/user-statistics.component';
import { GameroomlistComponent } from './chess/gameroomlist/gameroomlist.component';
import { RoomListComponent } from './room/room-list/room-list.component';
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
import { NotificationsComponent } from './notifications/notifications/notifications.component';
import { UserFriendComponent } from './friend/user-friend/user-friend.component';
import { CreateQuickGameComponent } from './game/create-quick-game/create-quick-game.component';
import { QuickGameListComponent } from './game/quick-game-list/quick-game-list.component';

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
},
{
  path: 'rooms',
  component: RoomListComponent
},
{
  path: 'gamerooms',
  component: GameroomlistComponent
},
{
  path: 'notifications',
  component: NotificationsComponent
},
{
  path: 'userStats',
  component: UserStatisticsComponent
},
{
  path: 'tourDetails',
  component: TournamentEditListComponent
},
{
  path: 'friendList',
  component: FriendListComponent
},
{
  path: 'userFriendList',
  component: UserFriendComponent
},
{
  path: 'createQuickGame',
  component: CreateQuickGameComponent
},
{
  path: 'quickGameList',
  component: QuickGameListComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
