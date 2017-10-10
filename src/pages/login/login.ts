import { DefaultAlertService } from './../../providers/default-alert-service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { RegisterCredentials } from 'baudelaplace-bridge'
import { HomePage } from '../home/home'
import { RegisterPage } from '../register/register'
import { Component, OnInit } from '@angular/core'
import { NavController, LoadingController, Loading } from 'ionic-angular'
import { AuthService } from '../../providers/auth-service'

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
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

    async ngOnInit() {
        try {
            if (await this.auth.sessionExistsQ()) {
                this.nav.setRoot(HomePage)
            }
        } catch (e) { }
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
                this.loading.dismiss()
                this.alertSrv.showError(error)
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
