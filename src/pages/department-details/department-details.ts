import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

/**
 * Generated class for the DepartmentDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-department-details',
  templateUrl: 'department-details.html',
})
export class DepartmentDetailsPage {
  detailObject: Array<any>;
  pageTitle: String;
  index: Number;
  confirm: Boolean;
  isImage: Boolean;
  search: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private fbServ:FirebaseProvider) {
    let allDetails = this.navParams.get('info');
    if (allDetails.data) {
      this.detailObject = allDetails.data;
    }
    else {
      this.detailObject = allDetails;
    }
    this.pageTitle = this.navParams.get('info');
    this.index = this.navParams.get('index');
    this.search = this.navParams.get('search');
    this.fbServ.manageDetail("department", this.detailObject);
  }

  ionViewDidEnter() {
    this.isImage = false;
  }

}
