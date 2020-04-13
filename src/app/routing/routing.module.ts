import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';

import { LandingComponent } from '../landing/landing.component'

const routes: Routes= [
  {path: "landing", component: LandingComponent},
  {path: "", redirectTo:"/land", pathMatch:"full"}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class RoutingModule { }
