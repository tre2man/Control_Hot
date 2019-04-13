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
 	res.render('index',{status:"상태를 변경할려면 버튼을 누르세요."});
});

app.post('/boiler/on', function(req, res){
gpio.write(7, true, function(err) {
        if (err) throw err;
        console.log('Written True to boiler');
	console.log(path.join(__dirname, 'public'));
	return res.render('index', {status: "보일러 전원 On"});
    });

});


app.post('/boiler/off', function(req, res){
gpio.write(7, false, function(err) {
        if (err) throw err;
        console.log('Written False to boiler');
	console.log(path.join(__dirname, 'public'));
	return res.render('index',{status: "보일러 전원 Off"});
    });

});


app.post('/water/button', function(req, res){
gpio.write(11, true, function(err) {
        if (err) throw err;
        console.log('Written True to water');
	console.log(path.join(__dirname, 'public'));
	return res.render('index', {status: "온수 button 클릭"});


//  setTimeout(function() {},500);
//    gpio.write(11, false, function(err) {
//          if (err) throw err;
//          console.log('Written False to water');
//  	console.log(path.join(__dirname, 'public'));
//  	return res.render('index',{status: "온수 button 클릭"});
//      });
    });

sleep(500);

gpio.write(11, false, function(err) {
        if (err) throw err;
        console.log('Written False to water');
  console.log(path.join(__dirname, 'public'));
  return res.render('index',{status: "온수 button 클릭"});
          });
});

//setTimeout(function() {},500);

app.listen(3000, function () {
  console.log('server start at 3000 port')
})
