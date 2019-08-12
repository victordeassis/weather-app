import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-city-info",
  templateUrl: "./city-info.component.html",
  styleUrls: ["./city-info.component.css"]
})
export class CityInfoComponent implements OnInit {
  city = JSON.parse(localStorage.getItem("city"));

  constructor() {}

  ngOnInit() {}
}
