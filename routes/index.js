var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('weather.html', { root: 'public'});
    //console.log("In weather.html.");
});

/* GET city service. */
router.get('/getcity',function(req,res,next) {
    //console.log("In getcity route");
    
    var myRe = new RegExp("^" + req.query.q);
   // console.log(myRe);
   
    
    fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
        //console.log("Reading file.");
        if(err) throw err;
        var cities = data.toString().split("\n");
         var jsonresult = [];
         
        //console.log(cities);
        for(var i = 0; i < cities.length; i++) {
            //console.log(i)
            var result = cities[i].search(myRe); 
            if(result != -1) {
                //console.log("Found city: "+cities[i]);
                jsonresult.push({city:cities[i]});
            } 
        }   
        
        //console.log("Result: "+ jsonresult);
        res.status(200).json(jsonresult);
    });
    
   
});


module.exports = router;
