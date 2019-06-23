import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaceSimilarityRoutingModule } from './face-similarity-routing.module';
import { FaceSimilarityComponent } from './face-similarity.component';

@NgModule({
  declarations: [
    FaceSimilarityComponent
  ],
  imports: [
    CommonModule,
    FaceSimilarityRoutingModule
  ]
})
export class FaceSimilarityModule { }
