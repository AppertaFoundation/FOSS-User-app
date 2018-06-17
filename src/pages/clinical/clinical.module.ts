import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClinicalPage } from './clinical';

@NgModule({
  declarations: [
    ClinicalPage,
  ],
  imports: [
    IonicPageModule.forChild(ClinicalPage),
  ],
})
export class ClinicalPageModule {}
