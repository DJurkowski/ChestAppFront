import { TokenStorageService } from './../../auth/token-storage.service';
import { TournamentService } from './../../services/tournament.service';
import { Tournament } from './../tournament';
import { Component, OnInit } from '@angular/core';
import { TournamentInfo } from '../tournament-info';

@Component({
  selector: 'app-create-tournamnet',
  templateUrl: './create-tournamnet.component.html',
  styleUrls: ['./create-tournamnet.component.css']
})
export class CreateTournamnetComponent implements OnInit {

  form: any = {};
  tournamentInfo: TournamentInfo;
  isCreated = false;
  isCreatedFailed = false;
  errorMessage = '';

  username: string;

  constructor(private tournamentService: TournamentService, private token: TokenStorageService) { }

  ngOnInit() {
    this.username = this.token.getUsername();
  }

  onSubmit() {
    console.log(this.form);

    this.tournamentInfo = new TournamentInfo(
      this.form.name,
      this.form.description,
      this.form.minValueOfRankValue,
      this.form.maxNumberOfUser
    );
    this.tournamentService.createTournament(this.tournamentInfo, this.username).subscribe(
      data => {
        console.log(data);
        this.isCreated = true;
        this.isCreatedFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isCreatedFailed = true;
      }
    );
  }

}
