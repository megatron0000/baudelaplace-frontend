import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from 'ionic-angular'
import { SearchPipe } from './pipes/search-pipe'

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    declarations: [
        SearchPipe
    ],
    exports: [
        SearchPipe
    ]
})
export class UtilsModule { }
