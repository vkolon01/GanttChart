import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GrantTableComponent} from './grant-table/grant-table.component';

const routes: Routes = [
  {path: '', component: GrantTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
