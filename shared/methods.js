Meteor.methods({
  addDoc:function(){
      if (!this.userId){// not logged in
        return;
      }
      console.log("hi from methods");
      var doc = {owner:this.userId, createdOn:new Date(), title: 'my new document'};
      docId = Documents.insert(doc);
      console.log(docId);
      return docId;
  }
})
