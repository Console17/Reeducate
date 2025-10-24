#!/usr/bin/env node
import { Command } from "commander";
const program = new Command();

program
  .name("weather clie")
  .description("tells weather in country")
  .version("1.0.0");
program
  .argument("<city>", "Enter a city to get weather")
  .action(async (cityName) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`
      );
      const data = await res.json();
      // roca qalai ar arsebobs api abrunebs { cod: '404', message: 'city not found' }
      if (data.cod === "404") {
        console.log("couldn't find city");
        return;
      }
      console.log(data);
      console.log(`temp in ${cityName} is ${data.main.temp}`);
    } catch (e) {
      console.error(e);
    }
  });
program.parse();
