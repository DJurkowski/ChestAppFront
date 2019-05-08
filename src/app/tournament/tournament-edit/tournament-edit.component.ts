import { UserService } from 'src/app/services/user.service';
import { TournamentEditListComponent } from './../tournament-edit-list/tournament-edit-list.component';
import { Component, OnInit, Input } from '@angular/core';
import { Tournament } from '../tournament';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tournament-edit',
  templateUrl: './tournament-edit.component.html',
  styleUrls: ['./tournament-edit.component.css']
})
export class TournamentEditComponent implements OnInit {

  @Input() tournament: Tournament;

  username: string;
  userId: number;
  private userIdentification: Observable<Object>;
  form: any = {};

  isEdited = false;
  isEditedFailed = false;
  isDeleteFailed = false;
  errorMessage: string;

  public isDisabled = true;

  public times = [ 1, 5, 10, 15];

  constructor(private tournamentService: TournamentService, private userService: UserService, private token: TokenStorageService,
    private detailsComponent: TournamentEditListComponent) {
    this.username = this.token.getUsername();
    this.userIdentification = this.userService.getUserId(this.username);
    this.userIdentification.subscribe(data => {
      this.userId = Number(data);
    });
   }

  ngOnInit() {
    this.form = this.tournament;
  }

  disabledFunction() {
    this.isDisabled = !this.isDisabled;
  }

  onSubmit() {
    this.tournamentService.modifyTournament(this.username, this.tournament.id, this.form).subscribe(
      data => {
        console.log(data);
        this.isEdited = true;
        this.isEditedFailed = false;
        this.disabledFunction();
        this.detailsComponent.reloadData();
      },
      error => {
        this.errorMessage = error.error.message;
        this.isEditedFailed = true;
      }

    );
  }

  deleteTournament() {
    this.tournamentService.deleteTournament(this.tournament.id, this.username)
      .subscribe(
        data => {
          console.log(data);
          this.detailsComponent.reloadData();
        },
        error => {
          this.errorMessage = error.error.message;
        }
      );
  }

}
