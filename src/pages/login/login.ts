import { DefaultAlertService } from './../../providers/default-alert-service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthError, GeneralError, RegisterCredentials } from 'baudelaplace-bridge'
import { HomePage } from '../home/home'
import { RegisterPage } from '../register/register'
import { Component } from '@angular/core'
import { NavController, LoadingController, Loading } from 'ionic-angular'
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
    private alertSrv: DefaultAlertService,
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
        this.loading.dismiss()
        this.alertSrv.showError('Acesso negado.')
      }
    },
      error => {
        // Either a GeneralError (untranslated) or AuthError (already translated)
        /**
         * @TODO Translate GeneralError  messages in backend
         */
        if ((error as GeneralError).status) {
          console.log(error)
          this.loading.dismiss()
          this.alertSrv.showError()
          return
        }
        this.loading.dismiss()
        this.alertSrv.showError((error as AuthError).message)
      })
      this.registerCredentials.patchValue({ password: '' })
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor, espere...',
      dismissOnPageChange: true
    })
    this.loading.present()
  }

}
