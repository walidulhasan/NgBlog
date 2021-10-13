import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadComponent } from './head/head.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { CustomstyleDirective } from '../customstyle.directive';
import { ColorgreenDirective } from './head/colorgreen.directive';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    HeadComponent,
    SidebarComponent,
    FooterComponent,
    ColorgreenDirective
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule
  ],
  exports:[
    HeadComponent,
    SidebarComponent,
    FooterComponent,
  ]
})
export class LayoutModule { }
