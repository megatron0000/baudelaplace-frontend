import { AuthError, User, RegisterCredentials, GeneralError, ServerDownError } from 'baudelaplace-bridge'
import { Observer } from 'rxjs/Rx'
import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'


/**
 * @TODO No need to wrap observables in Angular http calls. I can use `toPromise()` everywhere
 *
 * @export
 * @class AuthService
 */
@Injectable()
export class AuthService {
    private currentUser: User

    constructor(private http: Http) {
        this.currentUser = {
            _id: null,
            admin: false,
            username: 'ERR_NOUSER'
        }

        this.fetchUser().catch(e => console.log(e))
    }

    /**
     * Receives a User from the server or the empty object (representing no active session).
     * In receiving "{}" , this method returns it
     *
     * @private
     * @returns {(Promise<User|null>)} User if there was an active session on the server. `null` otherwise
     * @memberof AuthService
     */
    private fetchUser(): Promise<User | {}> {
        return new Observable((observer: Observer<User | {}>) => {
            this.http.get('/users/fetch', { withCredentials: true })    // Returns {} if no user has session
                .subscribe(response => {
                    let responseJson = response.json() as User | GeneralError

                    if ((responseJson as GeneralError).name) {
                        console.log('Received error as success. Must be corrected on backend')
                        observer.error(responseJson)
                        observer.complete()
                        return
                    }

                    if ((<User>responseJson).username) {
                        this.currentUser = responseJson as User
                    }

                    observer.next(responseJson)
                    observer.complete()
                }, error => {
                    if (error.status === 0) {
                        observer.error(ServerDownError)
                    } else {
                        observer.error(error.json())
                    }
                    observer.complete()
                })
        }).toPromise()
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
            this.http.post('/users/register', credentials, { withCredentials: true }).subscribe(response => {
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

    public logout() {
        return this.http.get('/users/logout', { withCredentials: true }).toPromise()
            .then(() => this.currentUser = null)
    }

    public sessionExistsQ(): Promise<boolean> {
        return this.fetchUser().then(user => {
            if ((user as User).username) {
                return true
            }
            return false
        })
    }
}
