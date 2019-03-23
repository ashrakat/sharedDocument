import { Meteor } from 'meteor/meteor';
import '/imports/collections.js';
import '/shared/methods.js';

Meteor.startup(() => {
 if(!Documents.findOne()){
   Documents.insert({
     title: "doc 1",
     owner: "",
     createdOn: new Date()
   });
 }
});
