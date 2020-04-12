import { Component, OnInit, Input } from '@angular/core';
import { GithubService } from '../github.service'
import { User } from '../user';
import { Repository } from '../repository';
import { UserProfileService } from '../user-profile.service'
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
profile : User
public username: string;


  constructor(private githubService: GithubService, private http: HttpClient, private userProfileService : UserProfileService) { 
    this.userProfileService.userProfile()
    this.profile = this.userProfileService.profile
    this.userProfileService.userRepo()
    this.repository = this.userProfileService.repository
    
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
