import { Component } from '@angular/core';
import { NavController, NavParams,IonicPage   } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ClinItem } from '../../models/models'
import { FavouriteServiceProvider } from '../../providers/favourite-service/favourite-service';

@IonicPage({
  name:'ClinicalDetailPage'
})
@Component({
  selector: 'page-clinical-detail',
  templateUrl: 'clinical-detail.html'
})
export class ClinicalDetailPage {
  detailObject: any;
  auth:Boolean
  isFav:boolean;
  favList:Array<ClinItem>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fbServ: FirebaseProvider, private favServ: FavouriteServiceProvider
  ) {
    // this.detailObject = this.navParams.get('info');
  }

  ionViewWillLoad(){
    this.detailObject = this.navParams.get('info');
    console.log ("Data content for page ",this.detailObject);
    let truth = this.detailObject.symptoms;
    console.log("Truth", truth);
    this.auth = true;

    this.fbServ.manageDetail("clinical", this.detailObject);

    this.favList = this.favServ.getFavList();
    console.log("checking Favourites in ClinDet:", this.favList);
    console.log("Index is:",this.favList.indexOf(this.detailObject));
    if(this.favList.indexOf(this.detailObject) > -1){
      this.isFav = true;
    }


    // ************
    this.favList.forEach(fav=>{
      if(fav.title == this.detailObject.title){
        this.isFav = true;
      }
    })
// *****************

    // console.log("DetailsObject:", this.detailObject);
    // console.log("Fav Status:", this.isFav);
  }

  isPresent(type:string){
    let present;
    if(!this.detailObject){
      return true;
    }
    else{
      if(type == "admit"){
        present = !(typeof this.detailObject[type] == "undefined" || this.detailObject[type] == "blank");
      }else{
        present= !(typeof this.detailObject[type] == "undefined" || this.detailObject[type] == " ");
      }
     return present;
    }
  }

  makeFav(item:ClinItem){
    // console.log("makeFav:",item);
    this.favServ.addFavourite(item);
    this.isFav = true;
  }
  unFav(item:ClinItem){
    // console.log("unfav fn");
    this.favServ.removeFavourite(item);
    // console.log("have removed fav");
    this.isFav = false;
    this.navCtrl.pop();
  }
}
