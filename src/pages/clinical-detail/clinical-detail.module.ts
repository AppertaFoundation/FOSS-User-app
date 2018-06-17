import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClinicalDetailPage } from '../clinical-detail/clinical-detail';

@NgModule({
  declarations: [
    ClinicalDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ClinicalDetailPage),
  ],
})
export class ClinicalDetailPageModule {}
