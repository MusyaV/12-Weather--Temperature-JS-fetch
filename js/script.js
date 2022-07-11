let cities = [
    {
        hours: 6,
        idName: "Miami",
        id: 'img1'
    },
    {
        hours: 6,
        idName: "NewYork",
        id: 'img2'
    },
    {
        hours: 6,
        idName: "Boston",
        id: 'img3'
    },
    {
        hours: 6,
        idName: "Cincinnaty",
        id: 'img4'
    },
    {
        hours: 9,
        idName: "LosAngeles",
        id: 'img5'
    },
];
let weatherHTML = '';
for (let index = 0; index < cities.length; index++) {
    const element = cities[index];

    window.setInterval(function () {
        let date = new Date();
        let hours = date.getHours() - element.hours;
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;

        let clock = hours + ':' + minutes + ':' + seconds;
        document.querySelector(`p#${element.idName}`).innerHTML = clock;
        console.log(hours)
    }, 1000);

    weatherHTML += `<div class="weather" id="${element.id}">
                       <div class="pogoda" id="${element.idName}">
                          <h1>${element.idName}</h1>
                          <div class="temp">10&deg;</div>
                          <div class="icon">icon</div>
                          <div class="disclamer">cloud</div>
                          <p class="demo" id="${element.idName}"></p>
                      </div>
                      </div>`;
};

document.querySelector('.container').innerHTML = weatherHTML;
window.addEventListener('load', () => {
    const API_key = '409789faa13fadc90f75d2667228bc6d';
    const Miami_URL = `https://api.openweathermap.org/data/2.5/weather?q=Miami&appid=${API_key}`;
    const NewYork_URL = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${API_key}`;
    const Boston_URL = `https://api.openweathermap.org/data/2.5/weather?q=Boston&appid=${API_key}`;
    const Cincinnaty_URL = `https://api.openweathermap.org/data/2.5/weather?q=Cincinnati&appid=${API_key}`;
    const LosAngeles_URL = `https://api.openweathermap.org/data/2.5/weather?q=Los Angeles&appid=${API_key}`;

    const URLS = [
        {
            urlKey: Miami_URL,
            name: 'Miami'
        },
        {
            urlKey: NewYork_URL,
            name: 'NewYork'
        },
        {
            urlKey: Boston_URL,
            name: 'Boston'
        },
        {
            urlKey: Cincinnaty_URL,
            name: 'Cincinnaty'
        },
        {
            urlKey: LosAngeles_URL,
            name: 'LosAngeles'
        }
    ];

    for (let index = 0; index < URLS.length; index++) {
        const element = URLS[index];
        fetch(`${element.urlKey}`)
            .then(response => response.json())
            .then(data => {
                document.querySelector(`#${element.name} > h1`).innerHTML = data.name;
                document.querySelector(`#${element.name} > .temp`).innerHTML = Math.round(data.main.temp - 273) + '&deg;';
                document.querySelector(`#${element.name} > .disclamer`).innerHTML = data.weather[0].description;
                document.querySelector(`#${element.name} > .icon`).innerHTML = `<img src= 'https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>`;
            });
    };
});

