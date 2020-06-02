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

    // this.teamService.getMatchDay().subscribe((x) => {
    //   this.matchDay = 'Match Day '+ (x[0].P + 1);
    //   this.teamService.getFixtures()
    //     .then(x => {
    //       this.presentFixture = x.find(m => m.MatchDay === this.matchDay.toString());
    //       this.carousalData.push({
    //         carousalType: 'matchday',
    //         data: this.presentFixture
    //       });
    //     });
    // });

    this.teamService.getTopScorers().subscribe(x => {
      this.topScorers = x;

      this.carousalData.push({
        carousalType: 'topscorers',
        data: this.topScorers
      });
    });

    this.teamService.getBestDefences().subscribe(x => {
      this.topDefences = x;

      this.carousalData.push({
        carousalType: 'topdefences',
        data: this.topDefences
      });
    });

    this.spinner.hide();
  }


  initCarousalData() {
    this.carousalData.push({
      carousalType: 'image',
      source: '../../assets/s1result.jpg'
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

  getImageUrl(name) {
    return '../assets/profilePics/' + name + '.jpg';
  }
}
