import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {ShareJS} from 'meteor/mizzao:sharejs';
import {Session} from 'meteor/session';
import '/imports/collections.js';
import '/shared/methods.js';
import './main.html';

Template.navbar.helpers({
  // return a list of all visible documents
  documents:function(){
    return Documents.find();
  }
})

Template.editor.helpers({
  doc_id : function(){
    setupCurrentDocument();
    return Session.get("docid");
  },

  config: function(){
    return function(editor){
      editor.setOption("lineNumbers", true);
      editor.on('change', function(cm_editor,info){
          $('#viewer_content').contents().find('html').html(cm_editor.getValue());
      });
    }
   }
});

Template.metaData.helpers({
  document:function(){
    if(Session.get('docid')){
      return Documents.findOne({_id:Session.get('docid')});
    }
    else{
      docid = Documents.findOne({owner: Meteor.userId})._id;
      Session.set("docid", docid);
      return Documents.findOne({_id: docid});
    }
  }
})
////////////////// Ending of helpers functions  ////////////////////////////
/////////////////  Starting of events functions ///////////////////////////
Template.navbar.events({
  // create new Document
  "click .js-add-doc":function(event){
    event.preventDefault();
    console.log("Add a new doc!");
    if (!Meteor.user()){// user not available
      alert("You need to login first!");
    }
    else {
      var id = Meteor.call("addDoc", function(err, res){
      if (!err){// all good
        console.log("event callback received id: "+res);
        Session.set("docid", res);
      }
    });
   }
 },
  // load document exists in datbase
  "click .js-load-doc":function(event){
        Session.set("docid", this._id);
   }

});

//////////////////// Ending of events functions ////////////////////////////
// handy function that makes sure we have a document to work on
function setupCurrentDocument(){
  var doc;
  if (!Session.get("docid")){// no doc id set yet
    console.log("looool");
    doc = Documents.findOne(owner: Meteor.userId);
    if (doc){
      console.log("set ID");
      Session.set("docid", doc._id);
    }
  }
}
