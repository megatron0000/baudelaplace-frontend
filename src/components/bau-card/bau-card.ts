import { CardsService } from '../../providers/cards-service'
import { AlertController, ModalController } from 'ionic-angular'
import { BauCard, User, objIdQ } from 'baudelaplace-bridge'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { DefaultAlertService } from '../../providers/default-alert-service'
import { AuthService } from '../../providers/auth-service'
import { CreateCardModal } from '../../pages/create-card-modal/create-card-modal'
import { EditModeData } from '../../pages/create-card-modal/edit-mode-data'

@Component({
    selector: 'bau-card',
    templateUrl: 'bau-card.html'
})
export class BauCardComponent {

    @Input() cardContent: BauCard
    @Output() onDeleted = new EventEmitter<BauCard>()
    @Output() onModified = new EventEmitter<BauCard>()
    answerVisibleQ: boolean
    currentUser: User

    constructor(
        private alertCtrl: AlertController,
        private defaultAlert: DefaultAlertService,
        private cardsServ: CardsService,
        private authServ: AuthService,
        private modalCtrl: ModalController
    ) {
        this.answerVisibleQ = false
        this.currentUser = this.authServ.getUserInfo()
    }

    public switchAnswerVisibility(): void {
        this.answerVisibleQ = !this.answerVisibleQ
    }

    public delete(): void {
        this.alertCtrl.create({
            title: 'Confirmar remoção',
            message: 'Tem certeza que quer deletar esta carta ? (Ação não pode ser desfeita)',
            buttons: [{
                text: 'Não deletar',
                role: 'não deletar'
            }, {
                text: 'Deletar',
                role: 'deletar',
                handler: () => {
                    this.cardsServ.deleteCard(this.cardContent).then(successMessage => {
                        this.onDeleted.emit(this.cardContent)
                    }).catch(error => {
                        this.defaultAlert.showError(error)
                    })
                }
            }]
        }).present()
    }

    /**
     * @TODO Card does not need User handling at all.
     * It should just emit a 'modify' event and apply
     * it effectively if it is not canceled upstream
     *
     * @memberof BauCardComponent
     */
    public modify(): void {
        console.log('modificar')
        // Get Ids of all tags owned by current card. Note we "assert" the tag is a proper object, not just an ID
        let ownedTagIds = this.cardContent.tags.map(ownedTag => !objIdQ(ownedTag) && ownedTag._id)

        // Create the modal passing the `EditModeData` for its initialization
        let modal = this.modalCtrl.create(CreateCardModal, <EditModeData>{
            mode: 'edit',
            _id: this.cardContent._id,
            question: this.cardContent.question,
            answer: this.cardContent.answer,
            tagSelector: tag => {
                return ownedTagIds.indexOf(tag._id) !== -1
            }
        })
        modal.onDidDismiss((data?: BauCard) => {
            if (data) {
                this.cardContent = data
                this.onModified.emit(this.cardContent)
            }
        })
        modal.present()
    }

    get userAuthorId(): string {
        // We know an ID is a string (not an object) at client side
        return objIdQ(this.cardContent.createdBy) ? <any>this.cardContent.createdBy : this.cardContent.createdBy._id
    }

    get userOwnsQ(): boolean {
        return this.currentUser && this.currentUser._id === this.userAuthorId
    }

}
