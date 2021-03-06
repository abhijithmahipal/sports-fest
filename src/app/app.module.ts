import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { TeamService } from './services/team.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { CarouselModule } from 'primeng/carousel';
import { UpdatescoreComponent } from './updatescore/updatescore.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToggleDirective } from './toggle.directive';
import { SeasonOneArchiveComponent } from './season-one-archive/season-one-archive.component';
import { RulesComponent } from './rules/rules.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LeaderboardComponent,
    AboutusComponent,
    FixturesComponent,
    UpdatescoreComponent,
    ToggleDirective,
    SeasonOneArchiveComponent,
    RulesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CarouselModule,
    NgxSpinnerModule,
  ],
  providers: [TeamService],
  bootstrap: [AppComponent],
})
export class AppModule {}
