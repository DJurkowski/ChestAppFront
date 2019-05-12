import { TokenStorageService } from './../../auth/token-storage.service';
import { TournamentService } from './../../services/tournament.service';
import { Tournament } from './../tournament';
import { Component, OnInit } from '@angular/core';
import { TournamentInfo } from '../tournament-info';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

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
  isErrorDate = false;
  isErrorCurrentDate = false;
  errorDate = '';
  errorDateStart = '';

  username: string;
  times = [ 1, 5, 10, 15];

  constructor(private tournamentService: TournamentService, private token: TokenStorageService,
    private datePipe: DatePipe, private router: Router) { }

  ngOnInit() {
    if (this.token.getToken()) {
      this.username = this.token.getUsername();
    } else {
      this.router.navigate(['home']);
    }
  }

  currentDateCheck() {
    if (this.form.startDate < this.datePipe.transform(new Date(), 'yyyy-mm-dd')) {
      console.log('Jestem w Current');
      this.isErrorCurrentDate = true;
      this. errorDateStart = 'Start Date must be date in future, not past';
    } else {
      this.isErrorCurrentDate = false;
    }
  }

  compareTwoDates() {
    if (this.form.startDate > this.form.endDate) {
        this.isErrorDate = true;
       this.errorDate = 'End Date can\'t be before start date';
    } else if (this.form.endDate < this.datePipe.transform(new Date(), 'yyyy-mm-dd')) {
        this.isErrorDate = true;
      this. errorDate = 'End Date must be date in future, not past';
    } else {
      this.isErrorDate = false;

    }
  }

  onSubmit() {
    console.log(this.form);

    this.tournamentInfo = new TournamentInfo(
      this.form.name,
      this.form.description,
      this.form.maxNumberOfUser,
      this.form.matchTime,
      this.form.startDate,
      this.form.endDate
    );

    if (this.isErrorDate === false && this.isErrorCurrentDate === false) {
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

}
