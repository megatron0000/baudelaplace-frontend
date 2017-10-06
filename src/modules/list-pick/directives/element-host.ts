import { ViewContainerRef, Directive } from '@angular/core'

@Directive({
    selector: '[element-host]'
})
export class ElementHostDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
