import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team';
import * as _ from 'lodash';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.css']
})
export class SquadComponent implements OnInit {
  teamList: Team[];
  selectedTeam: Team;
  squad: DocumentData = [];
  constructor(private service: TeamService) { }

  async ngOnInit() {
    this.service.getTeams().subscribe(res => this.teamList = res);
    this.selectedTeam = {id: '-1', name: 'choose team', manager1: null, manager2: null, captain: null };
  }


  public getSquad(){
    this.service.getTeamSquad(this.selectedTeam.id).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
         this.squad.push(doc.data());
      });
    });
  }

  setTeam(team: Team){
    this.squad = [];
    this.selectedTeam = team;
    this.getSquad();
  }
}
