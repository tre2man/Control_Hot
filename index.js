var express = require('express');
var app = express();
var path = require('path');
var gpio = require('rpi-gpio');

gpio.setup(7, gpio.DIR_OUT);
gpio.setup(11, gpio.DIR_OUT);




app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

console.log(path.join(__dirname, 'public'));

app.get('/', function(req, res){
 	res.render('index',{status:"Press Button To change Status of Led !!"});
});

app.post('/boiler/on', function(req, res){
gpio.write(7, true, function(err) {
        if (err) throw err;
        console.log('Written True to pin');
	console.log(path.join(__dirname, 'public'));
	return res.render('index', {status: "보일러 전원 On"});
    });

});


app.post('/boiler/off', function(req, res){
gpio.write(7, false, function(err) {
        if (err) throw err;
        console.log('Written False to pin');
	console.log(path.join(__dirname, 'public'));
	return res.render('index',{status: "보일러 전원 Off"});
    });

});

app.post('/water/on', function(req, res){
gpio.write(11, false, function(err) {
        if (err) throw err;
        console.log('Written False to pin');
	console.log(path.join(__dirname, 'public'));
	return res.render('index',{status: "온수 전원 On"});
    });

});

app.post('/water/off', function(req, res){
gpio.write(11, false, function(err) {
        if (err) throw err;
        console.log('Written False to pin');
	console.log(path.join(__dirname, 'public'));
	return res.render('index',{status: "온수 전원 Off"});
    });

});

app.listen(3000, function () {
  console.log('server start at 3000 port')
})