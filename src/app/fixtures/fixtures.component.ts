import { Fixture } from './../models/fixture';
import { TeamService } from 'src/app/services/team.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {
  fixtures: Fixture[];

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.teamService.getFixtures()
      .then(response => this.fixtures = response);
  }

}
