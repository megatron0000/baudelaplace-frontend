import { ListPickComponent } from './components/list-pick/list-pick'
import { ItemPickComponent } from './components/item-pick/item-pick'
import { ElementHostDirective } from './directives/element-host'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonicModule } from 'ionic-angular'
import { UtilsModule } from '../utils'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UtilsModule
  ],
  declarations: [
    ElementHostDirective,
    ItemPickComponent,
    ListPickComponent
  ],
  exports: [
    ElementHostDirective,
    ItemPickComponent,
    ListPickComponent
  ]
})
export class ListPickModule { }
