import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GithubClone';
  public greeting = "hi"
  searchUser(greeting){
    console.log(greeting)
  }
}
