import { Router } from '@angular/router';
import { StandingsOutput } from './../models/standingsOutput';
import { Fixture } from './../models/fixture';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Team } from '../models/team';
import { Player } from '../models/player';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore, database } from 'firebase';
import { isNgTemplate } from '@angular/compiler';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  formData: Team;
  standingsRef: AngularFirestoreCollection<Team> = null;

  constructor(private db: AngularFirestore, private http: HttpClient, private router:Router) { 
    this.standingsRef = this.db.collection<Team>('standings')
  }

  getTeamStandings() {    
    return this.standingsRef;
  }

  getFixtures() {
    return this.http.get<Fixture[]>('../assets/fixture.json').toPromise();
  }

  addTeam(teamData: Team) {
    const data = Object.assign({}, teamData);
    this.db.collection('teams').add(data);
    // this.firestore.doc('teams/' + form.value.id).update(data); //to update row.
  }

  updateScore(homeTeam: StandingsOutput, awayTeam: StandingsOutput, homeGoals:number, awayGoals:number) {
    var homeTeamUpdate = Object.assign({}, homeTeam.data);
    var awayTeamUpdate = Object.assign({}, awayTeam.data);

    homeTeamUpdate.P++;
    homeTeamUpdate.GF = homeTeamUpdate.GF + homeGoals;
    homeTeamUpdate.GA = homeTeamUpdate.GA + awayGoals;
    homeTeamUpdate.GD = homeTeamUpdate.GF - homeTeamUpdate.GA;

    awayTeamUpdate.P++;
    awayTeamUpdate.GF = awayTeamUpdate.GF + awayGoals;
    awayTeamUpdate.GA = awayTeamUpdate.GA + homeGoals;
    awayTeamUpdate.GD = awayTeamUpdate.GF - awayTeamUpdate.GA; 
    
    if(homeGoals > awayGoals) {
      homeTeamUpdate.Pts = homeTeamUpdate.Pts + 3;
      homeTeamUpdate.W++;
      awayTeamUpdate.L++;
    }
    else if(awayGoals > homeGoals) {
      awayTeamUpdate.Pts = awayTeamUpdate.Pts + 3;
      awayTeamUpdate.W++;
      homeTeamUpdate.L++;
    }
    else {
      awayTeamUpdate.Pts++;
      awayTeamUpdate.D = awayTeamUpdate.D++;
      homeTeamUpdate.Pts++;
      homeTeamUpdate.D++;
    }

    this.standingsRef.doc(homeTeam.id).update(homeTeamUpdate)
      .then(x => {
        return this.standingsRef.doc(awayTeam.id).update(awayTeamUpdate);    
      })
      .then (x => {
        this.router.navigate(['/leaderboard']);
      });
    
  }

  addPlayer(playerData: Player) {
    const data = Object.assign({}, playerData);
    this.db.collection('players').add(data);
  }

  getTeamSquad(id: string) {
    return this.db.firestore.collection('players').where('teamName', '==', 'teams/' + id);
  }
}
