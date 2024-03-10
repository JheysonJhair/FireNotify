export const fetchFireLocations = async () => {
    try {
      const response = await fetch("https://satlled.ccontrolz.com/satelite/conflagration");
      const json = await response.json();
      const filteredLocations = json.value.filter(location => location.temperature > 60);
      return filteredLocations;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://satlled.ccontrolz.com/satelite/conflagration');
      const data = await response.json();
      return data.value;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  
  export { fetchData };
  
  export const fetchFireLocations2 = async () => {
    try {
      const response = await fetch("https://satlled.ccontrolz.com/satelite/conflagration");
      return true;
    } catch (error) {
      return [];
    }
  };