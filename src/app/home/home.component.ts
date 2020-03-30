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

  constructor() {
    this.carousalData.push({
      isVideo: true,
      source: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/e481beb9627f70c3a57589ae05165ed6_screen.mp4?ts=1584858457',
      poster: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/e481beb9627f70c3a57589ae05165ed6_screen.jpg?ts=1584858457',
      type: 'video/mp4'
    });
    this.carousalData.push({
      isVideo: false,
      source: '../../assets/em11.jpg'
    });
    this.carousalData.push({
      isVideo: false,
      source: '../../assets/ehiring.jpg'
    });
    this.carousalData.push({
      isVideo: false,
      source: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/26363223d4dc8f5ce673428802ea988a_screen.jpg?ts=1583388529'
    });
    this.carousalData.push({
      isVideo: false,
      source: '../../assets/md10.jpg'
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

  ngOnInit() {
  }
}
