// import fetch from "node-fetch";

let query = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/92617/next7days?unitGroup=metric&include=hours%2Cdays&key=EGRFGFSQE76XHFF8D5RNLSRFJ&contentType=json'
async function getWeatherData() {
  const response = await fetch(query);
  const data = await response.json();
  return data;
  }

export function getPrecipMap() {
  data = getWeatherData();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let data_days = data.days;
  const precipMap = new Map();
  for (var i = 0; i < data_days.length - 1; i++) {
    let curr_day = data_days[i];
    let day_index = new Date(curr_day.datetimeEpoch * 1000).getDay();
    let day_word = days[day_index];
    let hourMap = new Map();
    for (var j = 0; j < curr_day.hours.length; j++) {
      let hourInt = parseInt(curr_day.hours[j].datetime.slice(0,2));
      hourMap.set(hourInt, curr_day.hours[j].precipprob);
    }
    precipMap.set(day_word, hourMap);
    // console.log(day_word);
    // console.log(day_of_week);
  }
  // console.log([...precipMap.entries()]);
  return precipMap;
}

// getWeatherData();