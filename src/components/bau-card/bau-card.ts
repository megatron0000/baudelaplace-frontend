import { Component, Input } from '@angular/core'

@Component({
    selector: 'bau-card',
    templateUrl: 'bau-card.html'
})
export class BauCard {

    @Input() question: string
    @Input() answer: string
    answerVisibleQ: boolean
    answerButtonTexts: { visible: string; hidden: string }
    activeAnswerButtonText: string

    constructor() {
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

}
