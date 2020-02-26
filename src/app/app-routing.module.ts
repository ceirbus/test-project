import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TextContentComponent } from './examples/text-content/text-content.component';
import { PictureContentComponent } from './examples/picture-content/picture-content.component';
import { HorizontalContentComponent } from './examples/horizontal-content/horizontal-content.component';
import { VerticalContentComponent } from './examples/vertical-content/vertical-content.component';

const routes: Routes = [
  { path: '', redirectTo: 'picture-content', pathMatch: 'full' },
  { path: 'text-content', component: TextContentComponent },
  { path: 'picture-content', component: PictureContentComponent },
  { path: 'horizontal-content', component: HorizontalContentComponent },
  { path: 'vertical-content', component: VerticalContentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
