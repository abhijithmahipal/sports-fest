import { Team } from './../models/team';
import { StandingsOutput } from './../models/standingsOutput';
import { Fixture } from './../models/fixture';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Player } from '../models/player';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore, database } from 'firebase';
import { isNgTemplate } from '@angular/compiler';
import { promise } from 'protractor';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  formData: Team;
  standingsRef: AngularFirestoreCollection<Team> = null;

  constructor(private db: AngularFirestore, private http: HttpClient, private spinner: NgxSpinnerService) { 
    this.standingsRef = this.db.collection<Team>('standings')
  }

  getTeamStandings() {    
    return this.standingsRef;
  }

  getMatchDay() {
    return this.db.collection<Team>('standings', ref => ref.orderBy('P', 'asc').limit(1)).valueChanges();    
  }

  getTopScorers() {
    return this.db.collection<Team>('standings', ref => ref.orderBy('GF', 'desc').limit(4)).valueChanges();
  }

  getBestDefences() {
    return this.db.collection<Team>('standings', ref => ref.orderBy('GA', 'asc').limit(4)).valueChanges();
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

    if(homeTeamUpdate.Form.length >= 5) {
      homeTeamUpdate.Form.pop();
    }

    if(awayTeamUpdate.Form.length >= 5) {
      awayTeamUpdate.Form.pop();
    }
    
    if(homeGoals > awayGoals) {
      homeTeamUpdate.Pts = homeTeamUpdate.Pts + 3;
      homeTeamUpdate.W++;
      awayTeamUpdate.L++;      

      homeTeamUpdate.Form.splice(0, 0, "W");      
      awayTeamUpdate.Form.splice(0, 0, "L");
    }
    else if(awayGoals > homeGoals) {
      awayTeamUpdate.Pts = awayTeamUpdate.Pts + 3;
      awayTeamUpdate.W++;
      homeTeamUpdate.L++;

      homeTeamUpdate.Form.splice(0, 0, "L");      
      awayTeamUpdate.Form.splice(0, 0, "W");
    }
    else {
      awayTeamUpdate.Pts++;
      awayTeamUpdate.D++;
      homeTeamUpdate.Pts++;
      homeTeamUpdate.D++;

      homeTeamUpdate.Form.splice(0, 0, "D");      
      awayTeamUpdate.Form.splice(0, 0, "D");
    }
    
    var homeTeamPromise = this.standingsRef.doc(homeTeam.id).update(homeTeamUpdate);
    var awayTeamPromise = this.standingsRef.doc(awayTeam.id).update(awayTeamUpdate);  
    
    return Promise.all([homeTeamPromise, awayTeamPromise]);    
  }

  addPlayer(playerData: Player) {
    const data = Object.assign({}, playerData);
    this.db.collection('players').add(data);
  }

  getTeamSquad(id: string) {
    return this.db.firestore.collection('players').where('teamName', '==', 'teams/' + id);
  }
}
