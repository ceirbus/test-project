import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentScrollComponent } from './components/content-scroll/content-scroll.component';
import { TextContentComponent } from './examples/text-content/text-content.component';
import { PictureContentComponent } from './examples/picture-content/picture-content.component';
import { HorizontalContentComponent } from './examples/horizontal-content/horizontal-content.component';
import { VerticalContentComponent } from './examples/vertical-content/vertical-content.component';
import { ContentScrollService } from './services/content-scroll.service';

@NgModule({
  declarations: [
    AppComponent,
    ContentScrollComponent,
    TextContentComponent,
    PictureContentComponent,
    HorizontalContentComponent,
    VerticalContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private contentScrollService: ContentScrollService) {}
}
