import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team';
import * as _ from 'lodash';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.css']
})
export class SquadComponent implements OnInit {
  teamList: Team[];
  selectedTeam: Team;
  squad: Player[];
  constructor(private service: TeamService) { }

  async ngOnInit() {
    this.service.getTeams().subscribe(res => this.teamList = res);
    this.selectedTeam = {id:'-1', name:'choose team', manager1:null,manager2:null,captain:null }
  }


  public async getSquad(){
    this.service.getTeamSquad(this.selectedTeam.id).subscribe(res => this.squad = res);
    console.log(this.squad);
  }

  setTeam(team: Team){
    this.selectedTeam = team;
    this.getSquad();
  }
}
