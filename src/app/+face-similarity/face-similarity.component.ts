import { Component, OnInit } from '@angular/core';
import * as faceapi from 'face-api.js';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-face-similarity',
  templateUrl: './face-similarity.component.html',
  styleUrls: ['./face-similarity.component.scss']
})
export class FaceSimilarityComponent implements OnInit {

  threshold = 0.6;
  descriptors = {
    url1: '', desc1: null,
    url2: '', desc2: null,
  };
  progress = false;
  facesMatched = null;

  ngOnInit() {
    this.loadModels();
  }

  async loadModels() {
    this.progress = true;
    await faceapi.nets.faceRecognitionNet.loadFromUri(
      environment.baseHref + 'assets/models/face_recognition');
    this.progress = false;
  }

  selectImage(filePicker) {
    filePicker.click();
  }

  async onImageSelect(e, id, filePicker) {
    this.progress = true;
    const files = e.target.files;
    if (FileReader && !!files && files.length) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.setImageDescriptor(fileReader.result, id);
        filePicker.value = '';
      };
      fileReader.readAsDataURL(files[0]);
    }
  }

  async setImageDescriptor(result, id) {
    this.descriptors['url' + id] = result;
    this.descriptors['desc' + id] =
      await faceapi.computeFaceDescriptor(await faceapi.fetchImage(result));
    this.progress = false;
  }

  async evaluateFaces() {
    this.progress = true;
    const distance = faceapi.round(faceapi.euclideanDistance(this.descriptors.desc1, this.descriptors.desc2));
    this.facesMatched = distance <= this.threshold;
    this.progress = false;
  }

  reset() {
    this.descriptors = {
      url1: '', desc1: null,
      url2: '', desc2: null,
    };
    this.facesMatched = null;
  }

}
