const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

// 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/leads');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Connection Succeeded");
});
// 

var Lead = require("../models/lead");
var Client = require("../models/client");
var Content = require("../models/content");

app.get("/", (req, res) => {
  res.send([
    {
      title: "WordPress Leads",
      description: "5000"
    }
  ]);
});

// Start Leads 
// Fetch all leads
app.get('/leads', (req, res) => {
  Lead.find({}, 'title description', function (error, leads) {
    if (error) { console.error(error); }
    res.send({
      leads: leads
    })
  }).sort({ _id: -1 })
})

// Add new lead
app.post("/add_lead", (req, res) => {
  var db = req.db;
  var title = req.body.title;
  var description = req.body.description;
  var new_lead = new Lead({
    title: title,
    description: description
  });

  new_lead.save(function(error) {
    if (error) {
      console.log(error);
    }
    res.send({
      success: true,
      message: "Lead saved successfully!"
    });
  });
});

// Fetch single lead
app.get('/lead/:id', (req, res) => {
  var db = req.db;
  Lead.findById(req.params.id, 'title description', function (error, lead) {
    if (error) { console.error(error); }
    res.send(lead)
  })
})

// Update a lead
app.put('/leads/:id', (req, res) => {
  var db = req.db;
  Lead.findById(req.params.id, 'title description', function (error, lead) {
    if (error) { console.error(error); }

    lead.title = req.body.title
    lead.description = req.body.description
    lead.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

// Delete a post
app.delete('/leads/:id', (req, res) => {
  var db = req.db;
  Lead.remove({
    _id: req.params.id
  }, function (err, post) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})
// Finish Leads 

// Start Clients
// Fetch all Clients
app.get("/clients", (req, res) => {
  Client.find({}, 'status hostname settings content_id', function(error, clients) {
    if (error) {
      console.error(error);
    }
    res.send({
      clients: clients
    });
  }).sort({ _id: -1 });
});

// Fetch single client
app.get("/client/:id", (req, res) => {
  var db = req.db;
  Client.findById(req.params.id, 'status hostname settings content_id', function (error, client) {
    if (error) {
      console.error(error);
    }
    res.send(client);
  });
});
// Finish Clients 

// Start Contents
// Fetch all Contents
app.get("/contents", (req, res) => {
  Content.find({}, 'lang fields buttons title subtitle title_head_form_2 subtitle_form_2 title_form_2 description_terms terms_conditions', function (error, contents) {
    if (error) {
      console.error(error);
    }
    res.send({
      contents: contents
    });
  }).sort({ _id: -1 });
});

// Fetch single content 
app.get("/content/:id", (req, res) => {
  var db = req.db;
  Content.findById(req.params.id, 'lang fields buttons title subtitle title_head_form_2 subtitle_form_2 title_form_2 description_terms terms_conditions', function (error, content) {
    if (error) {
      console.error(error);
    }
    res.send(content);
  });
});
// Finish Contents


app.listen(process.env.PORT || 8084);