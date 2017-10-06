import { EnvVariable } from './../../variables/env-var/env-var.interface'
import { EnvVariable as EnvVariableToken } from './../../variables/env-var/env-var.token'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { RegisterCredentials, AuthError, GeneralError } from 'baudelaplace-bridge'
import { Component, Inject } from '@angular/core'
import { NavController, AlertController } from 'ionic-angular'
import { AuthService } from '../../providers/auth-service'
import { InAppBrowser } from '@ionic-native/in-app-browser'

@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {
    createSuccess = false
    registerCredentials: FormGroup
    recaptchaKey: string

    constructor(
        private nav: NavController,
        private auth: AuthService,
        private alertCtrl: AlertController,
        private formBuilder: FormBuilder,
        @Inject(EnvVariableToken) private envVars: EnvVariable,
        private appBrowser: InAppBrowser
    ) {
        this.registerCredentials = this.formBuilder.group({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        })
        this.recaptchaKey = this.envVars.recaptchaKey
    }

    ngOnInit() {
        if (this.envVars.platform === 'mobile') {
            this.alertCtrl.create({
                title: 'Criação de conta não permitida em apps',
                subTitle: 'Você pode acessar a versão web da página para criar sua conta. Registre-se lá e faça login aqui',
                buttons: [{
                    text: 'Ir ao site',
                    handler: () => {
                        this.appBrowser.create(this.envVars.apiEndpoint + '/conta')
                    }
                }]
            }).present()
        }
    }

    public register(recaptchaResponse: string) {
        console.log(this.registerCredentials.value)
        this.auth.register({
            ...this.registerCredentials.value,
            recaptchaResponse
        } as RegisterCredentials).subscribe(user => {
            if (user) {
                this.createSuccess = true
                this.showPopup('Sucesso', 'Conta criada.')
            } else {
                this.showPopup('Erro', 'Problema na criação da conta')
            }
        }, error => {
            // error is either GeneralError or AuthError
            /**
             * @TODO Translate GeneralError messages in backend
             */
            if ((error as GeneralError).status) {
                console.log(error)
                this.showPopup('Erro', 'Falha na comunicação com o servidor')
                return
            }
            this.showPopup('Erro', (error as AuthError).message)
        })
        this.registerCredentials.patchValue({ password: '' })
    }

    showPopup(title, text) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: [{
                text: 'OK',
                handler: data => {
                    if (this.createSuccess) {
                        this.nav.popToRoot()
                    }
                }
            }]
        })
        alert.present()
    }
}
