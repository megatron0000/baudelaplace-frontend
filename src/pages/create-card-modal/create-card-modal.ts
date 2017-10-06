import { DefaultAlertService } from './../../providers/default-alert-service'
import { CreateTagPopover } from '../create-tag-popover/create-tag-popover'
import { StyleService } from './../../providers/style-service'
import { PickableItem } from '../../modules/list-pick'
import { BauTagComponent } from './../../components/bau-tag/bau-tag'
import { BauCard, GeneralError } from 'baudelaplace-bridge'
import { CardsService } from '../../providers/cards-service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ViewController, PopoverController } from 'ionic-angular'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'page-create-card-modal',
    templateUrl: './create-card-modal.html'
})
export class CreateCardModal implements OnInit {

    private _tagList: PickableItem<BauTagComponent>[] = []

    public cardContent: FormGroup

    constructor(
        private viewCtrl: ViewController,
        private formBuilder: FormBuilder,
        private cardServ: CardsService,
        private style: StyleService,
        private popoverCtrl: PopoverController,
        private alertServ: DefaultAlertService
    ) { }

    public ngOnInit(): void {
        this.cardContent = this.formBuilder.group({
            question: new FormControl('', [Validators.required, Validators.pattern('^\\s*[^\\s]+.*$')]),
            answer: new FormControl('', [Validators.required, Validators.pattern('^\\s*[^\\s]+.*$')]),
            tags: new FormControl([])
        })
        this.cardServ.getTags().then(tags => {
            this._tagList = tags.map(tag => ({
                getComponent: () => BauTagComponent,
                injectData: self => {
                    self.tagContent = tag
                    self.hoverBackground = this.style.color.oldYellow
                },
                retrieveData: () => tag
            } as PickableItem<BauTagComponent>))
        }).catch(error => console.log(error))
    }

    public close(): void {
        this.viewCtrl.dismiss()
    }

    public openCreateTagPopover() {
        let popover = this.popoverCtrl.create(CreateTagPopover)
        popover.onDidDismiss(tag => {
            if (tag) {
                this._tagList.push({
                    getComponent: () => BauTagComponent,
                    injectData: self => {
                        self.tagContent = tag
                        self.hoverBackground = this.style.color.oldYellow
                    },
                    retrieveData: () => tag
                })
            }
        })
        popover.present()
    }

    public sendForm() {
        console.log(this.cardContent.value)
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
                    this.alertServ.showError((error as GeneralError).message)
                })
            : this.alertServ.showError('Os campos "pergunta" e "resposta" não podem estar em branco')
    }

    public get tagList() {
        return this._tagList
    }


}
