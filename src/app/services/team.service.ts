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

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  formData: Team;
  standingsRef: AngularFirestoreCollection<Team> = null;

  constructor(private db: AngularFirestore, private http: HttpClient) { 
    this.standingsRef = this.db.collection<Team>('standings')
  }

  // getTeams() {
  //   return this.db.collection('teams').snapshotChanges().pipe(map(changes => {
  //     return changes.map(action => {
  //       return {
  //         id: action.payload.doc.id,
  //         //...action.payload.doc.data()
  //       } as Team;
  //     });
  //   }));
  // }

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

  addPlayer(playerData: Player) {
    const data = Object.assign({}, playerData);
    this.db.collection('players').add(data);
  }

  getTeamSquad(id: string) {
    return this.db.firestore.collection('players').where('teamName', '==', 'teams/' + id);
  }
}
