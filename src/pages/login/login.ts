import { HomePage } from '../home/home'
import { RegisterPage } from '../register/register'
import { Component } from '@angular/core'
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular'
import { AuthService } from '../../providers/auth-service'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading
  registerCredentials = { username: '', password: '' }

  constructor(
    private nav: NavController,
    private auth: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  public createAccount() {
    this.nav.push(RegisterPage)
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(user => {
      if (user) {
        this.nav.setRoot(HomePage)
      } else {
        this.showError('Acesso negado.')
      }
    },
      error => {
        this.showError(error['message'] || 'Falha de comunicação com o servidor')
      })
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor, espere...',
      dismissOnPageChange: true
    })
    this.loading.present()
  }

  showError(text) {
    this.loading.dismiss()

    let alert = this.alertCtrl.create({
      title: 'Falha',
      subTitle: text,
      buttons: ['OK']
    })
    alert.present(prompt)
  }
}
