import { ForgotPasswordComponent } from './mail/forgot-password/forgot-password.component';
import { MailService } from './services/mail.service';
import { MatchService } from './services/match.service';
import { GameService } from './chess/game.service';
import { RoomService } from './services/room.service';
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
import { TournamentListComponent } from './tournament/tournament-list/tournament-list.component';
import { TournamentUserlistComponent } from './tournament/tournament-userlist/tournament-userlist.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { RoomListComponent } from './room/room-list/room-list.component';
import { RoomListDetailComponent } from './room/room-list-detail/room-list-detail.component';
import { BoardComponent } from './chess/board/board.component';
import { FigureErrorDialogComponent } from './chess/figure-error-dialog/figure-error-dialog.component';
import { GameroomlistComponent } from './chess/gameroomlist/gameroomlist.component';
import { KingComponent } from './chess/king/king.component';
import { KnightComponent } from './chess/knight/knight.component';
import { PawnComponent } from './chess/pawn/pawn.component';
import { SquareComponent } from './chess/square/square.component';
import { MatDialogModule, MatButtonModule, MatCheckboxModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationsComponent } from './notifications/notifications/notifications.component';
import { WebSocketService } from './globalService/web-socket.service';
import { NotificationService } from './services/notification.service';
import { RookComponent } from './chess/rook/rook.component';
import { BishopComponent } from './chess/bishop/bishop.component';
import { QueenComponent } from './chess/queen/queen.component';
import { OpponentDialogComponent } from './chess/opponent-dialog/opponent-dialog.component';
import { UserStatisticsComponent } from './user/user-statistics/user-statistics.component';
import { SearchPipe } from './user/search.pipe';
import { TournamentEditComponent } from './tournament/tournament-edit/tournament-edit.component';
import { TournamentEditListComponent } from './tournament/tournament-edit-list/tournament-edit-list.component';
import { FriendListComponent } from './friend/friend-list/friend-list.component';
import { FriendService } from './services/friend.service';
import { UserFriendComponent } from './friend/user-friend/user-friend.component';
import { UserFriendDetailsComponent } from './friend/user-friend-details/user-friend-details.component';
import { DatePipe } from '@angular/common';
import { CreateQuickGameComponent } from './game/create-quick-game/create-quick-game.component';
import { QuickGameListComponent } from './game/quick-game-list/quick-game-list.component';
import { FriendPipePipe } from './friend/friend-pipe.pipe';
import { TournamentMatchesComponent } from './tournament/tournament-matches/tournament-matches.component';
import { AllQuickGamesComponent } from './game/all-quick-games/all-quick-games.component';
import { TourSearchPipe } from './tournament/tour-search.pipe';


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
    TournamentListComponent,
    TournamentUserlistComponent,
    UserListComponent,
    UserDetailsComponent,
    RoomListComponent,
    RoomListDetailComponent,
    BoardComponent,
    FigureErrorDialogComponent,
    GameroomlistComponent,
    KingComponent,
    KnightComponent,
    PawnComponent,
    SquareComponent,
    NotificationsComponent,
    RookComponent,
    BishopComponent,
    QueenComponent,
    OpponentDialogComponent,
    UserStatisticsComponent,
    SearchPipe,
    TournamentEditComponent,
    TournamentEditListComponent,
    FriendListComponent,
    UserFriendComponent,
    UserFriendDetailsComponent,
    CreateQuickGameComponent,
    QuickGameListComponent,
    FriendPipePipe,
    ForgotPasswordComponent,
    TournamentMatchesComponent,
    AllQuickGamesComponent,
    TourSearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule
  ],
  providers: [httpInterceptorProviders, TokenStorageService, AuthService, UserService, TournamentService, RoomService, GameService,
    MatchService, WebSocketService, NotificationService, FriendService, DatePipe, MailService],
  bootstrap: [AppComponent],
  entryComponents: [FigureErrorDialogComponent, OpponentDialogComponent, BoardComponent]
})
export class AppModule { }
