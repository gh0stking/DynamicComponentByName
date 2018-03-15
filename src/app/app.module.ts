import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ComponentFactoryDirective } from '../directives/m-component-factory.directive';
import { MyComponent1 } from '../components/m-component1';
import { MyComponent2 } from '../components/m-component2';

const MY_COMPONENTS = [
  MyComponent1,
  MyComponent2,
];

@NgModule({
  declarations: [
    AppComponent,
    ComponentFactoryDirective,
    ...MY_COMPONENTS,
  ],
  entryComponents: [
    ...MY_COMPONENTS,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
