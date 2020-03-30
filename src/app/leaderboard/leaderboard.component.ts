import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
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

  constructor(private teamService: TeamService, private spinner: NgxSpinnerService) {        
  }

  ngOnInit() {   
    this.spinner.show();
    this.teamService.getTeamStandings().snapshotChanges()
      .pipe(map(changes => 
        changes.map(c => {return c.payload.doc.data()}))
        ).subscribe(standings => { 
          this.standings = standings;
          for(let i = 0; i < this.standings.length; i++) {
            for (let j = i + 1; j < this.standings.length; j++) {
              if(this.standings[i].Pts < this.standings[j].Pts) {
                let temp = this.standings[i];
                this.standings[i] = this.standings[j];
                this.standings[j] = temp;
              }
              else if (this.standings[i].Pts === this.standings[j].Pts) {
                if(this.standings[i].GD < this.standings[j].GD) {
                  let temp = this.standings[i];
                  this.standings[i] = this.standings[j];
                  this.standings[j] = temp;
                }
              }
            
            }
          }
          
          this.spinner.hide();
        });      

    
  }

  getImageUrl(name) {
    return "../assets/profilePics/" + name + ".jpg";
  }

}
