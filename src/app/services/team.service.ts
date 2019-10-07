import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  formData: Team;

  constructor(private firestore: AngularFirestore) { }

  getTeams() {
    return this.firestore.collection('teams').snapshotChanges();
  }

  addTeam(teamData: Team) {
    let data = Object.assign({}, teamData);
    this.firestore.collection('teams').add(data);
    //this.firestore.doc('teams/' + form.value.id).update(data); //to update row.
  }

  addPlayer(playerData: Player){
    let data = Object.assign({}, playerData);
    this.firestore.collection('players').add(data);
  }
}
