const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const ejs = require("ejs");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.set("view engine", "ejs");

////////////////////////////////////////////////////////////////////////////////


function website(res, citySelected, newUrl){
  var data='';
  https.get(newUrl, (resp) => {
    resp.on('data', (chunk) => {
      data = data + chunk;
    });

    resp.on('end', () => {
      data = JSON.parse(data);
      res.render("details",{data:data, city:citySelected});
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}


function getDate(minus){
  var date = new Date();
  date.setDate(date.getDate() - minus);
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0');
  var yyyy = date.getFullYear();
  date = dd + '-' + mm + '-' + yyyy;
  return date;
}


app.get("/", function(req, res) {

  var data = '';
  const dateMinus = getDate(1);
  var url = 'https://api.opencovid.ca/timeseries?stat=cases&loc=prov&date=' + dateMinus;

  https.get(url, (resp) => {
    resp.on('data', (chunk) => {
      data = data + chunk;
    });

    resp.on('end', () => {
      data = JSON.parse(data);
      res.render("index", {
        albertaNew: data.cases[0].cases,
        albertaTotal: data.cases[0].cumulative_cases,
        britishNew: data.cases[1].cumulative_cases,
        britishTotal: data.cases[1].cumulative_cases,
        manitobaNew: data.cases[2].cases,
        manitobaTotal: data.cases[2].cumulative_cases,
        brunswickNew: data.cases[3].cases,
        brunswickTotal: data.cases[3].cumulative_cases,
        newfoundlandNew: data.cases[4].cases,
        newfoundlandTotal: data.cases[4].cumulative_cases,
        northwestNew: data.cases[5].cases,
        northwestTotal: data.cases[5].cumulative_cases,
        novaNew: data.cases[6].cases,
        novaTotal: data.cases[6].cumulative_cases,
        nunavutNew: data.cases[7].cases,
        nunavutTotal: data.cases[7].cumulative_cases,
        ontarioNew: data.cases[8].cases,
        ontarioTotal: data.cases[8].cumulative_cases,
        princeNew: data.cases[9].cases,
        princeTotal: data.cases[9].cumulative_cases,
        qcNew: data.cases[10].cases,
        qcTotal: data.cases[10].cumulative_cases,
        saskatchewanNew: data.cases[12].cases,
        saskatchewanTotal: data.cases[12].cumulative_cases,
        yukonNew: data.cases[13].cases,
        yukonTotal: data.cases[13].cumulative_cases,
      });
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});


app.post("/alberta", function(req, res){
  const dateMinus = getDate(366);
  var citySelected = "Alberta";
  var newUrl = "https://api.opencovid.ca/timeseries?loc=AB&stat=active&after=" + dateMinus;

  website(res, citySelected, newUrl);
});

app.post("/britishcolombia", function(req, res){
  const dateMinus = getDate(366);
  var citySelected = "British Colombia";
  var newUrl = "https://api.opencovid.ca/timeseries?loc=BC&stat=active&after=" + dateMinus;

  website(res, citySelected, newUrl);
});

app.post("/manitoba", function(req, res){
  const dateMinus = getDate(366);
  var citySelected = "Manitoba";
  var newUrl = "https://api.opencovid.ca/timeseries?loc=MB&stat=active&after=" + dateMinus;

  website(res, citySelected, newUrl);
});

app.post("/newbrunswick", function(req, res){
  const dateMinus = getDate(366);
  var citySelected = "New Brunswick";
  var newUrl = "https://api.opencovid.ca/timeseries?loc=NB&stat=active&after=" + dateMinus;

  website(res, citySelected, newUrl);
});

app.post("/newfoundlandandlabrador", function(req, res){
  const dateMinus = getDate(366);
  var citySelected = "New Foundland And Labrador";
  var newUrl = "https://api.opencovid.ca/timeseries?loc=NL&stat=active&after=" + dateMinus;

  website(res, citySelected, newUrl);
});

app.post("/northwestterritories", function(req, res){
  const dateMinus = getDate(366);
  var citySelected = "Northwest Territories";
  var newUrl = "https://api.opencovid.ca/timeseries?loc=NT&stat=active&after=" + dateMinus;

  website(res, citySelected, newUrl);
});

app.post("/novascotia", function(req, res){
  const dateMinus = getDate(366);
  var citySelected = "Nova Scotia";
  var newUrl = "https://api.opencovid.ca/timeseries?loc=NS&stat=active&after=" + dateMinus;

  website(res, citySelected, newUrl);
});

app.post("/nunavut", function(req, res){
  const dateMinus = getDate(366);
  var citySelected = "Nunavut";
  var newUrl = "https://api.opencovid.ca/timeseries?loc=NU&stat=active&after=" + dateMinus;

  website(res, citySelected, newUrl);
});

app.post("/ontario", function(req, res){
  const dateMinus = getDate(366);
  var citySelected = "Ontario";
  var newUrl = "https://api.opencovid.ca/timeseries?loc=ON&stat=active&after=" + dateMinus;

  website(res, citySelected, newUrl);
});

app.post("/princeedwardisland", function(req, res){
  const dateMinus = getDate(366);
  var citySelected = "Prince Edward Island";
  var newUrl = "https://api.opencovid.ca/timeseries?loc=PE&stat=active&after=" + dateMinus;

  website(res, citySelected, newUrl);
});

app.post("/quebec", function(req, res){
  const dateMinus = getDate(366);
  var citySelected = "Quebec";
  var newUrl = "https://api.opencovid.ca/timeseries?loc=QC&stat=active&after=" + dateMinus;

  website(res, citySelected, newUrl);
});

app.post("/saskatchewan", function(req, res){
  const dateMinus = getDate(366);
  var citySelected = "Saskatchewan";
  var newUrl = "https://api.opencovid.ca/timeseries?loc=SK&stat=active&after=" + dateMinus;

  website(res, citySelected, newUrl);
});

app.post("/yukon", function(req, res){
  const dateMinus = getDate(366);
  var citySelected = "Yukon";
  var newUrl = "https://api.opencovid.ca/timeseries?loc=YT&stat=active&after=" + dateMinus;

  website(res, citySelected, newUrl);
});

app.post("/canada", function(req, res){
  const dateMinus = getDate(366);
  var citySelected = "Canada";
  var newUrl = "https://api.opencovid.ca/timeseries?loc=canada&stat=active&after=" + dateMinus;

  website(res, citySelected, newUrl);
});

app.post("/", function(req, res){
  const firstName = req.body.fName;
  const email = req.body.email;
  console.log(firstName, email);

  const mailData= {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(mailData);

  const url = "https://us14.api.mailchimp.com/3.0/lists/3118e076b4";

  const options = {
    method: "POST",
    auth: "sebastien:" + process.env.key
  }

  const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
      res.render("success");
    } else {
      res.render("failure");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

});

app.post("/success", function(req, res){
  res.redirect("/");
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

////////////////////////////////////////////////////////////////////////////////

app.listen(process.env.PORT || 3000, function() {
  console.log("Server running on port 3000");
});
