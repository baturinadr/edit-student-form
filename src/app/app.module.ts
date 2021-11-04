import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// Components
import {AppComponent} from './app.component';
import {AchievementComponent} from './components/achievement/achievement.component';


@NgModule({
  declarations: [
    AppComponent,
    AchievementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
