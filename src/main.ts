import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

//SETUP
const gameName = "Antonio's 'Original' Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//MAIN BUTTON TO CLICK
const theGameButton = document.createElement("theGameButton");
theGameButton.innerHTML = "🔥";

let clicks = 0;
let clickIncrease = 0;
theGameButton.onclick = () => {     //INCREASE CLICKS ON BUTTON CLICK
  clicks++;
};
app.append(theGameButton);


//AUTOCLICK UPGRADE
const autoclickUpgrade = document.createElement("button");
autoclickUpgrade.innerHTML = "Enable Autoclick Per Second";

autoclickUpgrade.onclick = () => {
  clickIncrease++;
  clicks-=10;
  theGameButton.innerHTML = `(${clicks | 0}) Clicks`;
  autoclickUpgrade.innerHTML = `(${clickIncrease | 0}) Clicks Per Second; Click To Upgrade`;
};
app.append(autoclickUpgrade);



//GLOBAL UPDATE
let lastTick = 0;
let amount = clickIncrease;
function globalUpdate(FR: number): void {
  const dFR = (FR - lastTick) / 1000; //FRAMERATE CALC
  lastTick = FR;

  amount = clickIncrease * dFR;
  clicks = clicks + amount;
  theGameButton.innerHTML = `(${clicks | 0}) Clicks`; //AUTOCLICK FUNCT
  if (clicks <10) {autoclickUpgrade.disabled = true} else {autoclickUpgrade.disabled = false}; //IF AUTOCLICK UPGRADE 
                                                                                              //IS AVAILABLE
  requestAnimationFrame(globalUpdate);
}
requestAnimationFrame(globalUpdate);
