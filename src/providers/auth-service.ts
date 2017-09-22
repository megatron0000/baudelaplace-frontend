import { AuthError, User, RegisterCredentials, GeneralError, ServerDownError } from 'baudelaplace-bridge'
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
            admin: false,
            _id: null
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
            }, { withCredentials: true }).subscribe(
                response => {
                    let responseJson = response.json() as User | AuthError | GeneralError

                    // If login was an error
                    if ((responseJson as AuthError | GeneralError).name) {
                        console.log('Received error as success. Must be corrected on backend')
                        observer.error(responseJson)
                        observer.complete()
                        return
                    }
                    // If login was a success
                    this.currentUser = responseJson as User
                    observer.next(this.currentUser)
                    observer.complete()

                }, error => {
                    if (error.status === 0) {
                        observer.error(ServerDownError)
                    } else {
                        observer.error(error.json())
                    }
                    observer.complete()
                })
        })

    }

    public register(credentials: RegisterCredentials): Observable<User> {
        if (!credentials.username || !credentials.password) {
            return Observable.throw('Por favor, insira suas credenciais.')
        }
        // At this point store the credentials to your backend!
        return Observable.create((observer: Observer<User>) => {
            this.http.post('/users/register', {
                username: credentials.username,
                password: credentials.password
                /**
                 * withCredentials to send cookies along (needed for session)
                 */
            }, { withCredentials: true }).subscribe(response => {
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
                if (error.status === 0) {
                    observer.error(ServerDownError)
                } else {
                    observer.error(error.json())
                }
                observer.complete()
            })
        })

    }

    public getUserInfo(): User {
        return this.currentUser
    }

    /**
     * @TODO Actually do the logout on backend
     */
    public logout() {
        return Observable.create(observer => {
            this.currentUser = null
            observer.next(true)
            observer.complete()
        })
    }
}
