import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { PushNotifications } from '@capacitor/push-notifications';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone : false
})
export class HomePage {

  image: any;
  location: any;

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  // 📸 CAMERA
  async takePhoto() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl
    });
    this.image = photo.dataUrl;
  }

  // 📍 GPS
  async getLocation() {
  try {
    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 50000,   // ⬅️ increase timeout
      maximumAge: 0
    });

    this.location = `${position.coords.latitude}, ${position.coords.longitude}`;

  } catch (error) {
    console.log('❌ Location Error:', error);
    alert('Location not available');
  }
}

  // 📁 FILE SYSTEM
  async saveFile() {
    await Filesystem.writeFile({
      path: 'myfile.txt',
      data: 'Hello Ionic',
      directory: Directory.Documents
    });
    alert('File Saved!');
  }

  // 💾 LOCAL STORAGE
  async saveData() {
    localStorage.setItem('namelocal', 'Neha using local storage');
    await this.storage.set('nameionic' , 'Neha using ionic storage ')
  }

  // 💾 IONIC STORAGE
   async getData() {
    const nameIonic = await this.storage.get('nameionic');
    const nameLocal = localStorage.getItem('namelocal');
    alert(nameIonic + "    " + nameLocal);
  }

  // 🔔 PUSH NOTIFICATIONS
  async initPush() {
    await PushNotifications.requestPermissions();
    await PushNotifications.register();

    PushNotifications.addListener('registration', token => {
      console.log('Token:', token.value);
    });

    PushNotifications.addListener('pushNotificationReceived', notification => {
      alert('Notification: ' + notification.title);
    });
  }

 

}