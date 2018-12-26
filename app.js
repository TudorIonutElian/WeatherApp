document.querySelector('#getTown').addEventListener('click', loadWeatherApp);
document.querySelector('#getPrognoza').addEventListener('click', loadWeatherPrognoza);


function loadWeatherApp(){

    var myTown = document.querySelector('.town-input').value;
    if(myTown === ""){
        myTown = "Bucharest";
    }
    var rowMiddleContent = "";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var response = JSON.parse(this.responseText);
            rowMiddleContent =`
            <div class="col-4">
                <div class="weather-info text-center">
                    <img src='http://openweathermap.org/img/w/${response.weather[0].icon}.png'>
                </div>
                <div class="weather-info">Descriere : Vremea in ${response.name} </div>
                <div class="weather-info">Umiditate : ${response.main.humidity}</div>
                <div class="weather-info">Presiune : ${response.main.pressure}</div>
                <div class="weather-info">Temperatura Curenta : ${response.main.temp}</div>
                <div class="weather-info">Minima Zilei : ${response.main.temp_min}</div>
                <div class="weather-info">Maxima Zilei : ${response.main.temp_max}</div>
            </div>
            <div class="col-8 d-flex">
                    <div style="width: 100%"><iframe width="100%" height="300" src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;coord=${response.coord.lat},${response.coord.long}&amp;q=${myTown}&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"><a href="https://www.maps.ie/map-my-route/">Create route map</a></iframe></div><br />
            </div>
            `;
            document.querySelector('.row-middle').innerHTML = rowMiddleContent;      
        }
    };
    xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=${myTown}`, true);
    xhr.send();
}

function loadWeatherPrognoza(){

    var myTown = document.querySelector('.town-input').value;
    if(myTown === ""){
        myTown = "Bucharest";
    }
    var rowBottomContent =`<div class="col-2 newDay">`;
    var rowMiddleContent = "";
    var daysWeather = "";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var response = JSON.parse(this.responseText);
            //Parcurgere lista
            var previousValue = 0;
                    
            for(var i = 0; i < response.list.length; i++){

                if(previousValue === 0 || response.list[previousValue].dt_txt.substring(0,10) != response.list[i].dt_txt.substring(0, 10)){
                daysWeather += 
                    `   
                        </div>
                        <div class="col-2 newDay">
                            <div class="row">
                                <div class="weather-day">
                                    <div class="ziua">Ziua : ${response.list[i].dt_txt.substring(0,10)}</div>
                                    <div>Orele : ${response.list[i].dt_txt.substring(11,16)}</div>
                                    <div>Temperatura : ${response.list[i].main.temp}</div>
                                    <div>
                                        <img src="http://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png">
                                    </div>
                                </div>
                            </div>  
                        
                        
                    `;
                }else{
                    daysWeather += 
                    `   
                        <div class="col-2 newDay">    
                            <div class="row">
                                <div class="weather-day">
                                    <div>Orele : ${response.list[i].dt_txt.substring(11,16)}</div>
                                    <div>Temperatura : ${response.list[i].main.temp}</div>
                                    <div>
                                        <img src="http://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png">
                                    </div>
                                </div>
                            </div>  
                        </div>  
                        
                    `;
                }
                var previousValue = i;
            }
            
            
            document.querySelector('.row-bottom').innerHTML = rowBottomContent;
            document.querySelector('.row-bottom').innerHTML = daysWeather;
            console.log(response.list);
        }
    };
    xhr.open("GET", `https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=${myTown}`, true);
    xhr.send();
}