import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

//SETUP
const gameName = "Antonio's 'Original' Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//MAIN BUTTON TO CLICK
const theGameButton = document.createElement("button");
theGameButton.innerHTML = "CLICK MEEEHHHH";
theGameButton.style.position = "absolute";
theGameButton.style.left = "550px";

let clicks = 0;
let clickIncrease = 0;
theGameButton.onclick = () => {
  //INCREASE CLICKS ON BUTTON CLICK
  clicks++;
};
app.append(theGameButton);

//AUTOCLICK UPGRADE LEVELS


//LEVEL A//


let upgradeLevels = [0,0,0];

const autoclickUpgradeA = document.createElement("button");
autoclickUpgradeA.innerHTML = "Enable 0.1 Autoclick Per Second";

autoclickUpgradeA.onclick = () => {
  clickIncrease+=0.1;
  clicks -= 10;
  upgradeLevels[0]++;
  autoclickUpgradeA.innerHTML = `(${upgradeLevels[0]}) 1/10th Click Per Second; Click To Upgrade`;
};

autoclickUpgradeA.style.position = "absolute";
autoclickUpgradeA.style.left = "20px";
autoclickUpgradeA.style.top = "50px";
app.append(autoclickUpgradeA);

//LEVEL B//
const autoclickUpgradeB = document.createElement("button");
autoclickUpgradeB.innerHTML = "Enable 2 Autoclick Per Second";

autoclickUpgradeB.onclick = () => {
  clickIncrease+=2;
  clicks -= 100;
  upgradeLevels[1]++;
  autoclickUpgradeB.innerHTML = `(${upgradeLevels[1]}) Double Clicks Per Second; Click To Upgrade`;
};

autoclickUpgradeB.style.position = "absolute";
autoclickUpgradeB.style.left = "20px";
autoclickUpgradeB.style.top = "100px";
app.append(autoclickUpgradeB);

//LEVEL C//
const autoclickUpgradeC = document.createElement("button");
autoclickUpgradeC.innerHTML = "Enable 50 Autoclick Per Second";

autoclickUpgradeC.onclick = () => {
  clickIncrease+=50;
  clicks -= 1000;
  upgradeLevels[2]++;
  autoclickUpgradeC.innerHTML = `(${upgradeLevels[2]}) Triple Clicks Per Second; Click To Upgrade`;
};

autoclickUpgradeC.style.position = "absolute";
autoclickUpgradeC.style.left = "20px";
autoclickUpgradeC.style.top = "150px";
app.append(autoclickUpgradeC);

//DISPLAY CLICKS
//🔥
const displayClicks = document.createElement("p");
displayClicks.style.position = "absolute";
displayClicks.innerHTML = "im shocked if you manage to see this in-game";
displayClicks.style.left = "970px";
displayClicks.style.top = "50px";
displayClicks.style.fontSize = "40px"
app.append(displayClicks);

//CPS
const CPS = document.createElement("p");
CPS.style.position = "absolute";
CPS.innerHTML = "im shocked if you manage to see this in-game";
CPS.style.left = "975px";
CPS.style.top = "130px";
CPS.style.fontSize = "15px"
app.append(CPS);



//GLOBAL UPDATE
let lastTick = 0;
let amount = clickIncrease;
function globalUpdate(FR: number): void {
  const dFR = (FR - lastTick) / 1000; //FRAMERATE CALC
  lastTick = FR;

  amount = clickIncrease * dFR;//AUTOCLICK FUNCT
  clicks = clicks + amount;

  displayClicks.innerHTML = `(${clicks | 0}) Clicks`; 
  CPS.innerHTML = `(${((0.1 * upgradeLevels[0]) + (2 * upgradeLevels[1]) + (50 * upgradeLevels[2])) }) Clicks / Second`; 

  //IF AUTOCLICK UPGRADE
  //IS AVAILABLE
  if (clicks < 10) {autoclickUpgradeA.disabled = true;} else {autoclickUpgradeA.disabled = false;}

  if (clicks < 100) {autoclickUpgradeB.disabled = true;} else {autoclickUpgradeB.disabled = false;}

  if (clicks < 1000) {autoclickUpgradeC.disabled = true;} else {autoclickUpgradeC.disabled = false;}

  requestAnimationFrame(globalUpdate);
}
requestAnimationFrame(globalUpdate);
