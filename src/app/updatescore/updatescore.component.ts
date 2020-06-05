import { FixturesOutput } from './../models/fixturesOutput';
import { Fixture } from './../models/fixture';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { StandingsOutput } from './../models/standingsOutput';
import { map } from 'rxjs/operators';
import { Team } from './../models/team';
import { TeamService } from 'src/app/services/team.service';
import { Component, OnInit } from '@angular/core';
import { element, promise } from 'protractor';
import { ThrowStmt } from '@angular/compiler';
import * as _ from 'lodash';

@Component({
  selector: 'app-updatescore',
  templateUrl: './updatescore.component.html',
  styleUrls: ['./updatescore.component.css']
})
export class UpdatescoreComponent implements OnInit {

  leastMatchDay: number = 18;
  teamsData: StandingsOutput[];
  selectedMatchDay: number;
  homeTeams: Team[] = new Array<Team>();
  awayTeams: Team[] = new Array<Team>();
  selectedHomeTeam: Team = new Team();
  selectedAwayTeam: Team = new Team();
  homeGoals: number;
  awayGoals: number;
  password: string;  
  fixtures: FixturesOutput[] = new Array<FixturesOutput>();

  showMatchSelector: boolean = false;
  showErrorMsg: boolean = false;
  isIncorrectPassword: boolean = false;
  isButtonDisabled: boolean = false;

  constructor(private teamService: TeamService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.teamService.getTeamStandings().snapshotChanges()
      .pipe(map(cahnges =>
        cahnges.map(c => {
          return {
            id: c.payload.doc.id,
            data: c.payload.doc.data()
          };
        }))
      ).subscribe(x => {
        this.teamsData = x;

        this.teamsData.forEach(element => {         
          if (element.data.P < this.leastMatchDay) {
            this.leastMatchDay = element.data.P;
          }
        });
        
        this.selectedMatchDay = this.leastMatchDay + 1;

        this.initAwayTeam();
        this.initHomeTeam();

        this.spinner.hide();
      });

      this.teamService.getAllMatches().snapshotChanges()
        .pipe(map(changes => 
          changes.map(c => {
            return {
              id: c.payload.doc.id,
              data: c.payload.doc.data()
            };
          
        }))).subscribe(x => {
          this.fixtures = x;
        });
  }

  initHomeTeam() {
    this.homeTeams = new Array<Team>();
    this.teamsData.forEach(element => { 
      if(element.data.P < this.selectedMatchDay)
        this.homeTeams.push(element.data);
    });
  }

  initAwayTeam() {
    this.awayTeams = new Array<Team>();
    this.teamsData.forEach(element => { 
      if(element.data.P < this.selectedMatchDay)
        this.awayTeams.push(element.data)
    });
  }

  onMatchDaySelected() {
    this.initHomeTeam();
    this.initAwayTeam();
    this.showMatchSelector = true;
  }

  onHomeTeamChange() {
    if (!this.selectedAwayTeam.Teams || this.selectedHomeTeam.Teams === this.selectedAwayTeam.Teams) {
      this.initAwayTeam();
      this.selectedAwayTeam = new Team();
      var index = this.awayTeams.findIndex(x => x.Teams === this.selectedHomeTeam.Teams);
      this.awayTeams.splice(index, 1);
    }    
  }

  onAwayTeamChange() {
    if(!this.selectedHomeTeam.Teams || this.selectedAwayTeam.Teams === this.selectedHomeTeam.Teams) {
      this.initHomeTeam();
      this.selectedHomeTeam = new Team();    
      var index = this.homeTeams.findIndex(x => x.Teams === this.selectedAwayTeam.Teams);
      this.homeTeams.splice(index, 1);      
    }
  }

  updateScore() {
    this.isButtonDisabled = true;
    this.spinner.show();
    var homeTeamUpdateIndex = this.teamsData.findIndex(x => x.data.Teams === this.selectedHomeTeam.Teams);
    var homeTeamUpdate = this.teamsData[homeTeamUpdateIndex];

    var awayTeamUpdateIndex = this.teamsData.findIndex(x => x.data.Teams === this.selectedAwayTeam.Teams);
    var awayTeamUpdate = this.teamsData[awayTeamUpdateIndex];    

    var matchString = this.selectedHomeTeam.Teams + " vs " + this.selectedAwayTeam.Teams;
    var matchScore = this.homeGoals + " - " + this.awayGoals;

    var selectedMatch = _.find(this.fixtures, x => x.data.game.replace(/\s/g, "") == matchString.replace(/\s/g, ""));
    selectedMatch.data.score = matchScore;        

    if(this.password === "halamadrid") {
      if(this.homeGoals !== undefined && this.awayGoals !== undefined && this.selectedHomeTeam && this.selectedAwayTeam) {
        this.teamService.updateFixtureScore(selectedMatch.id, selectedMatch.data)
          .then(() => {
            return this.teamService.updateScore(homeTeamUpdate, awayTeamUpdate, this.homeGoals, this.awayGoals);
          })
          .then(() => {
            this.isButtonDisabled = false;
            this.spinner.hide();
            this.router.navigate(['/leaderboard'])
          });            
      }           
      else {
        this.isButtonDisabled = false;
        this.spinner.hide();
        this.showErrorMsg = true; 
      }        
    }
    else {
      this.isButtonDisabled = false;
      this.spinner.hide();
      this.isIncorrectPassword = true;
    }
         
  }

}
