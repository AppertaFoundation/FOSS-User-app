import { Injectable } from '@angular/core';
import { ClinItem } from '../../models/models';
import { FirebaseProvider } from '../firebase/firebase';
import { Storage } from '@ionic/storage';
/*
  Generated class for the FavouriteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class FavouriteServiceProvider {

  favouriteList:Array<ClinItem> =[];
  hospDB:any;
  store:string;

  constructor(private fbServ: FirebaseProvider, private storage:Storage) {
    this.makeStore();
    
  }

  removeFavourite(item:ClinItem):boolean{
    let index = this.favouriteList.indexOf(item);
    if(index >-1){
      this.favouriteList.splice(index, 1);
      // console.log("removed",item);
      return true;
    }
    else{
      console.log("Failed to remove");
      return false;
    }
  }

  getFavList():Array<ClinItem>{//list of objects
    // console.log("In favServ getting list:",this.favouriteList);
    return this.favouriteList;
  }

  makeStore(){
    this.hospDB  = this.fbServ.getDBDetails();
    this.store = this.hospDB.hospital + this.hospDB.specialty+"Fav";
    this.storage.get(this.store)
    .then(savedData=>{
      if(Array.isArray(savedData) && savedData.length >0){
        //there is data
        this.favouriteList = savedData;
      }
      else{
        this.storage.set(this.store,[]);
      }
    })
  }

  getData(){
    this.storage.get(this.store)
    .then(data=>{
      this.favouriteList = data;
      return data
      //null if no data      
    })
  }

  save(){
    this.storage.set(this.store, this.favouriteList);
    console.log ("FavouriteList is now:",this.favouriteList);
  }

  addFavourite(item:ClinItem){//pushing a full object
    console.log("adding favourite", item);
    if(this.favouriteList.indexOf(item) == -1)
      {
      this.favouriteList.push(item);
    this.save();
    }
  }

  

}
