import { Injectable } from '@angular/core'

@Injectable()
export class StyleService {
    private readonly _colors = {
        oldYellow: '#cfb53b'
    }

    constructor() { }

    get color() {
        return this._colors
    }
}
