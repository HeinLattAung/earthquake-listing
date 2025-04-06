const today = new Date();
const startDate = new Date();
startDate.setDate(today.getDate() - 7); 

const formattedStartDate = startDate.toISOString().split('T')[0];
const formattedEndDate = today.toISOString().split('T')[0];

const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${formattedStartDate}&endtime=${formattedEndDate}&minmagnitude=0.1&latitude=21.9162&longitude=95.9560&maxradiuskm=500`;

fetch(url)
  .then(response => response.json()) 
  .then(data => {
    const tbody = document.getElementById('earthquake-data');
    tbody.innerHTML = ''; 

    if (data.features && data.features.length > 0) {
      data.features.forEach(feature => {
        const place = feature.properties.place;
        const magnitude = feature.properties.mag;
        const time = new Date(feature.properties.time).toLocaleString(); 
        
        const row = `<tr>
          <td>${place}</td>
          <td>${time}</td>
          <td>${magnitude}</td>
        </tr>`;
        tbody.innerHTML += row;
      });
    } else {
      tbody.innerHTML = '<tr><td colspan="3">No earthquakes found in the given area.</td></tr>';
    }
  })
  .catch(error => {
    console.error('Error fetching earthquake data:', error);
    document.getElementById('earthquake-data').innerHTML = `<tr>
                                                                <td colspan="3">Failed to load data.</td>
                                                            </tr>`;
  });
