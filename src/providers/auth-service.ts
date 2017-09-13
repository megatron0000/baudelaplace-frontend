import { hasOwnProperty } from 'tslint/lib/utils'
import { AuthError } from 'baudelaplace-bridge/build/auth-error'
import { User } from 'baudelaplace-bridge/build/user'
import { Observer } from 'rxjs/Rx'
import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'


@Injectable()
export class AuthService {
    private http: Http
    private currentUser: User

    constructor(http: Http) {
        this.http = http
        this.currentUser = {
            username: 'Placeholder-username',
            admin: false
        }
    }

    public login(credentials: { username: string; password: string }): Observable<User> {
        if (credentials.username === null || credentials.password === null) {
            return Observable.throw('Por favor, insira suas credenciais.')
        }
        return Observable.create((observer: Observer<User>) => {
            this.http.post('/users/login', {
                username: credentials.username,
                password: credentials.password
            }).subscribe(
                response => {
                    let responseJson = <User | AuthError>(response.json())

                    // If login was an error
                    if ((responseJson as AuthError).name) {
                        observer.error(responseJson)
                        observer.complete()
                        return
                    }
                    // If login was a success
                    this.currentUser = responseJson as User
                    observer.next(this.currentUser)
                    observer.complete()

                }, error => {
                    observer.error(error)
                    observer.complete()
                })
        })

    }

    public register(credentials: RegisterCredentials): Observable<User> {
        if (credentials.username === null || credentials.password === null) {
            return Observable.throw('Por favor, insira suas credenciais.')
        }
        // At this point store the credentials to your backend!
        return Observable.create((observer: Observer<User>) => {
            this.http.post('/users/register', {
                username: credentials.username,
                password: credentials.password
            }).subscribe(response => {
                let responseJson = response.json() as (User | AuthError)
                if ((responseJson as AuthError).name) {
                    observer.error(responseJson)
                    observer.complete()
                    return
                }
                this.currentUser = responseJson as User
                observer.next(this.currentUser)
                observer.complete()
            }, error => {
                observer.error(error)
                observer.complete()
            })
        })

    }

    public getUserInfo(): User {
        return this.currentUser
    }

    public logout() {
        return Observable.create(observer => {
            this.currentUser = null
            observer.next(true)
            observer.complete()
        })
    }
}
