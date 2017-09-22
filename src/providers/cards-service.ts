import { SuccessMessage, ServerDownError } from 'baudelaplace-bridge'
import { BauCard, ServerMessage } from 'baudelaplace-bridge'
import { Http } from '@angular/http'
import { Injectable } from '@angular/core'

/**
 * @TODO Create separate HttpService for normalized Promisification, error handling and
 * credential passing.
 *
 * All methods of this class return promises with contexts/errors normalized according to
 * baudelaplace-bridge
 */
@Injectable()
export class CardsService {
    private http: Http

    constructor(http: Http) {
        this.http = http
    }

    public getCards(): Promise<BauCard[]> {
        return this.http.get('/bau-anki/api/cards', { withCredentials: true }).toPromise().then(response => {
            return response.json() as BauCard[]
        }).catch(error => {
            if (error.status === 0) {
                return Promise.reject(ServerDownError)
            } else {
                return Promise.reject(error.json())
            }
        })
    }

    public createCard(card: BauCard): Promise<ServerMessage> {
        return this.http.post('/bau-anki/api/cards', card, { withCredentials: true })
            .toPromise().then(response => response.json() as typeof SuccessMessage)
            .catch(error => {
                if (error.status === 0) {
                    return Promise.reject(ServerDownError)
                } else {
                    return Promise.reject(error.json())
                }
            })
    }

    public deleteCard(card: BauCard): Promise<typeof SuccessMessage> {
        return this.http.delete('/bau-anki/api/cards/' + card._id, { withCredentials: true }).map(response => {
            console.log(response.status)
            return response
        })
            .toPromise().then(response => response.json() as typeof SuccessMessage)
            .catch(error => {
                if (error.status === 0) {
                    return Promise.reject(ServerDownError)
                } else {
                    return Promise.reject(error.json())
                }
            })
    }

}
