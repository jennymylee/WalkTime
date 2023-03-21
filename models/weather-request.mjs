import fetch from "node-fetch";

let query = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/92617?unitGroup=metric&include=hours%2Cdays&key=EGRFGFSQE76XHFF8D5RNLSRFJ&contentType=json';

export async function getWeatherData() {
    const response = await fetch(query);
    const data = await response.json();
    return data;
  }