export class User {
    
constructor(
public date: Date,
 public login: string,
 public bio: string,
 public followers: number,
 public following: number,
 public public_repos: number,
 public projects: number,
 public avatar_url : string,
 public html_url :string

){}

}


export class repoUser {
constructor (
    public login : string,
    public avatar_url : string,
    public html_url: string
)
{}}