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
profile : User
repo: Repository
repos : Repository[]
searchRepo : Repository
searchRepos : Repository []
public username: string;


  constructor( private http: HttpClient, private githubService: GithubService, private userProfileService : UserProfileService) { 
    this.userProfileService.userProfile()
    this.profile = this.userProfileService.profile
    this.userProfileService.userRepo()
    this.repos = this.userProfileService.repos
    this.githubService.githubRepo()
    this.repos = this.githubService.searchRepos

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
