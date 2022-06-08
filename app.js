// url Async requesting function
function httpGetAsync(theUrl, callback)
{
    // create the request object
    var xmlHttp = new XMLHttpRequest();

    // set the state change callback to capture when the response comes in
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }

    // open as a GET call, pass in the url and set async = True
    xmlHttp.open("GET", theUrl, true);

    // call send with no params as they were passed in on the url string
    xmlHttp.send(null);

    return;
}

// callback for the top 8 GIFs of search
function tenorCallback_search(responsetext)
{
    // parse the json response
    var response_objects = JSON.parse(responsetext);

    top_9_gifs = response_objects["results"];
    console.log(top_9_gifs)
    // load the GIFs -- for our example we will load the first GIFs preview size (nanogif) and share size (tinygif)
    document.getElementById("gifNo1").src = top_9_gifs[0]["media"][0]["nanogif"]["url"];
    document.getElementById("gifNo2").src = top_9_gifs[1]["media"][0]["nanogif"]["url"];
    document.getElementById("gifNo3").src = top_9_gifs[2]["media"][0]["nanogif"]["url"];
    document.getElementById("gifNo4").src = top_9_gifs[3]["media"][0]["nanogif"]["url"];
    document.getElementById("gifNo5").src = top_9_gifs[4]["media"][0]["nanogif"]["url"];
    document.getElementById("gifNo6").src = top_9_gifs[5]["media"][0]["nanogif"]["url"];
    document.getElementById("gifNo7").src = top_9_gifs[6]["media"][0]["nanogif"]["url"];
    document.getElementById("gifNo8").src = top_9_gifs[7]["media"][0]["nanogif"]["url"];
    document.getElementById("gifNo9").src = top_9_gifs[8]["media"][0]["nanogif"]["url"];
    return;

}


// function to call the trending and category endpoints
function grab_data(search_term)
{
    // set the apikey and limit
    var apikey = "LIVDSRZULELA";
    var lmt = 9;

    // using default locale of en_US
    var search_url = "https://g.tenor.com/v1/search?q=" + search_term + "&key=" +
            apikey + "&limit=" + lmt;

    httpGetAsync(search_url,tenorCallback_search);

    // data will be loaded by each call's callback
    return;
}

// SUPPORT FUNCTIONS ABOVE
// MAIN BELOW

let form = document.querySelector("form");
addEventListener("submit", (e) => {
    e.preventDefault();
    let search_term = document.getElementById("name").value;
    console.log(search_term);
    grab_data(search_term);
});


// start the flow
grab_data();