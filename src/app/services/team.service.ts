import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { Player } from '../models/player';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore, database } from 'firebase';
import { isNgTemplate } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  formData: Team;

  constructor(private db: AngularFirestore) { }

   getTeams(){
    return this.db.collection("teams").snapshotChanges().pipe(map(changes=>{
      return changes.map(action=>{
        return { 
          id: action.payload.doc.id,
          ...action.payload.doc.data()
        } as Team;
      })}))
    }
   
  

  addTeam(teamData: Team) {
    let data = Object.assign({}, teamData);
    this.db.collection('teams').add(data);
    //this.firestore.doc('teams/' + form.value.id).update(data); //to update row.
  }

  addPlayer(playerData: Player){
    let data = Object.assign({}, playerData);
    this.db.collection('players').add(data);
  }

  getTeamSquad(id: string) {
    var squad:Player[]
    return this.db.firestore.collection("players").where('teamName','==',id).get();
  }
}
