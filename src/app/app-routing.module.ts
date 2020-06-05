import { UpdatescoreComponent } from './updatescore/updatescore.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SeasonOneArchiveComponent } from './season-one-archive/season-one-archive.component';
import { RulesComponent } from './rules/rules.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'fixtures', component: FixturesComponent },
  { path: 'archive', component: SeasonOneArchiveComponent },
  { path: 'updatescore', component: UpdatescoreComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
