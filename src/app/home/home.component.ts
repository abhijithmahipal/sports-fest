import { Fixture } from './../models/fixture';
import { Team } from './../models/team';
import { map, subscribeOn } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { TeamService } from 'src/app/services/team.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  carousalData: any[] = new Array<any>();
  responsiveOptions: any;
  matchDay: string;
  topScorers: Team[];
  topDefences: Team[];
  presentFixture: Fixture;

  constructor(private teamService: TeamService, private spinner: NgxSpinnerService) {   
  }

  ngOnInit() {
    this.spinner.show();
    this.initCarousalData();

    this.teamService.getTopScorers().subscribe(x => { 
      this.topScorers = x;

      this.carousalData.push({
        carousalType: 'topscorers',
        data: this.topScorers
      });
    });    

    this.teamService.getBestDefences().subscribe(x => {this.topDefences = x; console.log(x);});  

    this.teamService.getMatchDay().subscribe((x) => {
      this.matchDay = 'Match Day '+ (x[0].P + 1);
      console.log(this.matchDay);
      
      this.teamService.getFixtures()
        .then(x => {
          this.presentFixture = x.find(m => m.MatchDay == this.matchDay.toString());
          console.log(this.presentFixture);
        });    
    });

    this.spinner.hide();         
  }


  initCarousalData() {
    this.carousalData.push({
      carousalType: "video",
      source: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/e481beb9627f70c3a57589ae05165ed6_screen.mp4?ts=1584858457',
      poster: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/e481beb9627f70c3a57589ae05165ed6_screen.jpg?ts=1584858457',
      type: 'video/mp4'
    });
    this.carousalData.push({
      carousalType: "image",
      source: '../../assets/ehiring.jpg'
    });
    this.carousalData.push({
      carousalType: "image",
      source: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/26363223d4dc8f5ce673428802ea988a_screen.jpg?ts=1583388529'
    });
    this.responsiveOptions = [
      {
        breakpoint: '12000',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
}
