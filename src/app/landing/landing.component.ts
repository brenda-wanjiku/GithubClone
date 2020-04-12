import { Component, OnInit, Input } from '@angular/core';
import { GithubService } from '../github.service'
import { User } from '../user';
import { Repository } from '../repository'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [GithubService]
})
export class LandingComponent implements OnInit {
@Input() 
user: User;
repository: Repository
public username: string;


  constructor(private githubService: GithubService, private http: HttpClient) { 
  }

  ngOnInit() {
  }

  getUser(){
    this.githubService.getUsername(this.username);
    this.githubService.getProfileInfo();
    this.user = this.githubService.user;
    console.log(this.user);
 
  }

  
}
