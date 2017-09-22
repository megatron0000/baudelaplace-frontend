import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { RegisterCredentials, AuthError, GeneralError } from 'baudelaplace-bridge'
import { Component } from '@angular/core'
import { NavController, AlertController } from 'ionic-angular'
import { AuthService } from '../../providers/auth-service'

@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {
    createSuccess = false
    registerCredentials: FormGroup

    constructor(
        private nav: NavController,
        private auth: AuthService,
        private alertCtrl: AlertController,
        private formBuilder: FormBuilder
    ) {
        this.registerCredentials = this.formBuilder.group({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        })
    }

    public register() {
        this.auth.register(this.registerCredentials.value as RegisterCredentials).subscribe(user => {
            if (user) {
                this.createSuccess = true
                this.showPopup('Sucesso', 'Conta criada.')
            } else {
                this.showPopup('Erro', 'Problema na criação da conta')
            }
        },
            error => {
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
    }

    showPopup(title, text) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: [
                {
                    text: 'OK',
                    handler: data => {
                        if (this.createSuccess) {
                            this.nav.popToRoot()
                        }
                    }
                }
            ]
        })
        alert.present()
    }
}
