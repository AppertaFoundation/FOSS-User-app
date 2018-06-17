import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  {
  public specialtyList: string;

  constructor(public navCtrl: NavController, public firebaseProvider:FirebaseProvider) {
  }

  ionViewDidLoad() {
    console.log("Loaded Home");
    this.firebaseProvider.getSpecialties()
    .then(speclistData=>{
      if (speclistData){
        this.specialtyList = speclistData;
        console.log(this.specialtyList);
      }
      else{
      this.firebaseProvider.getWebSpecData()
      .subscribe((data)=>{
        
        this.specialtyList=data})

      }
    })
  }

  chooseSpecialty(specialty){
    console.log(specialty);
    this.firebaseProvider.setNewSpecialty(specialty);
    this.navCtrl.setRoot('tabs');
  }

}
