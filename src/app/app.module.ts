import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { HomeComponent } from './teams/home';
import { AddTeamComponent } from './teams/addTeam/addTeam.component';
import { TeamListComponent } from './teams/teamList/teamList.component';
import { TeamService } from './services/team.service';
import { AddPlayerComponent } from './teams/add-player/add-player.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTeamComponent,
    TeamListComponent,
    HomeComponent,
    AddPlayerComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [TeamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
