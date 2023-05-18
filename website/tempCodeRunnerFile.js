// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//URL to retrieve weather information
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
//API key
const apiKey = "&appid=9f2c5e625219b4783942da5745f55f76&units=metric";


const server = "http://127.0.0.1:8000"
function generateData() {
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    //returns promise
    getWeatherData(zip).then((data) => {
        //Make sure  from the received data
        if (data) {
            const {
                main: { temp },
                name: city,
            } = data;

            const info = {
                newDate,
                city,
                temp: Math.round(temp),
                feelings
            };

            postData(server + '/add', info);
            updatingUI();

        }
    });

};
//called function by event listener
document.getElementById("generate").addEventListener("click", generateData);


//function to get web API data
const getWeatherData = async (zip) => {
    try {
        const res = await fetch(baseURL + zip + apiKey);
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.log("error", error);
    }
};


//function to post data
const postData = async (url = "", info = {}) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify(info)
    });
    try {
        const newData = await res.json();
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log("error", error);
    }
};


//Updating UI
const updatingUI = async () => {
    const res = await fetch(server + '/all');
    try {
        const saveData = await res.json();

        document.getElementById("date").innerHTML = saveData.newDate;
        document.getElementById("city").innerHTML = saveData.city;
        document.getElementById("temp").innerHTML = saveData.temp;
        document.getElementById("content").innerHTML = saveData.feelings;
    }
    catch (error) {
        console.log("error", error);
    }
};