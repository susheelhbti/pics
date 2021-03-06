import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  logged: boolean = false;   // Logged state indicator
  user: any = null;
  @ViewChild('navbar', {static: false}) navbar: ElementRef;  // Navbar element
  @ViewChild("userMenu", {static: false}) userMenu: ElementRef;

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this._auth.userObserver.subscribe(user => {
      if(user){
        this.logged = true;
      } else {
        this.logged = false;
      }
      this.user = user;
    })
    this.user = this._auth.user;
    // this.getUserImage();
    this.logged = this._auth.isLogged;
  }

  /**
   * Show & hide navbar menu in small devices
   */
  toggleMenu(){
    let navbar = this.navbar.nativeElement;
    

    if(navbar.classList.contains("show")){
      navbar.classList.remove("show");
    } else {
      navbar.classList.add("show");
    }
  }

  /**
   * Display user menu
   */
  showMenu(){
    let userMenu = this.userMenu.nativeElement;
    if(userMenu.classList.contains("show-menu")){
      userMenu.classList.remove("show-menu");
    } else {
      userMenu.classList.add("show-menu");
    }
  }

  logout(){
    this._auth.logout();
  }

  getUserImage(){
    if(! this.user ) return;
    if(this.user.profile_pic && this.user.profile_pic != '/assets/images/user.png'){
      this.user.profile_pic = environment.url + '/' + this.user.profile_pic;
      this.user.profile_pic_small = environment.url + '/' + this.user.profile_pic_small;
    }
  }

}
