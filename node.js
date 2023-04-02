const express = require("express");
const https = require('https');
const mysql = require("mysql");


const app = express();
app.set('view engine', 'ejs');

app.use(express.static("asset"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "epics",
  password: 'Shannu@18'
});

connection.connect(function(error) {
  if (error) throw error;
  else {
    console.log("connected to database successfully!!");
  }
});

app.get("/", function(req, res) {
  const url = "https://api.wazirx.com/api/v2/tickers";
  https.get(url, function(response) {
    console.log(response.statusCode);

    let rawData = '';

    response.on("data", function(data) {
      rawData += data;
    });

    response.on("end", function() {
      const Data = JSON.parse(rawData);
      const DataGroup = {};
      Object.values(Data).forEach((i) => {
        const baseUnit = i.base_unit;
        if (!DataGroup[baseUnit]) {
          DataGroup[baseUnit] = [];
        }
        DataGroup[baseUnit].push(i);
      });

      const top10 = [];
      Object.values(DataGroup).forEach((group) => {
        const sortedGroup = group.sort((a, b) => b.last - a.last);
        const topGroup = sortedGroup.slice(0, 10);
        top10.push(topGroup);
      });

      const values = top10.map((group) => {
        return group.map((i) => [
          i.name,
          i.last,
          i.buy,
          i.sell,
          i.volume,
          i.base_unit
        ]);
      });

      const flattenedValues = [].concat.apply([], values);
    

     
      connection.query("select * from tickers where base_unit='btc'", function(err, results) {
        if (err) {
          throw err;
        } else {
          console.log(results);
          var data=JSON.parse(JSON.stringify(results));
          res.render("main",{sampleData:data});
        }
      });
      
  

    });
  });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});

app.get("/eth",function(req,res){

    connection.query("select * from tickers where base_unit='eth'order by id limit 10", function(err, results) {
        if (err) {
          throw err;
        } else {
          console.log(results);
          var data=JSON.parse(JSON.stringify(results));
          res.render("base",{title:"ETH",sampleData1:data});
        }
      })
})

app.get("/usdt",function(req,res){

  connection.query("select * from tickers where base_unit='usdt'order by id limit 10", function(err, results) {
      if (err) {
        throw err;
      } else {
        console.log(results);
        var data=JSON.parse(JSON.stringify(results));
        res.render("base",{title:"USDT",sampleData1:data});
      }
    })
})

app.get("/xrp",function(req,res){

  connection.query("select * from tickers where base_unit='xrp'order by id limit 10", function(err, results) {
      if (err) {
        throw err;
      } else {
        console.log(results);
        var data=JSON.parse(JSON.stringify(results));
        res.render("base",{title:"XRP",sampleData1:data});
      }
    })
})

app.get("/trx",function(req,res){

  connection.query("select * from tickers where base_unit='trx'order by id limit 10", function(err, results) {
      if (err) {
        throw err;
      } else {
        console.log(results);
        var data=JSON.parse(JSON.stringify(results));
        res.render("base",{title:"TRX",sampleData1:data});
      }
    })
})

app.get("/dash",function(req,res){

  connection.query("select * from tickers where base_unit='dash'order by id limit 10", function(err, results) {
      if (err) {
        throw err;
      } else {
        console.log(results);
        var data=JSON.parse(JSON.stringify(results));
        res.render("base",{title:"DASH",sampleData1:data});
      }
    })
})

app.get("/zec",function(req,res){

  connection.query("select * from tickers where base_unit='zec'order by id limit 10", function(err, results) {
      if (err) {
        throw err;
      } else {
        console.log(results);
        var data=JSON.parse(JSON.stringify(results));
        res.render("base",{title:"ZEC",sampleData1:data});
      }
    })
})

app.get("/xem",function(req,res){

  connection.query("select * from tickers where base_unit='xem'order by id limit 10", function(err, results) {
      if (err) {
        throw err;
      } else {
        console.log(results);
        var data=JSON.parse(JSON.stringify(results));
        res.render("base",{title:"XEM",sampleData1:data});
      }
    })
})

app.get("/iost",function(req,res){

  connection.query("select * from tickers where base_unit='iost'order by id limit 10", function(err, results) {
      if (err) {
        throw err;
      } else {
        console.log(results);
        var data=JSON.parse(JSON.stringify(results));
        res.render("base",{title:"IOST",sampleData1:data});
      }
    })
})

app.get("/win",function(req,res){

  connection.query("select * from tickers where base_unit='win'order by id limit 10", function(err, results) {
      if (err) {
        throw err;
      } else {
        console.log(results);
        var data=JSON.parse(JSON.stringify(results));
        res.render("base",{title:"WIN",sampleData1:data});
      }
    })
})

app.get("/bit",function(req,res){

  connection.query("select * from tickers where base_unit='bit'order by id limit 10", function(err, results) {
      if (err) {
        throw err;
      } else {
        console.log(results);
        var data=JSON.parse(JSON.stringify(results));
        res.render("base",{title:"BIT",sampleData1:data});
      }
    })
})

app.get("/wrx",function(req,res){

  connection.query("select * from tickers where base_unit='wrx'order by id limit 10", function(err, results) {
      if (err) {
        throw err;
      } else {
        console.log(results);
        var data=JSON.parse(JSON.stringify(results));
        res.render("base",{title:"WRX",sampleData1:data});
      }
    })
})









app.get("/btc",function(req,res){

    connection.query("select * from tickers where base_unit='btc'order by id limit 10", function(err, results) {
        if (err) {
          throw err;
        } else {
          console.log(results);
          var data=JSON.parse(JSON.stringify(results));
          res.render("base",{title:"BTC",sampleData1:data});
        }
      })
})

app.get("/ach",function(req,res){

    connection.query("select * from tickers where base_unit='ach' order by id limit 10", function(err, results) {
        if (err) {
          throw err;
        } else {
          console.log(results);
          var data=JSON.parse(JSON.stringify(results));
          res.render("base",{title:"ACH",sampleData1:data});
        }
      })
})

app.get("/index.html",function(req,res){
  res.sendFile(__dirname+"/index.html");
})
