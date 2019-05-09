import { FriendService } from './../../services/friend.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Friend } from '../friend';
import { WebSocketService } from 'src/app/globalService/web-socket.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  friends: Observable<Friend[]>;
  friendsList: Array<Friend> = new Array<Friend>();
  friendWaitList: Array<Friend> = new Array<Friend>();
  friendAccept: Array<Friend> = new Array<Friend>();
  usernameId: string;

  isEmpty = false;

  constructor(private token: TokenStorageService, private friendService: FriendService, private webSocketService: WebSocketService) {
    this.usernameId = this.token.getUsername();
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this. isEmpty = false;
    this.friendsList = [];
    this.friendWaitList = [];
    this.friendAccept = [];

    this.friends = this.friendService.getUserFriends(this.usernameId);
    this.friends.forEach(data => {
      data.forEach(xdata => {
        console.log('Jestem1: ' + xdata);
        if (xdata.userOneAccept === false && xdata.userTwoAccept === false) {
        console.log('Jestem2: ' + xdata);
          this.friendsList.push(xdata);
        } else if (xdata.userOneName === this.usernameId) {
          if (xdata.userOneAccept === true && xdata.userTwoAccept === false) {
          console.log('Jestem3: ' + xdata);
            this.friendWaitList.push(xdata);
          } else if (xdata.userOneAccept === false && xdata.userTwoAccept === true) {
        console.log('Jestem4: ' + xdata);
            this.friendAccept.push(xdata);
          }
        } else if (xdata.userTwoName === this.usernameId) {
          if (xdata.userTwoAccept === true && xdata.userOneAccept === false) {
        console.log('Jestem5: ' + xdata);

            this.friendWaitList.push(xdata);
          } else if (xdata.userTwoAccept === false && xdata.userOneAccept === true) {
          console.log('Jestem6: ' + xdata);

            this.friendAccept.push(xdata);
          }
        } else if ( xdata.userOneAccept === true && xdata.userTwoAccept === true) {
          console.log('Wyswietlam friend: ' + xdata);
        }

        if ((this.friendsList.length === 0) && (this.friendWaitList.length === 0) && (this.friendAccept.length === 0)) {
          this.isEmpty = true;
        }
      });
    });
  }

  sendInvitation(friendId: number) {
    for (const i of this.friendsList) {
        if (i.id === friendId) {
          if (i.userOneName === this.usernameId) {
            i.userOneAccept = true;
            this.friendService.sendInvitation(this.usernameId, i).subscribe(
              data => {
                this.webSocketService.sendMessage('noti', i.id, this.usernameId, i.userTwoId,
                this.usernameId + ' send you friend request');
                this.reloadData();
              }
            );
          } else {
            i.userTwoAccept = true;
            this.friendService.sendInvitation(this.usernameId, i).subscribe(
              data => {
                this.webSocketService.sendMessage('noti', i.id, this.usernameId, i.userOneId,
                this.usernameId + ' send you friend request');
                this.reloadData();
              }
            );
          }
        }
      }
      for (const i of this.friendAccept) {
        if (i.id === friendId) {
          if (i.userOneName === this.usernameId) {
            i.userOneAccept = true;
            this.friendService.sendInvitation(this.usernameId, i).subscribe(
              data => {
                this.webSocketService.sendMessage('noti', i.id, this.usernameId, i.userTwoId,
                this.usernameId + ' accepted your invitation');
                this.reloadData();
              }
            );
          } else {
            i.userTwoAccept = true;
            this.friendService.sendInvitation(this.usernameId, i).subscribe(
              data => {
                this.webSocketService.sendMessage('noti', i.id, this.usernameId, i.userOneId,
                this.usernameId + ' accepted your invitation');
                this.reloadData();
              }
            );
          }
        }
      }
    }


    denyInvitation(friendId: number) {
      for (const i of this.friendAccept) {
        if (i.id === friendId) {
          if (i.userOneName === this.usernameId) {
            i.userTwoAccept = false;
            this.friendService.sendInvitation(this.usernameId, i).subscribe(
              data => {
                this.webSocketService.sendMessage('noti', i.id, this.usernameId, i.userTwoId,
                this.usernameId + ' deny your friend request');
                this.reloadData();
              }
            );
          } else {
            i.userOneAccept = false;
            this.friendService.sendInvitation(this.usernameId, i).subscribe(
              data => {
                this.webSocketService.sendMessage('noti', i.id, this.usernameId, i.userOneId,
                this.usernameId + ' deny your friend request');
                this.reloadData();
              }
            );
          }
        }
      }
    }

  }
