import { CardsService } from '../../providers/cards-service'
import { AlertController } from 'ionic-angular'
import { BauCard, GeneralError } from 'baudelaplace-bridge'
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
    selector: 'bau-card',
    templateUrl: 'bau-card.html'
})
export class BauCardComponent {

    @Input() cardContent: BauCard
    @Output() onDeleted = new EventEmitter<BauCard>()
    answerVisibleQ: boolean
    answerButtonTexts: { visible: string; hidden: string }
    activeAnswerButtonText: string

    constructor(private alertCtrl: AlertController, private cardsServ: CardsService) {
        this.answerVisibleQ = false
        this.answerButtonTexts = {
            visible: 'Ocultar resposta',
            hidden: 'Mostrar resposta'
        }
        this.activeAnswerButtonText = this.answerButtonTexts.hidden
    }

    public switchAnswerVisibility(): void {
        this.answerVisibleQ = !this.answerVisibleQ
        this.activeAnswerButtonText = this.answerVisibleQ
            ? this.answerButtonTexts.visible
            : this.answerButtonTexts.hidden
    }

    public delete(): void {
        this.alertCtrl.create({
            title: 'Confirmar remoção',
            message: 'Tem certeza que quer deletar esta carta ? (Ação não pode ser desfeita)',
            buttons: [{
                text: 'Deletar',
                role: 'deletar',
                handler: () => {
                    this.cardsServ.deleteCard(this.cardContent).then(successMessage => {
                        this.onDeleted.emit(this.cardContent)
                    }).catch(error => {
                        /**
                         * @TODO Stop repeating showError method in lots of files.
                         * Instead, create a service for errors
                         */
                        this.showError((error as GeneralError).message)
                        console.log(error)
                    })
                }
            }, {
                text: 'Não deletar',
                role: 'não deletar'
            }]
        }).present()
    }

    public showError(text: string) {
        this.alertCtrl.create({
            title: 'Falha',
            subTitle: text,
            buttons: ['OK']
        }).present()
    }

}
