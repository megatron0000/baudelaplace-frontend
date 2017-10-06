import { EnvVarFactory } from './../variables/env-var/env-var-factory'
import { EnvVariable } from './../variables/env-var/env-var.token'
import { DefaultAlertService } from './../providers/default-alert-service'
import { StyleService } from '../providers/style-service'
import { CardsService } from './../providers/cards-service'
import { BauTagComponent } from './../components/bau-tag/bau-tag'
import { BauCardComponent } from './../components/bau-card/bau-card'
import { ApiXHRBackend } from '../providers/api-xhr-backend'
import { HttpModule, XHRBackend } from '@angular/http'
import { HomePage } from '../pages/home/home'
import { RegisterPage } from '../pages/register/register'
import { LoginPage } from '../pages/login/login'
import { AuthService } from '../providers/auth-service'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule, ErrorHandler } from '@angular/core'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular'
import { MyApp } from './app.component'
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic'
import { ItemDetailsPage } from '../pages/item-details/item-details'
import { ListPage } from '../pages/list/list'
import { CreateCardModal } from '../pages/create-card-modal/create-card-modal'
import { CreateTagPopover } from '../pages/create-tag-popover/create-tag-popover'
import { RecaptchaModule, RecaptchaLoaderService } from 'ng2-recaptcha'
import { ListPickModule } from '../modules/list-pick/list-pick.module'
import { UtilsModule } from '../modules/utils'
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { PtRecaptchaFactory } from '../providers/pt-recaptcha-factory'

@NgModule({
    declarations: [
        MyApp,
        HelloIonicPage,
        ItemDetailsPage,
        ListPage,
        LoginPage,
        RegisterPage,
        HomePage,
        BauCardComponent,
        BauTagComponent,
        CreateCardModal,
        CreateTagPopover
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        BrowserModule,
        HttpModule,
        RecaptchaModule.forRoot(),
        ListPickModule,
        UtilsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HelloIonicPage,
        ItemDetailsPage,
        ListPage,
        LoginPage,
        RegisterPage,
        HomePage,
        CreateCardModal,
        BauTagComponent,
        CreateTagPopover
    ],
    providers: [
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        { provide: XHRBackend, useClass: ApiXHRBackend },
        { provide: RecaptchaLoaderService, useFactory: PtRecaptchaFactory },
        { provide: EnvVariable, useFactory: EnvVarFactory },
        AuthService,
        CardsService,
        StyleService,
        DefaultAlertService,
        InAppBrowser
    ]
})
export class AppModule { }
