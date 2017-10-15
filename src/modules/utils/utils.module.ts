import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from 'ionic-angular'
import { SearchPipe } from './pipes/search-pipe'
import { MathRenderComponent } from './components/math-render'
import { MathRenderService } from './providers/math-render-service'

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    declarations: [
        SearchPipe,
        MathRenderComponent
    ],
    exports: [
        SearchPipe,
        MathRenderComponent
    ],
    providers: [
        MathRenderService
    ]
})
export class UtilsModule { }
