import { ElementHostDirective } from '../../directives/element-host'
import { PickableItem } from './../list-pick/pickable-item'
import {
    AfterContentInit,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    EventEmitter,
    HostListener,
    Input,
    Output,
    ViewChild,
} from '@angular/core'

@Component({
    selector: 'item-pick',
    templateUrl: 'item-pick.html'
})
export class ItemPickComponent implements AfterContentInit {
    @ViewChild(ElementHostDirective) elHost: ElementHostDirective
    @Input() item: PickableItem<any>
    private _component: ComponentRef<any>
    @Output() onClick: EventEmitter<PickableItem<any>> = new EventEmitter()

    constructor(private _cfr: ComponentFactoryResolver) { }

    public ngAfterContentInit() {
        this._component = this.elHost.viewContainerRef.createComponent(this._cfr.resolveComponentFactory(this.item.getComponent()))
        this.item.injectData(this._component.instance)
    }

    @HostListener('click') public click() {
        console.log('clicked')
        this.onClick.emit(this.item)
    }

}
