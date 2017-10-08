import { DefaultAlertService } from './../../providers/default-alert-service'
import { CreateTagPopover } from '../create-tag-popover/create-tag-popover'
import { StyleService } from './../../providers/style-service'
import { PickableItem } from '../../modules/list-pick'
import { BauTagComponent } from './../../components/bau-tag/bau-tag'
import { BauCard, BauTag } from 'baudelaplace-bridge'
import { CardsService } from '../../providers/cards-service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ViewController, PopoverController, NavParams } from 'ionic-angular'
import { Component, OnInit } from '@angular/core'
import { EditModeData } from './edit-mode-data'

/**
 * This modal may be invoked alongside `data` (see Ionic docs).
 *
 * `data.mode === 'create' | undefined` will trigger card creation modal, whereas
 * `data.mode === 'edit'` will trigger card edit modal
 *
 * @export
 * @class CreateCardModal
 * @implements {OnInit}
 */
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
        private alertServ: DefaultAlertService,
        private navParams: NavParams
    ) { }

    /**
     * Must be called after `this._tagList` has been populated
     *
     * @private
     * @throws {Error} If called with modal in create mode instead of edit mode
     * @returns {PickableItem<BauTagComponent>[]} Tags the current card owns (same obj refs as to `this._tagList`)
     * @memberof CreateCardModal
     */
    private initializeEditModeTags(): PickableItem<BauTagComponent>[] {
        if (this.navParams.get('mode') !== 'edit') {
            throw new Error('Must be in edit mode')
        }

        let tagSelector = <EditModeData['tagSelector']>this.navParams.get('tagSelector') // See `EditModeData`
        return this._tagList.filter(
            (pickableTag) => tagSelector(<BauTag>pickableTag.retrieveData())
        )
    }

    public ngOnInit(): void {
        // Maybe user opened this modal for editing
        let initialContent = {
            question: '',
            answer: '',
            tags: []
        }

        // Check if modal was opened to create a card or to edit one.
        if (this.navParams.get('mode') === 'edit') { // edit, not create
            initialContent = {
                question: this.navParams.get('question') as string,
                answer: this.navParams.get('answer') as string,
                tags: []    // Empty at first, since tags were still not fetched from server
            }
        }

        /**
         * @TODO Correct Validator pattern. It currently does not allow newlines
         */
        this.cardContent = this.formBuilder.group({
            question: new FormControl(
                initialContent.question,
                [Validators.required, Validators.pattern('^\\s*[^\\s]+.*$')]
            ),
            answer: new FormControl(
                initialContent.answer,
                [Validators.required, Validators.pattern('^\\s*[^\\s]+.*$')]
            ),
            tags: new FormControl(initialContent.tags)    // Still empty (see above)
        })

        // Initialize internal tag list fetched from server
        this.cardServ.getTags().then(tags => {

            this._tagList = tags.map(tag => (<PickableItem<BauTagComponent>>{
                getComponent: () => BauTagComponent,
                injectData: self => {
                    self.tagContent = tag
                    self.hoverBackground = this.style.color.oldYellow
                },
                retrieveData: () => tag
            }))

            this.cardContent.patchValue({
                tags: this.navParams.get('mode') === 'edit' ? this.initializeEditModeTags() : []
            })

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
        if (!this.cardContent.valid) {
            this.alertServ.showError('Os campos "pergunta" e "resposta" não podem estar em branco')
            return
        }

        // Check if we are adding a new card or editing an existing one.
        // By default, not supplying `mode` triggers card addition
        if (!this.navParams.get('mode') || this.navParams.get('mode') === 'create') {
            this.cardServ.createCard(<BauCard>{
                question: this.cardContent.value.question,
                answer: this.cardContent.value.answer,
                tags: this.cardContent.value.tags.map(pickableTag => pickableTag.retrieveData())
            }).then(cardDocument => {
                /**
                 * Important to use cardDocument returned by server
                 * instead of local version, since local one has no
                 * _id field, which is necessary should the user
                 * want to delete the card
                 */
                this.viewCtrl.dismiss(cardDocument)
            }).catch(error => {
                this.alertServ.showError(error)
            })
        } else {// Else, we are editing a card.
            this.cardServ.editCard({
                _id: this.navParams.get('_id'),
                question: this.cardContent.value.question,
                answer: this.cardContent.value.answer,
                tags: this.cardContent.value.tags.map(pickableTag => pickableTag.retrieveData()),
                createdBy: undefined    // Is not used by server, so no need for it here
            }).then(response => {
                this.viewCtrl.dismiss(response as BauCard)
            }).catch(error => {
                this.alertServ.showError(error)
            })
        }


    }

    public get tagList() {
        return this._tagList
    }


}
