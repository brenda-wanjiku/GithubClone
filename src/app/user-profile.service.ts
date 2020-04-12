import { Injectable } from '@angular/core';
import { User } from './user'
import { Repository } from './repository'
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
public profile : User
public repository: Repository
public data: any

  constructor(private http: HttpClient) {
    this.profile = new User ('','', 0, 0,0,0,'','')
    this.repository = new Repository('','')
   }

   userProfile(){
      interface profileResponse {
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
        .get <profileResponse> (`https://api.github.com/users/brenda-wanjiku?access_token=`+environment.apiKey)
        .toPromise()
        .then(response => {
            this.profile.login= response.login;
            this.profile.bio = response.bio;
            this.profile.followers = response.followers;
            this.profile.following = response.following;
            this.profile.public_repos= response.public_repos;
            this.profile.projects = response.projects;
            this.profile.avatar_url = response.avatar_url;
            this.profile.repos_url = response.repos_url
            console.log(`https://api.github.com/users/brenda-wanjiku?access_token=`+environment.apiKey);
            console.log(this.profile);
  
            resolve();
          },
          error => {
            this.profile.login= "Unavailable";
            this.profile.bio = "Unavailable";
            this.profile.followers = 0;
            this.profile.following = 0;
            this.profile.public_repos= 0 ;
            this.profile.projects = 0;
            this.profile.avatar_url = "Unavailable";
            this.profile.repos_url = "Unavailable";
            reject(error);
          });
    });
    return promise;
     }
  

     userRepo(){
      interface repoResponse {
        name: string,
        description: string,
     
    }
  
     const promise = new Promise((resolve, reject) => {
      this.http
        .get <repoResponse> (`https://api.github.com/users/brenda-wanjiku/repos?access_token=`+environment.apiKey)
        .toPromise()
        .then(response => {
            this.repository= new Repository(response.name,response.description) 
            console.log(response[0].name)

            resolve();
          },
          error => {
            this.repository.name= "Unavailable";
            this.repository.description = "Unavailable";
          });
    });
    return promise;
     }
  

}
