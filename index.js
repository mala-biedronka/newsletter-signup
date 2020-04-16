require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https =require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailAddress = req.body.emailAddress;

    //Object that we need to send as a POST Request to the Mailchimp server
    const data = {
        members: [
            {
                email_address: emailAddress,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    //Create a POST request to the Mailchimp server
    const url = process.env.URL_MAILCHIMP + process.env.LIST_ID_MAILCHIMP;
    const options = {
        method: "POST",
        auth: "login:" + process.env.API_KEY_MAILCHIMP
    };

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            const returnedObject = JSON.parse(data);
            if (returnedObject.errors) {
                console.log(returnedObject.errors);
            }
        });
    });
    request.write(jsonData);
    request.end();


});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000.")
});