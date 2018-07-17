import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NpvCalculatorComponent } from 'src/app/npv-calculator/npv-calculator.component';

const routes: Routes = [
  { path: '', redirectTo: '/npvCalculator', pathMatch: 'full' },
  {
    path: 'npvCalculator',
    component: NpvCalculatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
