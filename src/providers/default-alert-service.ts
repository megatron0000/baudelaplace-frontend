import { AlertController } from 'ionic-angular'
import { Injectable } from '@angular/core'
@Injectable()
export class DefaultAlertService {
    constructor(private _alertCtrl: AlertController) { }

    /**
     * Defaults to presenting a 'Erro desconhecido' message
     *
     * @memberof DefaultAlertService
     */
    public showError()
    /**
     * Logs `obj` to the console and presents its message (if not present, defaults to 'Erro desconhecido')
     *
     * @param {Error} obj
     * @memberof DefaultAlertService
     */
    public showError(obj: Error)
    /**
     * Presents the error message
     *
     * @param {string} text
     * @memberof DefaultAlertService
     */
    public showError(text: string)
    public showError(error?: string | Error) {
        let message = typeof error === 'string'
            ? error
            : error.message || 'Erro desconhecido'

        this._alertCtrl.create({
            title: 'Falha',
            subTitle: message,
            buttons: ['OK']
        }).present()
    }
}
