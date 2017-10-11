import { Injectable } from '@angular/core'

@Injectable()
export class StyleService {
    private readonly _colors = {
        oldYellow: '#cfb53b',
        visibleLight: '#F0E0E0'
    }

    constructor() { }

    get color() {
        return this._colors
    }
}
