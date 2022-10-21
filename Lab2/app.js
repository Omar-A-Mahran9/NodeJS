// ---------------------------------------------------------   Phone Book Web Service App   --------------------------------------------------------- //

const express = require("express");
const bodyParser = require("body-parser");
const formParser = bodyParser.urlencoded();
const app = new express();

var contacts = [
  {
    id: 1,
    name: "Omar",
    number: "+123456789",
  },
  {
    id: 2,
    name: "Eslam",
    number: "+2345667891",
  },
  {
    id: 3,
    name: "Moustafa",
    number: "+0312314124",
  },
  {
    id: 4,
    name: "Osama ",
    number: "+7895667891",
  },
];
var contactId = contacts.length + 1;

app.post("/addcontact", formParser, function (req, res) {
  req.body.id = contactId++;
  contacts.push(req.body);
  console.log(contacts);
  res.send({ msg: "Contact Saved Successfully" });
}); // add new contact

app.get("/allcontacts", function (req, res) {
  if (req.query.name == undefined) req.query.name = "";
  let contactsFilter = contacts.filter(
    (contact) => contact && contact.name.indexOf(req.query.name) > -1
  );
  res.send(contactsFilter);
}); // get all contacts

app.get("/getcontact", function (req, res) {
  if (req.query.name == undefined) req.query.name = "";
  let contact = contacts.find(
    (contact) => contact && contact.id == req.query.id
  );
  res.send(contact);
}); // get specific contact

app.post("/editcontact", formParser, function (req, res) {
  let contact = contacts.find(
    (contact) => contact && contact.id == req.body.id
  );
  contact.name = req.body.name;
  contact.number = req.body.number;
  console.log(contacts);
  res.send({ msg: "Contact Updated Successfully" });
}); // edit contact

app.post("/deletecontact", formParser, function (req, res) {
  let idContact = contacts.findIndex(
    (contact) => contact && contact.id == req.body.id
  );
  delete contacts[idContact];
  console.log(contacts);
  res.send({ msg: "Contact Deleted Successfully" });
}); // delete contact

app.listen(8080);
