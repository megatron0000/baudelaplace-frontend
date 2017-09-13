import { Component } from '@angular/core'
import { NavController, AlertController} from 'ionic-angular'
import { AuthService } from '../../providers/auth-service'

@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {
    createSuccess = false
    registerCredentials: RegisterCredentials = { username: '', password: '' }

    constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) { }

    public register() {
        this.auth.register(this.registerCredentials).subscribe(user => {
            if (user) {
                this.createSuccess = true
                this.showPopup("Sucesso", "Conta criada.")
            } else {
                this.showPopup("Erro", "Problema na criação da conta")
            }
        },
            error => {
                this.showPopup("Erro", error['message'] || 'Falha na comunicação com o servidor')
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