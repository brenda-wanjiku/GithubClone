import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { User } from './user'
import { Repository } from './repository'

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  public user: User;
  public repository : Repository
  public username : string;
  public repoName : string
  public name : string
  public data: any


  constructor(private http : HttpClient) {
    this.user = new User ('','', 0, 0,0,0,'','')
    this.repository = new Repository('','')
   }

   getUsername (username : string ) {
     console.log ("service is ready")
     this.username = username;
   }

   getProfileInfo () {
    interface userResponse {
    login: string,
    bio: string,
    followers: number,
    following: number,
    public_repos: number,
    projects: number,
    avatar_url : string,
    repos_url :string,
   
  }

   const promise = new Promise((resolve, reject) => {
    this.http
      .get <userResponse> (
        `https://api.github.com/users/${this.username}?access_token=`+environment.apiKey)
      .toPromise()
      .then(response => {
          this.user.login= response.login;
          this.user.bio = response.bio;
          this.user.followers = response.followers;
          this.user.following = response.following;
          this.user.public_repos= response.public_repos;
          this.user.projects = response.projects;
          this.user.avatar_url = response.avatar_url;
          this.user.repos_url = response.repos_url
          console.log(`https://api.github.com/users/brenda-wanjiku?access_token=`+environment.apiKey);
          console.log(this.user);

          resolve();
        },
        error => {
          this.user.login= "Unavailable";
          this.user.bio = "Unavailable";
          this.user.followers = 0;
          this.user.following = 0;
          this.user.public_repos= 0 ;
          this.user.projects = 0;
          this.user.avatar_url = "Unavailable";
          this.user.repos_url = "Unavailable";
          reject(error);
        });
  });
  return promise;
   }


}

  