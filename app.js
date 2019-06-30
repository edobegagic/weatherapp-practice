window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.degree-section');
    const degreeSpan = document.querySelector('.degree-section span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
           long = position.coords.longitude;
           lat = position.coords.latitude;
           const proxy = 'https://cors-anywhere.herokuapp.com/';
           const api = `${proxy}https://api.darksky.net/forecast/2a0c9bd26df57acbf27993628619a587/${lat},${long}`;
           fetch(api)
           .then(response => {
               return response.json();
           })
           .then(data =>{
              
               const { temperature, summary, icon } = data.currently;
               //Set DOM elements from the API
               temperatureDegree.textContent = temperature;
               temperatureDescription.textContent = summary;
               locationTimezone.textContent = data.timezone;
                //celsius formula
                let celsius = (temperature - 32) * (5 / 9);

               //Set Icon
               setIcons(icon, document.querySelector('.icon'));

               //change to celsius
                degreeSection.addEventListener('click', () => {
                    if(degreeSpan.textContent === "F"){
                        degreeSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else{
                        degreeSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                });
           });
        });

   

    }else{
        h1.textContent = "Molim Vas omogućite Geolokaciju kako bi aplikacija radila."
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});