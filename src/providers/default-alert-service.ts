import { AlertController } from 'ionic-angular'
import { Injectable } from '@angular/core'
@Injectable()
export class DefaultAlertService {
    constructor(private _alertCtrl: AlertController) { }

    /**
     * @param text If not present, defaults to `'Erro desconhecido'`
     */
    public showError(text: string = 'Erro desconhecido') {
        this._alertCtrl.create({
            title: 'Falha',
            subTitle: text,
            buttons: ['OK']
        }).present()
    }
}
