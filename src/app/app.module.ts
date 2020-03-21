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
<<<<<<< HEAD
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
=======
import { AboutusComponent } from './aboutus/aboutus.component';
>>>>>>> af6635f2b6f5d4f35e2645c3be5f5b2b236a0ff0

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      HomeComponent,
      LeaderboardComponent,
      AboutusComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule,
      FormsModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot()
   ],
   providers: [
      TeamService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
