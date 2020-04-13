import { Injectable } from '@angular/core';
import { User } from './user'
import { Repository } from './repository'
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { rejects } from 'assert';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
public profile : User
public repo : Repository
public repos : Repository [] = []

  constructor(private http: HttpClient) {
    this.profile = new User ('','', 0, 0,0,0,'','')
    this.repo = new Repository('','')
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
      html_url :string,
     
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
            this.profile.html_url = response.html_url
  
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
            this.profile.html_url = "Unavailable";
            reject(error);
          });
    });
    return promise;
     }
  

     userRepo(){
      interface repoResponse {
        names: string,
        description: string, 
        url: string 
      }
     const promise = new Promise((resolve, reject) => {
      this.http
        .get <repoResponse> (`https://api.github.com/users/brenda-wanjiku/repos?access_token=`+environment.apiKey)
        .toPromise()
        .then(response => {
          for (let i = 0; i < 23; i++){
            this.repo = new Repository (response[i].name, response[i].description)
            this.repos.push(this.repo)
           
            //repos.push(new Repository(this.repo.name, this.repo.description))
          }
             // console.log(repos)
        
            resolve();
          },
          error => {
            this.repo.name= "Unavailable";
            this.repo.description = "Unavailable";
            reject(error)
          });
    });
    return promise;
     }
  

}
