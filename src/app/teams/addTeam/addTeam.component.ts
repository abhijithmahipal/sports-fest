import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Team } from '../../models/team';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-addteam',
  templateUrl: './addTeam.component.html',
  styleUrls: ['./addTeam.component.css']
})
export class AddTeamComponent implements OnInit {
  teamData: Team;
  constructor(private service: TeamService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    this.teamData = new Team();
    this.teamData.name = null;
    this.teamData.captain = null;
    this.teamData.manager1 = null;
    this.teamData.manager2 = null;
  }

  addTeam() {
    this.service.addTeam(this.teamData);
    this.resetForm();
    this.toastr.success('Submitted successfully', 'Team Registration');
  }
}
