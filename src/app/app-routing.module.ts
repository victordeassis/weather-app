import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CityInfoComponent } from "./city-info/city-info.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "city-info", component: CityInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
