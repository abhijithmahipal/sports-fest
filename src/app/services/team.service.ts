import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  formData: Team;

  constructor(private firestore: AngularFirestore) { }

  getTeams() {
    return this.firestore.collection('teams').snapshotChanges();
  }
}
