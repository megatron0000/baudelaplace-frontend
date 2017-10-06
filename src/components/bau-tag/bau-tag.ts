import { BauTag } from 'baudelaplace-bridge'
import { Component, HostListener, Input, OnInit } from '@angular/core'

@Component({
    selector: 'bau-tag',
    templateUrl: 'bau-tag.html'
})
export class BauTagComponent implements OnInit {

    @Input() tagContent: BauTag
    @Input() hoverBackground: string
    private defaultBackground: 'white'
    public currentBackground: string

    constructor() { }

    public ngOnInit() {
        this.currentBackground = this.defaultBackground
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.currentBackground = this.hoverBackground || this.defaultBackground
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.currentBackground = this.defaultBackground
    }

}
