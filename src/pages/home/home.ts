import { ModalController } from 'ionic-angular'
import { BauCard } from 'baudelaplace-bridge'
import { CardsService } from '../../providers/cards-service'
import { LoginPage } from '../login/login'
import { Component, OnInit } from '@angular/core'
import { NavController, IonicPage } from 'ionic-angular'
import { AuthService } from '../../providers/auth-service'
import { CreateCardModal } from '../create-card-modal/create-card-modal'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  public username = ''
  /**
   * Shared with all instances of BauCard component
   */
  public cards: BauCard[] = []

  constructor(
    private nav: NavController,
    private auth: AuthService,
    private cardsServ: CardsService,
    private modalCtrl: ModalController
  ) {
    let info = this.auth.getUserInfo()
    this.username = info.username
  }

  public ngOnInit() {
    this.cardsServ.getCards().then(cards => {
      this.cards = cards
    }).catch(error => {
      console.log(error)
    })
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot(LoginPage)
    })
  }

  public onCardDeleted(card: BauCard): void {
    this.cards = this.cards.filter(elem => elem !== card)
  }

  public openAddCardModal() {
    let modal = this.modalCtrl.create(CreateCardModal)
    modal.onDidDismiss(card => {
      if (card) {
        this.cards.push(card)
      }
    })
    modal.present()
  }
}
