import { Component, OnInit } from "@angular/core";
import axios from "axios";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  cities = [
    { name: "santiago", temperature: "", image: "../../assets/santiago.jpg" },
    {
      name: "buenos aires",
      temperature: "",
      image: "../../assets/buenos_aires.jpg"
    },
    { name: "lima", temperature: "", image: "../../assets/lima.jpg" },
    { name: "sao paulo", temperature: "", image: "../../assets/sao_pablo.jpg" }
  ];

  constructor() {}

  ngOnInit() {
    // Group
    // "http://api.openweathermap.org/data/2.5/group?id=3936456,3448439,3435910,3871336&units=metric&appid=b67fa5a827a488bdc84e7e36d78d2009"
    // Solo
    // "http://api.openweathermap.org/data/2.5/weather?q=Lima&units=metric&appid=b67fa5a827a488bdc84e7e36d78d2009"
    // Using a group call with city ID to just use call it once
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/group?id=3936456,3448439,3435910,3871336&units=metric&appid=b67fa5a827a488bdc84e7e36d78d2009"
      )
      .then(response => {
        // handle success
        this.fillCitiesData(response.data);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  fillCitiesData(responseDataArray) {
    this.cities.forEach(cityInfo => {
      responseDataArray.list.forEach(responseData => {
        if (cityInfo.name === responseData.name.toLowerCase()) {
          // Removed the after comma digits with bitwise or 0
          console.log(responseData.main.temp);
          responseData.main.temp = responseData.main.temp | 0;
          cityInfo.temperature = responseData.main.temp;
        }
      });
    });
  }
}
