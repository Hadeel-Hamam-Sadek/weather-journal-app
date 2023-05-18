// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//URL to retrieve weather information
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
//API key
const apiKey = "&appid=9f2c5e625219b4783942da5745f55f76&units=metric";

const server = "http://127.0.0.1:8000"
function generate() {
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    //function to get web API data
    const getData = async (zip) => {
        try {
            const res = await fetch(baseURL + zip + apiKey);
            const data = await res.json();
            return data;
        }
        catch (error) {
            console.log("error", error);
        }
    };
    getData(zip).then((data) => {
        //function to post data
        const postData = async (url = "", weather = {}) => {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(weather)
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

        postData(server + '/add', { newDate, temp: data.main.temp, feelings });
        //Update UI
        const update = async () => {
            const res = await fetch(server + '/all');
            try {
                const restored = await res.json();

                document.getElementById("date").innerHTML = (`Date is : ${restored.newDate}`);
                document.getElementById("temp").innerHTML = (`Temperature : ${restored.temp}`);
                document.getElementById("content").innerHTML = (`Feelings : ${restored.feelings}`);
            }
            catch (error) {
                console.log("error", error);
            }
        };
        update();


    });

};
//called function by event listener
document.getElementById("generate").addEventListener("click", generate);