import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthError, GeneralError, RegisterCredentials } from 'baudelaplace-bridge'
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
  registerCredentials: FormGroup

  constructor(
    private nav: NavController,
    private auth: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder
  ) {
    this.registerCredentials = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  public createAccount() {
    this.nav.push(RegisterPage)
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials.value as RegisterCredentials).subscribe(user => {
      if (user) {
        this.nav.setRoot(HomePage)
      } else {
        this.showError('Acesso negado.')
      }
    },
      error => {
        // Either a GeneralError (untranslated) or AuthError (already translated)
        /**
         * @TODO Translate GeneralError  messages in backend
         */
        if ((error as GeneralError).status) {
          console.log(error)
          this.showError('Falha na comunicação com o servidor')
          return
        }
        this.showError((error as AuthError).message)
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
    alert.present()
  }
}
