import { Component, forwardRef, Input } from '@angular/core'
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms'

import { PickableItem } from './pickable-item'

@Component({
    selector: 'list-pick',
    templateUrl: 'list-pick.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ListPickComponent),
        multi: true
    }]
})
export class ListPickComponent implements ControlValueAccessor {
    private _selectionText: string = 'Selection'
    private _availableText: string = 'Available'
    private _searchPlaceholder: string = 'Filter items'
    private _propagateChange: Function = (_: any) => { }
    @Input() hoverBackground: string
    @Input() sourceList: PickableItem<any>[] = []
    public selectedList: PickableItem<any>[] = []

    /**
     * Used to capture ionic-searchbar output, which was dominating
     * over the actual output of this component, and to employ
     * such output as a filter for the displayed tags
     */
    public filterText
    @Input() filterKeys: string[] | string

    preTransform = (val: PickableItem<any>) => val.retrieveData()

    constructor() { }

    writeValue(value: any): void {
        console.log('writeValue', value)
        if (value !== undefined) {
            this.selectedList = value
        }
    }

    registerOnChange(fn: any): void {
        this._propagateChange = fn
    }

    registerOnTouched(fn: any): void { }


    public sourceClick(item: PickableItem<any>) {
        this.selectedList.push(item)
        this._propagateChange(this.selectedList)
    }

    public selectedClick(item: PickableItem<any>) {
        this.selectedList = this.selectedList.filter(elem => elem !== item)
        this._propagateChange(this.selectedList)
    }

    @Input() set selectionText(value: string) {
        this._selectionText = value || this._selectionText
    }

    get selectionText() {
        return this._selectionText
    }

    @Input() set availableText(value: string) {
        this._availableText = value || this._availableText
    }

    get availableText() {
        return this._availableText
    }

    @Input() set searchPlaceholder(value: string) {
        this._searchPlaceholder = value || this._searchPlaceholder
    }

    get searchPlaceholder() {
        return this._searchPlaceholder
    }

}
