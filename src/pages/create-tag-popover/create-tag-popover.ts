import { CardsService } from './../../providers/cards-service'
import { DefaultAlertService } from './../../providers/default-alert-service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ViewController } from 'ionic-angular'
import { Component } from '@angular/core'

@Component({
    selector: 'page-create-tag-popover',
    templateUrl: 'create-tag-popover.html'
})
export class CreateTagPopover {
    public tagContent: FormGroup

    constructor(
        private _viewCtrl: ViewController,
        private _formBuilder: FormBuilder,
        private _alertServ: DefaultAlertService,
        private _cardsServ: CardsService
    ) { }

    ngOnInit(): void {
        this.tagContent = this._formBuilder.group({
            text: new FormControl('', Validators.required)
        })
    }

    public sendForm() {
        console.log(this.tagContent.value)
        if (this.tagContent.valid) {
            this._cardsServ.createTag(this.tagContent.value)
            .then(tag => this._viewCtrl.dismiss(tag))
            .catch(error => this._alertServ.showError(error.message))
        }
    }

    public close() {
        this._viewCtrl.dismiss()
    }
}
