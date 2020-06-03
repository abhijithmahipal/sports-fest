import { Fixture } from "./../models/fixture";
import { TeamService } from "src/app/services/team.service";
import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "fixtures",
  templateUrl: "./fixtures.component.html",
  styleUrls: ["./fixtures.component.css"],
})
export class FixturesComponent implements OnInit {
  fixtures: Fixture[];
  datewiseFixture: any[];

  constructor(
    private teamService: TeamService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.teamService.getFixtures().subscribe((x) => {
      this.fixtures = x;
      this.fixtures = _.sortBy(
        this.fixtures,
        (a) => a.date && a.date.substring(4)
      );
      this.datewiseFixture = _.chain(this.fixtures)
        .groupBy('date')
        .toArray()
        .value();
        this.spinner.hide();
    });
  }

  //   for (let index = 0; index < this.fixtures.length; index++) {
  //     this.teamService.addFixture(this.fixtures[index]);
  //   }
}
