import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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

  constructor(private router: Router) {}

  ngOnInit() {
    // It will get the data when it starts the view.
    this.getDataFromApi();
    // Will trigger a setInterval that will check again if any temperature has changed in 3 min.
    setInterval(() => this.getDataFromApi(), 180 * 1000);
  }

  getDataFromApi(): any {
    // Group
    // "http://api.openweathermap.org/data/2.5/group?id=3936456,3448439,3435910,3871336&units=metric&appid=b67fa5a827a488bdc84e7e36d78d2009"
    // Solo
    // "http://api.openweathermap.org/data/2.5/weather?q=Lima&units=metric&appid=b67fa5a827a488bdc84e7e36d78d2009"

    // Using a group call with city ID to just use call it once.
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/group?id=3936456,3448439,3435910,3871336&units=metric&appid=b67fa5a827a488bdc84e7e36d78d2009"
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
          responseData.main.temp = responseData.main.temp | 0;
          cityInfo.temperature = responseData.main.temp;
        }
      });
    });
  }

  navigateToCityInfo(city) {
    localStorage.setItem("city", JSON.stringify(city));
    this.router.navigateByUrl("/city-info");
  }
}
