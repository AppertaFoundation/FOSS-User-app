import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepartmentPage } from './department';

@NgModule({
  declarations: [
    DepartmentPage,
  ],
  imports: [
    IonicPageModule.forChild(DepartmentPage),
  ],
})
export class DepartmentPageModule {}
