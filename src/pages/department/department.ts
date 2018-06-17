import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


/**
 * Generated class for the DepartmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'department'
})
@Component({
  selector: 'page-department',
  templateUrl: 'department.html',
})
export class DepartmentPage {

  public departmentListData;
  public fullDepartmentListData;
  private searchValue:string;
  private searchControl: FormControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fbServ:FirebaseProvider) {
      this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad departmentPage');
    this.fbServ.getList("department")
      .then((data) => {
        console.log("Got data", data);
        this.departmentListData = data;
        if(!data){
          this.fbServ.getWebListData('department')
          .subscribe(
            data=>{
              console.log("Got data", data);
              this.departmentListData = data;
  
            }
          )
        }
      });
    this.searchControl.valueChanges.debounceTime(1000).distinctUntilChanged().subscribe(search =>{
      if(search == ""){
        this.departmentListData = this.fullDepartmentListData
      }
      else{
        this.filterItems(search);
      }

    })
  }

  filterItems(searchItem){
    searchItem = searchItem.toLowerCase();
    // console.log("Filtering...", searchItem);
    this.departmentListData =this.departmentListData.filter(item=>{
      let tempGroup = item.group.toLowerCase();
      if( tempGroup.indexOf(searchItem)> -1){
        return true
      }
      let newArray =item.data.filter(info =>{
        // console.log("info item is:", info);
        if (!info.detail){
          console.log("No detail");
          return false
        }

        if(Array.isArray(info.detail)){
          let tempArray = info.detail.filter(item =>{
            return  (item.indexOf(searchItem) != -1)
          })
          if(tempArray.length >0){
            return true
          }
          else{return false}
        }
        else{
          let lookedFor = info.detail.toLowerCase();
          // console.log("lookedFor:", lookedFor);
          return (lookedFor.indexOf(searchItem) != -1)
        }
      })
      if(newArray.length >0){
        return true
      }
    })
  }

showDetail(info) {
  // console.log('item ', info);
  let index = this.departmentListData.indexOf(info);
  // console.log("index is ", index);
  this.navCtrl.push('DepartmentDetailsPage', { info: info, index: index, search:this.searchValue });
}

}
