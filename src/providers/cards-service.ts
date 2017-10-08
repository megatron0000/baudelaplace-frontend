import { SuccessMessage, ServerDownError, BauCard, BauTag } from 'baudelaplace-bridge'
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
        return this.http.get(
            '/bau-anki/api/cards?populateTags=true',
            { withCredentials: true }
        ).toPromise().then(response => {
            return response.json() as BauCard[]
        }).catch(error => {
            if (error.status === 0) {
                return Promise.reject(ServerDownError)
            } else {
                return Promise.reject(error.json())
            }
        })
    }

    public getTags(): Promise<BauTag[]> {
        return this.http.get('/bau-anki/api/tags', { withCredentials: true }).toPromise().then(response => {
            return response.json() as BauTag[]
        }).catch(error => {
            if (error.status === 0) {
                return Promise.reject(ServerDownError)
            } else {
                return Promise.reject(error.json())
            }
        })
    }

    public createCard(card: BauCard): Promise<BauCard> {
        return this.http.post('/bau-anki/api/cards?populateTags=true', card, { withCredentials: true })
            .toPromise().then(response => response.json() as BauCard)
            .catch(error => {
                if (error.status === 0) {
                    return Promise.reject(ServerDownError)
                } else {
                    return Promise.reject(error.json())
                }
            })
    }

    public editCard(card: BauCard): Promise<BauCard> {
        let id = card._id
        return this.http.post('/bau-anki/api/cards/' + id + '?populateTags=true', card, {withCredentials: true})
        .toPromise().then(response => response.json() as BauCard)
        .catch(error => {
            if (error.status === 0) {
                return Promise.reject(ServerDownError)
            } else {
                return Promise.reject(error.json())
            }
        })
    }

    /**
    public editCard(card: BauCard): Promise<BauCard> {
        return this.http.post()
    }
    */

    public createTag(tag: BauTag): Promise<BauTag> {
        return this.http.post('/bau-anki/api/tags', tag, { withCredentials: true })
            .toPromise().then(response => response.json() as BauTag)
            .catch(error => {
                return error.status === 0 ? Promise.reject(ServerDownError) : Promise.reject(error.json())
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
