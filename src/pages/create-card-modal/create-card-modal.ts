import { AlertController } from 'ionic-angular'
import { BauCard, GeneralError } from 'baudelaplace-bridge'
import { CardsService } from '../../providers/cards-service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ViewController } from 'ionic-angular'
import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
    selector: 'page-create-card-modal',
    templateUrl: './create-card-modal.html'
})
export class CreateCardModal implements OnInit {

    public cardContent: FormGroup

    constructor(
        private viewCtrl: ViewController,
        private formBuilder: FormBuilder,
        private cardServ: CardsService,
        private alertCtrl: AlertController
    ) { }

    public close(): void {
        this.viewCtrl.dismiss()
    }

    public ngOnInit(): void {
        this.cardContent = this.formBuilder.group({
            question: new FormControl('', [Validators.required, Validators.pattern('^\\s*[^\\s]+.*$')]),
            answer: new FormControl('', [Validators.required, Validators.pattern('^\\s*[^\\s]+.*$')])
        })
    }

    public sendForm() {
        this.cardContent.valid
            ? this.cardServ.createCard(this.cardContent.value as BauCard)
                .then(cardDocument => {
                    /**
                     * Important to use cardDocument returned by server
                     * instead of local version, since local one has no
                     * _id field, which is necessary should the user
                     * want to delete the card
                     */
                    this.viewCtrl.dismiss(cardDocument)
                })
                .catch(error => {
                    console.log(error)
                    this.showError((error as GeneralError).message)
                })
            : this.showError('Os campos "pergunta" e "resposta" não podem estar em branco')
    }

    public showError(text: string) {
        this.alertCtrl.create({
            title: 'Falha',
            subTitle: text,
            buttons: ['OK']
        }).present()
    }


}
