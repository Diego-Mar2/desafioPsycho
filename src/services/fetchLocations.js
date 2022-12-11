export async function fetchLocations(URL) {

  try {
    const response = await fetch(URL);
    const data = await response.json();

    const promises = data.map(async (location) => {

      const locationURL = location.location_area.url;

      const response = await fetch(locationURL);
      const data = await response.json();

      return data.location.name;
    });

    const locations = await Promise.all(promises);
    return locations;

  } catch (error) {
    console.log(error);
  }
}
