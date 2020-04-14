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
  public searchRepo : Repository;
  public username : string;
  public name : string;
  public searchRepos : Repository [] = []
  public data :any 
  public repoName : string
  usersapiUrl = "https://api.github.com/search/users?q=";
  apiUrl = "https://api.github.com/search/repositories?q=";


  constructor(private http : HttpClient) {
    this.user = new User (new Date(),'','', 0, 0,0,0,'','')
    this.searchRepo = new Repository('','')
   }


   getUsername (username : string ) {
     console.log ("service is ready")
     this.username = username;
   }


   getProfileInfo () {
    interface userResponse {
    date : Date,
    login: string,
    bio: string,
    followers: number,
    following: number,
    public_repos: number,
    projects: number,
    avatar_url : string,
    html_url :string, 
  }
    let promise = new Promise((resolve, reject) => {
    this.http
      .get <userResponse>(`https://api.github.com/users/${this.username}?access_token=`+environment.apiKey)
      .toPromise()
      .then(response => {
          this.user.date = response.date;
          this.user.login= response.login;
          this.user.bio = response.bio;
          this.user.followers = response.followers;
          this.user.following = response.following;
          this.user.public_repos= response.public_repos;
          this.user.projects = response.projects;
          this.user.avatar_url = response.avatar_url;
          this.user.html_url = response.html_url
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
          this.user.html_url = "Unavailable";
          reject(error);
        });
  });
  return promise;
   }


   getrepoName(repoName:string){
    this.repoName = repoName
   }


   githubRepo(){
    interface repoResponse {
      name: string,
      description: string,
    }
    this.searchRepos.length = 0;
    let promise = new Promise((resolve,reject)=>{
      let repoRequesturl = this.apiUrl + this.repoName
      this.http.get<repoResponse>(repoRequesturl).toPromise().then(response=>{
        console.log(response)
       for(let i = 0; i<20;i++){
        this.searchRepo = new Repository(response[i].name, response[i].description)
        this.searchRepos.push(this.searchRepo)
       }

          resolve();
        },

        error => {
          this.searchRepo.name= "Unavailable";
          this.searchRepo.description = "Unavailable";
          reject(error)
        });
  });
  return promise;
   }
     


}

  