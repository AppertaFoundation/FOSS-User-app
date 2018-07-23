import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';



/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  // specialtyList:any;
  // user:String;
  // auth:Boolean = true;
  specialty:string ="ENT";


constructor(public navCtrl: NavController, public navParams: NavParams
) {
  // this.user = "Browse as Guest";
  // this.auth = true;

}

}
