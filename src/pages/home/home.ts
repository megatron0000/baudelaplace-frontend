import { LoginPage } from '../login/login'
import { Component } from '@angular/core'
import { NavController, IonicPage } from 'ionic-angular'
import { AuthService } from '../../providers/auth-service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = ''
  email = ''

  constructor(private nav: NavController, private auth: AuthService) {
    let info = this.auth.getUserInfo()
    console.log(info)
    this.username = info['username']
    this.email = info['email']
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot(LoginPage)
    })
  }
}
