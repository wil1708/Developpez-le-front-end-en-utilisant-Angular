import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryComponent } from './pages/country/country.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '404', // wildcard
    component: NotFoundComponent,
  },
  {
    path: 'country/:country', component: CountryComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
