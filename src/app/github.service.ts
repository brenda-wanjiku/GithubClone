import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { User } from './user'
import { Repository } from './repository'
import { repoUser } from './user'

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  public user: repoUser;
  public users: repoUser[] = [];
  public searchRepo : Repository;
  public username : string;
  public searchRepos : Repository [] = []
  public data :any 
  public repoName : string
  usersapiUrl = "https://api.github.com/search/users?q=";
  apiUrl = "https://api.github.com/search/repositories?q=";


  constructor(private http : HttpClient) {
    this.user = new repoUser ('','','')
    this.searchRepo = new Repository('','')

   }


   getUsername (username : string ) {
     console.log ("service is ready")
     this.username = username;
   }


   getProfileInfo () {
    this.users.length = 0;
    let promise = new Promise((resolve, reject) => {
    this.http
      .get(`https://api.github.com/search/users?q=${this.username}`)
      .toPromise()
      .then(response => {
        this.data = response
        console.log(this.data.items)
        for(let i = 0; i<20;i++){
          console.log(this.user.login)
          this.user.login = this.data.items[i].login;
          this.user.avatar_url = this.data.items[i].avatar_url;
          this.user.html_url = this.data.items[i].html_url;

          this.users.push(new repoUser(this.user.login,this.user.avatar_url,this.user.html_url))
        }
        console.log(this.data)
          resolve()
        },
        error => {
          this.user.login= "Unavailable";
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
    this.searchRepos.length = 0;
    let promise = new Promise((resolve,reject)=>{
      let repoRequesturl = this.apiUrl + this.repoName
      console.log(repoRequesturl)
      this.http.get(repoRequesturl).toPromise().then(response=>{
        this.data = response
        console.log(response)
       for(let i = 0; i<20;i++){
        this.searchRepo = new Repository(this.data.items[i].name, this.data.items[i].description)
        this.searchRepos.push(this.searchRepo)
       }
       console.log(this.searchRepos)

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

  