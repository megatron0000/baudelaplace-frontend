import { EnvVariable } from './../variables/env-var/env-var.interface'
import { EnvVariable as EnvVariableToken } from './../variables/env-var/env-var.token'
import { Injectable, Inject } from '@angular/core'
import { Request, XHRBackend, XHRConnection, BrowserXhr, ResponseOptions, XSRFStrategy } from '@angular/http'

@Injectable()
export class ApiXHRBackend extends XHRBackend {

    constructor(
        arg0: BrowserXhr,
        arg1: ResponseOptions,
        arg2: XSRFStrategy,
        @Inject(EnvVariableToken) private env: EnvVariable
    ) {
        super(arg0, arg1, arg2)
    }

    createConnection(request: Request): XHRConnection {
        if (request.url.startsWith('/')) {
            request.url = this.env.apiEndpoint + request.url     // prefix base url
        }
        return super.createConnection(request)
    }
}
