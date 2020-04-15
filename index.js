const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
//API key
// 89c2909009ebcc52010f389def2f4519-us19

//List ID
// 89875d14e7

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
    }

});



app.listen(3000, function () {
    console.log("Server is running on port 3000.")
});