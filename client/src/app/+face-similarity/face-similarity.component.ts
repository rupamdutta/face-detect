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
    url1: '', desc1: null, url2: '', desc2: null
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
    await faceapi.nets.ssdMobilenetv1.loadFromUri(
      environment.baseHref + 'assets/models/ssd_mobilenetv1');
    await faceapi.nets.faceLandmark68Net.loadFromUri(
      environment.baseHref + 'assets/models/face_landmark_68');
    this.progress = false;
  }

  selectImage(filePicker) {
    filePicker.click();
  }

  async onImageSelect(e, id, filePicker, img) {
    this.progress = true;
    const files = e.target.files;
    if (FileReader && !!files && files.length) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.descriptors['url' + id] = fileReader.result;
        img.src = fileReader.result;
        this.setImageDescriptor(id, img);
        filePicker.value = '';
      };
      fileReader.readAsDataURL(files[0]);
    }
  }

  async setImageDescriptor(id, img) {
    this.descriptors['desc' + id] =
      await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
    this.progress = false;
  }

  async evaluateFaces() {
    this.progress = true;
    const
      euclideanDistance =
        faceapi.euclideanDistance(this.descriptors.desc1.descriptor, this.descriptors.desc2.descriptor),
      distance = faceapi.round(euclideanDistance);
    this.facesMatched = distance <= this.threshold;
    this.progress = false;
  }

  reset() {
    this.descriptors = {
      url1: '', desc1: null, url2: '', desc2: null
    };
    this.facesMatched = null;
  }

}
