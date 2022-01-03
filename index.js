const express = require("express");
var crypto = require("crypto");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 

MongoClient.connect('mongodb+srv://eventplnnerdb:rPH1xqZCeUQMu20D@cluster0.wwrht.mongodb.net/event-db?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('event-db')
        const eventCollec = db.collection('events');
        const datesCollec = db.collection('dates');

        app.post("/api/create_event", (req,res) => {
            var nEvent = req.body;
            eventCollec.insertOne(nEvent)
                .then(result => {
                    res.send(nEvent._id);
                })
                .catch(err =>{
                    console.error(err)
                })
        });
        app.get("/events", (req,res) => {
            var enteredCode = req.query.code;
            console.log(req.query);
            eventCollec.findOne(ObjectId(enteredCode))
                .then(result => {
                    res.send(result);
                })
                .catch(err =>{
                    console.error(err)
                })
        });
        app.get("/api/event_details", (req,res) => {
            var enteredCode = req.query.code;
            // console.log(req.query);
            datesCollec.find({event_id:enteredCode}, {guestName:1, dates:1, _id:0}).toArray()
                .then(result => {
                    res.send(result);
                    console.log("sent");
                })
                .catch(err =>{
                    console.error(err)
                })
        });
        app.post("/api/event_details", (req,res) => {
            var enteredCode = req.body.event_id;
            var dateInfo = req.body;
            // console.log(req.query);
            if(eventCollec.findOne(ObjectId(enteredCode))!=null){
                datesCollec.insertOne(dateInfo)
                .then(result => {
                    res.send("yay");
                })
                .catch(err =>{
                    console.error(err)
                })
            }
        });
    })
    .catch(error => console.error(error))

app.use(cors());
app.use(cors({origin: 'http://localhost:3000'}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.post("/api/create_event", (req,res) => {
    
//     const fName = req.body.firstName;
//     const lName = req.body.lastName;
//     const eName = req.body.eventName;
//     const sDate = req.body.startDate;
//     const eDate = req.body.endDate;

//     var code = crypto.randomBytes(20).toString('hex');
//     res.send(code);
// });
app.get("/", (req,res) => {
    res.send("hello")
});
app.listen(3001,()=> {
    console.log("running on port 3001");
});