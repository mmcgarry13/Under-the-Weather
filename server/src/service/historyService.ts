import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

// TODO: Define a City class with name and id properties
class City {
  id: string; // Should be a string (since uuidv4() generates a string)
  name: string;

  constructor(name: string, id?: string) {
    this.name = name;
    this.id = id || uuidv4(); // If an ID is provided, use it; otherwise, generate a new UUID
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    return await fs.readFile('searchHistory.json', {
      flag: 'a+',
      encoding: 'utf8',
    })};
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file

    private async write(cities: City[]) {
      return await fs.writeFile(
        'db/searchHistory.json',
        JSON.stringify(cities, null, '\t')
      );
    };

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    return await this.read().then((cities) => {
      let parsedFeedback: City[];

      // If feedback isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedFeedback = [].concat(JSON.parse(cities));
      } catch (err) {
        parsedFeedback = [];
      }

      return parsedFeedback;
    });
  }


  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    return await fs.appendFile(
      'db/searchHistory.json',
        JSON.stringify(city, null, '\t')
    )

  };
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    return await this.getCities().then((cities) => {
      const updatedCities = cities.filter((city) => city.id !== id);
      return this.write(updatedCities);
    });
  }
}

export default HistoryService;
