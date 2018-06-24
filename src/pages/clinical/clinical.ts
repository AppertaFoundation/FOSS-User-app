import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from  '../../providers/firebase/firebase';
import {FormControl} from '@angular/forms';
import { ClinItem } from '../../models/models';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { FavouriteServiceProvider } from '../../providers/favourite-service/favourite-service';


/**
 * Generated class for the ClinicalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'clinical'
})
@Component({
  selector: 'page-clinical',
  templateUrl: 'clinical.html',
})
export class ClinicalPage {
  public clinicalListData:object[];
  public FullClinicalListData:object[];
  private ClinSearchControl: FormControl;
  private ClinSearchValue: string;


  constructor(public navCtrl: NavController, public navParams: NavParams,public fbServ: FirebaseProvider, private favServ:FavouriteServiceProvider) {
    this.ClinSearchControl = new FormControl();
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad ClinicalPage');
    this.fbServ.getList("clinical")
      .then((data) => {
        console.log("Date returned as:", data);
        this.clinicalListData = data;
        if(!data){
          this.fbServ.getWebListData('clinical')
          .subscribe(
            data=>{
              console.log("Got data in subscribe", data);
              this.clinicalListData = data;
  
            }
          )
        }
      });

      this.ClinSearchControl.valueChanges.debounceTime(1000).distinctUntilChanged().subscribe(search => {
        if (search == "") {
          this.clinicalListData = this.FullClinicalListData;
        }
        else {
          if(search)
          {this.filterItems(search);}
        }
      })
      
    }

  filterItems(searchItem) {
    searchItem = searchItem.toLowerCase();
    this.clinicalListData = this.clinicalListData.filter(item => {
      //info in clinical is an item in the Array
      //need to return true from this is searchItem is found in any of the valueChanges
      let lowerTitle = item["title"].toLowerCase();
      console.log(lowerTitle);
      if (lowerTitle.indexOf(searchItem) > -1){
        console.log ("Returning true");
        return true
      }
      let hasItem = false;
      for (let prop in item) {
        // console.log("Prop:", prop);
        if (!Array.isArray(item[prop]) || prop == 'image') {
          // console.log("Not this one:", prop);
        }
        else{
          // console.log(item[prop]);
          //have array of items which need to filterItems
          let tempArray = item[prop].filter(each =>{
            //go through each of the items
            // console.log("Each:",each)
            each = each ==""? "": each.toLowerCase();
            return (each.indexOf(searchItem) > -1)
          })
          if (tempArray.length >0){
            hasItem = true;
          }
        }
      }
      return hasItem
    })
  }

  showDetail(info: ClinItem) {
    // console.log('item ', info);
    this.navCtrl.push("ClinicalDetailPage", { info: info, search: this.ClinSearchValue });
  }


}
