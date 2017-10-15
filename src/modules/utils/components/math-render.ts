import { Component, Input, OnChanges, SimpleChanges, SecurityContext } from '@angular/core'
import { MathRenderService } from '../providers/math-render-service'
import { SafeHtml, DomSanitizer } from '@angular/platform-browser'

@Component({
    selector: 'math-render',
    templateUrl: 'math-render.html'
})
export class MathRenderComponent implements OnChanges {

    @Input() content: string
    contentFormatted: SafeHtml = ''

    constructor(private _mathServ: MathRenderService, private _sanit: DomSanitizer) { }


    /**
     * Sanitizes `this.content`, parses its math and declares the result as safe html
     *
     * @param {SimpleChanges} changes
     * @memberof MathRenderComponent
     */
    ngOnChanges(changes: SimpleChanges) {
        if (changes.content) {
            let aux = this._sanit
                .sanitize(SecurityContext.HTML, changes.content.currentValue)
                .replace(/&#10;/g, '<br>') // Newlines
            this.contentFormatted = this._sanit.bypassSecurityTrustHtml(this._mathServ.render(aux))
        }
    }

}
