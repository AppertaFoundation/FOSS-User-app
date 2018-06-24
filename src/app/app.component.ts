import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, private toastCtrl: ToastController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Clinical', component: 'tabs' },
      { title: 'Department', component: 'department' }

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      const isIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test(userAgent);
      }

      const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator['standalone']);

      if (isIos() && !isInStandaloneMode()) {
        let toast = this.toastCtrl.create({
          message: 'Install this webapp on your iPhone: Tap the share icon below and then select "Add to Home Screen"',
          position: 'bottom',
          duration: 10000,
          showCloseButton: true
        });
        toast.present();
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
