import { Injectable } from '@angular/core';

// import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { JwtUtilsService } from 'app/security/jwt-utils.service';
import { UserService } from '../main/user.service';
import { User } from '../common.models';


@Injectable()
export class AuthenticationService {

  private readonly loginPath = 'http://localhost:8080/api/login'

  constructor(private http: HttpClient, private jwtUtilsService: JwtUtilsService, private userService:  UserService) { }

  login(username: string, password: string): Observable<boolean> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.loginPath, JSON.stringify({ username, password }), { headers })
      .map((res: any) => {
        let token = res && res['token'];
        if (token) {
          localStorage.setItem('currentUser', JSON.stringify({
                                    username: username,
                                    roles:this.jwtUtilsService.getRoles(token),
                                    token: token
                                  }));
          return true;
        }
        else {
          return false;
        }
      })
      .catch((error: any) => {
        if (error.status === 400) {
          return Observable.throw('Ilegal login');
        }
        else {
          return Observable.throw(error.json().error || 'Server error');
        }
      });
  }

  getToken(): String {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    return token ? token : "";
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean{
    if(this.getToken()!='') return true;
    else return false;
  }

  getCurrentUser(){
    if(localStorage.currentUser){
      return JSON.parse(localStorage.currentUser);
    }
    else{
      return undefined;
    }
  }

  isTeacher() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser.roles[0] === "ROLE_TEACHER" || currentUser.roles[0] === "ROLE_ADMIN") {
      return true;
    }
  }

  isStudent() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser.roles[0] === "ROLE_STUDENT" || currentUser.roles[0] === "ROLE_ADMIN") {
      return true;
    }
  }

  isAdmin() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser.roles[0] === "ROLE_ADMIN") {
      return true;
    }
  }
}
