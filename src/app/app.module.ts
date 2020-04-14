import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { GithubService }  from './github.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { DatePipe } from './date.pipe';
import { GithubDirective } from './github.directive';


import {RoutingModule} from '../app/routing/routing.module';



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DatePipe,
    GithubDirective,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RoutingModule,
    
  ],
  providers: [GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
