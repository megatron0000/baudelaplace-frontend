import { Input, Component } from '@angular/core';

@Component({
    selector: 'bau-tag',
    templateUrl: 'bau-tag.html'
})
export class BauTag {

    @Input() text: string

    constructor() { }

}
