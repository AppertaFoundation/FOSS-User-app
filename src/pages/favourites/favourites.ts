import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClinicalDetailPage } from '../clinical-detail/clinical-detail';
import { ClinItem } from '../../models/models';
import { FavouriteServiceProvider } from '../../providers/favourite-service/favourite-service';

/**
 * Generated class for the FavouritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'favourites'
})
@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {
  private favouritesList:Array<ClinItem> =[];//list of objects
  empty:boolean = true;


  constructor(public navCtrl: NavController, public navParams: NavParams, private favServ: FavouriteServiceProvider) {
    this.checkFavourites();
  }

  ionViewWillEnter() {
    this.favServ.getSpecialty();
    this.checkFavourites();
  }

  checkFavourites(){
    this.favServ.getData()
    .then(
      data =>{
        if(data && data.length >0){
          this.empty = false;
          this.favouritesList = data;
          console.log("Some favourites");
        }
        else {this.favouritesList =[]}
      }
    )

    console.log("check:",this.favouritesList);
    
  }

  showDetail(info:any) {
    console.log('item ', info);
    this.navCtrl.push(ClinicalDetailPage, { info: info, auth:true });
  }

}
