import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaceSimilarityComponent } from './face-similarity.component';

const routes: Routes = [
  {
    path: '', component: FaceSimilarityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaceSimilarityRoutingModule { }
