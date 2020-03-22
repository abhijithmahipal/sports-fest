import { TeamService } from 'src/app/services/team.service';
import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team';

@Component({
  selector: 'leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
  providers: [TeamService]
})
export class LeaderboardComponent implements OnInit {

  standings: Team[];

  getImageUrl(name) {
    return "../assets/profilePics/" + name + ".jpg";
  }

  constructor(private teamService: TeamService) {
        
  }

  ngOnInit() {   
    this.teamService.getTeamStandings()
      .then(res => this.standings = res);   
  }

}
