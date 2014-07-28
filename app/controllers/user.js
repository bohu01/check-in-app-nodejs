
/*
 * user controller.
 */
var User = require('../models/user.js');
var Record = require('../models/record.js');

exports.create = function (req, res) {
  var user = new User(req.body);
  user.provider = 'local'
  User.find({username: req.body.username}, function(err,users){
    if(users.length == 0){
      user.save(function (err) {
      	res.redirect('/')
      })
    }
    else{
      res.redirect('/')
    }
  })
};

exports.login = function(req, res){
  var url = '/users/' + req.user.id;
  res.redirect(url)
}

exports.show = function(req, res){
  res.render('checkin', {user:req.user})
}

exports.checkIn = function(req,res){
  var url = '/users/' + req.user.id;
  var d = new Date();
  var day = d.getDay();
  var date = d.toLocaleDateString();
  var year = d.getFullYear();
  var month = d.getMonth();
  var localtime = d.toLocaleTimeString();
  if (!req.user.checkin) {
    User.findOne({_id: req.user.id},function(err, user){
      if(err){
        console.log(err)
      }
      user.lastcheckin.date = date;
      user.lastcheckin.localtime = localtime;
      user.checkin = true;
      user.checkout = false;
      user.save(function(err){
        if(err){
          console.log(err)
        }
        var record_string = d;
        var flag = "checkin";
        addRecord(flag, req.user.id, date, month, year, record_string, d);
        res.redirect(url);
      })
    })
  }
  else if(req.user.lastcheckin.date!=date){
    User.findOne({_id: req.user.id},function(err, user){
      if(err){
        console.log(err)
      }
      user.lastcheckin.date = date;
      user.lastcheckin.localtime = localtime;
      user.checkin = true;
      user.checkout = false;
      user.save(function(err){
        if(err){
          console.log(err)
        }
        var flag = "checkin";
        var record_string = d;
        addRecord(flag, req.user.id, date, month, year, record_string);
        res.redirect(url)
      })
    })
  }
  else{
    res.redirect(url);
  }

}

exports.checkOut = function(req,res){
  var url = '/users/' + req.user.id;
  var d = new Date();
  var day = d.getDay();
  var date = d.toLocaleDateString();
  var year = d.getFullYear();
  var month = d.getMonth();
  var localtime = d.toLocaleTimeString();
  if (!req.user.checkout) {
    User.findOne({_id: req.user.id},function(err, user){
      if(err){
        console.log(err)
      }
      user.lastcheckout.date = date;
      user.lastcheckout.localtime = localtime;
      user.checkout = true;
      user.checkin = false;
      user.save(function(err){
        if(err){
          console.log(err)
        }
        var flag = "checkout";
        var record_string = d;
        addRecord(flag, req.user.id, date, month, year, record_string);
        res.redirect(url);
      })
    })
  }
  else if(req.user.lastcheckout.date!=date){
    User.findOne({_id: req.user.id},function(err, user){
      if(err){
        console.log(err)
      }
      user.lastcheckout.date = date;
      user.lastcheckout.localtime = localtime;
      user.checkout = true;
      user.checkin = false;
      user.save(function(err){
        if(err){
          console.log(err)
        }
        var flag = "checkout";
        var record_string = d;
        addRecord(flag, req.user.id, date, month, year, record_string);
        res.redirect(url)
      })
    })
  }
  else{
    res.redirect(url);
  }

}

exports.makeNotes = function(req,res){
  var url = '/users/' + req.user.id;
  var d = new Date();
  var day = d.getDay();
  var date = d.toLocaleDateString();
  var year = d.getFullYear();
  var month = d.getMonth();
  Record.findOne({user_id: req.user.id, date:date}, function(err,record_item){
    if(err){
      console.log(err)
    }
    if(!record_item){
      var record = new Record()
      record.date = date;
      record.user_id = user_id;
      record.month = month;
      record.year = year;
      record.notes.push(req.body.notes)
      record.save(function(err){
        if(err){
          console.log(err)
        }
        res.redirect(url)
      });
    }
    else{
      record_item.notes.push(req.body.notes)
      record_item.save(function(err){
        if(err){
          console.log(err)
        }
        res.redirect(url)
      })
    }
  })  
}

function addRecord(flag, user_id, date, month, year, record_string){
  Record.findOne({user_id: user_id, date:date}, function(err,record_item){
    if(err){
      console.log(err)
    }
    if(!record_item){
      var record = new Record()
      record.date = date;
      record.user_id = user_id;
      record.month = month;
      record.year = year;
      if(flag == "checkin"){
        record.checkin_records.push(record_string);
      }
      if(flag == "checkout"){
        record.checkout_records.push(record_string);
      }
      record.save(function(err){
        if(err){
          console.log(err)
        }
      });
    }
    else{
      console.log(record);
      if(flag == "checkin"){
        record_item.checkin_records.push(record_string);
      }
      if(flag == "checkout"){
        var a = record_string;
        var b = record_item.checkin_records[record_item.checkin_records.length-1]
        console.log("sss")
        console.log(b)
        var c = (a-b)/(1000*60*60)
        var hours = c.toFixed(2);
        record_item.hours.push(hours);
        record_item.checkout_records.push(record_string);
      }
      record_item.save(function(err){
        if(err){
          console.log(err)
        }       
      })
    }
  }) 
};




exports.checkInfo = function(req,res){
  Record.find({user_id:req.user.id}, function(err,items){
    if(err){
      console.log(err)
    }
    res.render('info', {items:items, user:req.user})
  })
}

exports.search =function(req,res){
  res.render('search', {message:""})
}

exports.doSearch =function(req,res){
  var firstname = req.body.firstname.trim();
  var lastname = req.body.lastname.trim();
  var year = req.body.year.trim();
  var month = Number(req.body.month.trim()) - 1;
  User.findOne({firstname:firstname, lastname:lastname}, function(err, user){
    if(err){
      console.log(err)
    }
    if(!user){
      console.log("sss")
      res.render('search', {message: "User name do not exsit"})
    }
    else{
    user_id = user.id;
    Record.find({user_id:user_id, year:year, month:month}, function(err,records){
      if(err){
        console.log(err)
      }
      res.render('result', {items:records, firstname:firstname, lastname:lastname})
    })
    }
  })
}

exports.test = function(req, res){
  res.json({message:"ok"})
}


