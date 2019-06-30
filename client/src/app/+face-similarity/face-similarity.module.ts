import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';

import { FaceSimilarityRoutingModule } from './face-similarity-routing.module';
import { FaceSimilarityComponent } from './face-similarity.component';

@NgModule({
  declarations: [
    FaceSimilarityComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FaceSimilarityRoutingModule
  ]
})
export class FaceSimilarityModule { }
