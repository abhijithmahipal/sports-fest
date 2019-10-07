import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Player } from '../../models/player'
import { Team } from 'src/app/models/team';
import * as firebase from 'firebase';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  playerData: Player;
  teamList: Team[];
  selectedTeam: Team;
  constructor(private service: TeamService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.service.getTeams().subscribe(res=>this.teamList = res.map(item => {
      return {
        id: item.payload.doc.id,
        ...item.payload.doc.data()
      } as Team;
    }));  
  }
  
  setTeam(team: Team){
    this.selectedTeam = team;
    this.playerData.teamName = firebase.firestore().doc('teams/' + team.id)
  }

  resetForm(form?: NgForm) {
    this.playerData = new Player();
    this.playerData.fullName = null;
    this.playerData.shortName = null;
    this.playerData.assists = 0;
    this.playerData.goals = 0;
    this.playerData.yellowCards = 0;
    this.playerData.redCards = 0;
    this.playerData.matchesPlayer = 0;
    this.playerData.jerseyNumber = null;
    this.playerData.teamName = null;
    this.selectedTeam = {id:'-1',name:'Assign Team',manager1:null,manager2:null,captain:null};
  }

  addPlayer() {
    this.service.addPlayer(this.playerData);
    this.resetForm();
    this.toastr.success('Submitted successfully', 'Team Registration');
  }
}
