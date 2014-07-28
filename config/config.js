module.exports = {
    development: {
      root: require('path').normalize(__dirname + '/..'),
      app: {
        name: 'SINA-checkin'
      },
      
      //db: 'mongodb://localhost/libraryManagement'
      db: 'mongodb://heroku_app27692589:645fdrdi6v0qdaamoftnq1k06k@ds037637.mongolab.com:37637/heroku_app27692589'
 	},
 	production: {
      root: require('path').normalize(__dirname + '/..'),
      app: {
        name: 'SINA-checkin'
      },
      // db: 'mongodb://localhost/libraryManagement'
      db: 'mongodb://heroku_app27692589:645fdrdi6v0qdaamoftnq1k06k@ds037637.mongolab.com:37637/heroku_app27692589'		
 	}

}