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
  specialty:string;

  constructor(private fbServ: FirebaseProvider, private storage:Storage) {
    this.makeStore();
    
  }

  removeFavourite(item:ClinItem):boolean{
    if(!this.favouriteList || this.favouriteList.length <1){return}
    for(let f=0; f<this.favouriteList.length; f++){
      if(item.title == this.favouriteList[f].title){
        console.log(item.title);
        this.favouriteList.splice(f, 1);

      }
    }
    this.save();
    console.log(this.favouriteList);
  }

  getSpecialty(){
    this.specialty = this.fbServ.getNewSpecialty();
    this.store = this.hospDB.hospital + this.specialty+"Fav";


  }

  getFavList():Array<ClinItem>{//list of objects
    // console.log("In favServ getting list:",this.favouriteList);
    return this.favouriteList;
  }

  makeStore(){
    this.hospDB  = this.fbServ.getDBDetails();
    this.specialty = this.fbServ.getNewSpecialty() || this.hospDB.specialty;
    this.store = this.hospDB.hospital + this.specialty+"Fav";
    this.storage.get(this.store)
    .then(savedData=>{
      if(Array.isArray(savedData) && savedData.length >0){
        //there is data
        console.log("makestore has data",this.store, this.favouriteList);
        this.favouriteList = savedData;
      }
      else{
        console.log("makestore has no data", this.favouriteList);
        this.storage.set(this.store,[]);
      }
    })
  }

  getData(){
    return this.storage.get(this.store)
    .then(data=>{
      console.log("Favlist is:",this.favouriteList);
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
    if(!this.favouriteList){
      this.getData();
      return
    }
    for(let f=0; f<this.favouriteList.length; f++){
      if(item.title == this.favouriteList[f].title){
        console.log(item.title);
        return;
      }
    }
    this.favouriteList.push(item);
    this.save();
    
  }

  

}
