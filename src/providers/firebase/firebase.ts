import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
// import { FavouriteServiceProvider } from '../favourite/favourite-service'


import { 
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from 'angularfire2/database';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { dbDetails } from '../../assets/dbdetails';


/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {
  private specialty: string = dbDetails.specialty;
  private hospital: string = dbDetails.hospital;
  private hospSpec: string;
  private hospSpecType:string;
  private dataType:string;
  private specialties:Observable<any>;
  private listObs:Observable<any>;
  private details:object;

  constructor(public afDatabase:AngularFireDatabase, public storage:Storage, private alertCtrl:AlertController, 
    // private favServ: FavouriteServiceProvider
  ) {
    this.hospSpec = this.hospital + "_Specialties";//eg James_Cook_Specialties
    this.specialties = this.afDatabase.list(`${this.hospital}/specialties`)
   .valueChanges();
  }

  getSpecialties():Promise<any>{
    this.hospSpec = this.hospital + "_Specialties";//eg James_Cook_Specialties
    return this.storage.get(this.hospSpec)
    .then(specs=>{
      if(specs) {
        console.log("Got stored data");
        return specs}
      else{
        console.log("No stored data");
        return null
      }
    })
 
  }

  refreshSpecs(){//use to get a new list of specialties from the server
    return this.getSpecialties();
  }

  getWebSpecData():Observable<any>{
    console.log("Getting web data");
   this.specialties = this.afDatabase.list(`${this.hospital}/specialties`)
   .valueChanges();
   this.specialties.subscribe(
     (data)=>{
      console.log("Got web data", data); 
      this.storage.set(this.hospSpec,data)});
   return this.specialties;
  }

  getNewSpecialty(): string {
    return this.specialty;
  }

  setNewSpecialty(newSpec: string) {
    this.specialty = newSpec;
    // console.log("Stored specialty", this.specialty);
  }

  getList(type:string){
    this.hospSpecType = this.hospital + this.specialty + type;
    this.dataType = this.specialty + type + "Data";//now including specialty in the dataType
    return this.storage.get(this.dataType+"Fetched")
    .then(data=>{
      if(data){
        this.storage.get(this.hospSpecType)
        .then(listData => {return listData})
      }
      else{
        return null;
      }
    })
  }

  getWebListData(type:string){
    this.listObs = this.afDatabase.list(`${this.hospital}/${this.specialty}/published/${type}`)
    .valueChanges();
    this.listObs.subscribe(
      data=>{
        this.storage.set(this.hospSpecType, this[this.dataType])
        .then(()=>this[this.dataType + "Fetched"] = true)
      }
    )
    return this.listObs;
  }

  getDBDetails() {
    this.details = {
      specialty: this.specialty,
      hospital: this.hospital,
    }
    return this.details;
  }

  manageDetail(type: string, detailObject: Object) {
    this[this.specialty + type + "DetailData"] = detailObject;
  }


  reloadData(type: string) {
    this[this.specialty + type + "DataFetched"] = false;
    this.getList(type);
  }


  getLocalFlag(type: string) {
    let savingType = this.specialty + type + "Data";
    return this.storage.get(savingType + "Local");
  }

  showAlert(title: string, message: any) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
