import { BauTag } from './../components/bau-tag/bau-tag'
import { BauCard } from './../components/bau-card/bau-card'
import { UserFactory } from '../providers/user-factory'
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

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    RegisterPage,
    HomePage,
    BauCard,
    BauTag
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    RegisterPage,
    HomePage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: XHRBackend, useClass: ApiXHRBackend },
    AuthService,
    UserFactory
  ]
})
export class AppModule { }
