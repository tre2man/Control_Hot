import express from "express";
import GPIO from "rpi-gpio";

GPIO.setup(7, GPIO.DIR_OUT);
GPIO.setup(11, GPIO.DIR_OUT);

class App {
  public application: express.Application;
  constructor() {
    this.application = express();
  }
}

const app = new App().application;

app.get("/", (req: express.Request, res: express.Response) => {
  res.render('index', {status: '상태를 변경할려면 버튼을 누르시오.'});
});

app.get("/boiler/on", (req: express.Request, res: express.Response) => {
  GPIO.write(7, true, function (err) {
    if (err) throw err;
    console.log("boiler on");
    return res.render("index", { status: "보일러 전원 ON" });
  });
});

app.get("/boiler/off", (req: express.Request, res: express.Response) => {
  res.send("start");
  GPIO.write(7, false, function (err) {
    if (err) throw err;
    console.log("boiler off");
    return res.render("index", { status: "보일러 전원 OFF" });
  });
});

app.get("/water/button", (req: express.Request, res: express.Response) => {
  GPIO.write(11, true, function (err) {
    if (err) throw err;
    console.log("hot water on");
    return res.render("index", { status: "온수 ON" });
  });

  setTimeout(function() {
    GPIO.write(11, false, function (err) {
      if (err) throw err;
      console.log("hot water off");
    });
  })
});

app.listen(3000, () => console.log("Server Start!"));
