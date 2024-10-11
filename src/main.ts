import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

//SETUP
const gameName = "Fan The Flames";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//MAIN BUTTON TO CLICK
const theGameButton = document.createElement("button");
theGameButton.innerHTML = "🔥";
theGameButton.style.position = "absolute";
theGameButton.style.left = "400px";
theGameButton.style.width = "500px";
theGameButton.style.borderRadius = "100%";
theGameButton.style.fontSize = "140px";
theGameButton.style.background = "green";
theGameButton.style.border = "black";


let clicks = 0;
let clickIncrease = 0;
theGameButton.onclick = () => {
  //INCREASE CLICKS ON BUTTON CLICK
  clicks++;
};
app.append(theGameButton);

//AUTOCLICK UPGRADE LEVELS

//FIREPIT//

const upgradeLevels = [0, 0, 0];
const upgradeCosts = [10, 100, 1000];

const firepit = document.createElement("button");
firepit.innerHTML = `Get Firepit For: (${upgradeCosts[0] | 0}) Ashes`;

firepit.onclick = () => {
  clickIncrease += 0.1;
  clicks -= 10;
  upgradeLevels[0]++;
  upgradeCosts[0] *= 1.15;
  firepit.innerHTML = `(${upgradeCosts[0] | 0}) | (${upgradeLevels[0]}) Firepit`;
  console.log(upgradeCosts);
};

firepit.style.position = "absolute";
firepit.style.left = "20px";
firepit.style.top = "50px";
app.append(firepit);

//CHARCOAL//
const charcoal = document.createElement("button");
charcoal.innerHTML = `Get Charcoal For: (${upgradeCosts[1] | 0}) Ashes`;

charcoal.onclick = () => {
  clickIncrease += 2;
  clicks -= 100;
  upgradeLevels[1]++;
  upgradeCosts[1] *= 1.15;
  charcoal.innerHTML = `(${upgradeCosts[1] | 0}) Ashes | (${upgradeLevels[1]}) Charcoal`;
};

charcoal.style.position = "absolute";
charcoal.style.left = "20px";
charcoal.style.top = "100px";
app.append(charcoal);

//LIGHTER_FLUID/
const lighterFluid = document.createElement("button");
lighterFluid.innerHTML = `Get Lighter Fluid For: (${upgradeCosts[2] | 0}) Ashes`;

lighterFluid.onclick = () => {
  clickIncrease += 50;
  clicks -= 1000;
  upgradeLevels[2]++;
  upgradeCosts[2] *= 1.15;
  lighterFluid.innerHTML = `(${upgradeCosts[2] | 0}) | (${upgradeLevels[2]}) Cans of Lighter Fluid`;
};

lighterFluid.style.position = "absolute";
lighterFluid.style.left = "20px";
lighterFluid.style.top = "150px";
app.append(lighterFluid);

//DISPLAY CLICKS 🗣️🗣️🗣️🔥🔥🔥
const displayClicks = document.createElement("p");
displayClicks.style.position = "absolute";
displayClicks.innerHTML = "im shocked if you manage to see this in-game";
displayClicks.style.left = "970px";
displayClicks.style.top = "50px";
displayClicks.style.fontSize = "40px";
app.append(displayClicks);

//CPS
const CPS = document.createElement("p");
CPS.style.position = "absolute";
CPS.innerHTML = "im shocked if you manage to see this in-game";
CPS.style.left = "975px";
CPS.style.top = "130px";
CPS.style.fontSize = "15px";
app.append(CPS);

//SHOW BONUSTEXT
const bonusDescrip = [
  "A cozy firepit, great for some camping.<br>Gain an additional 0.1 Ashes Per Second.", 
  "Quality Charcoal to fuel the fire.<br>Gain an additional 2 Ashes Per Second.", //UPGRADE DESCRIPTIONS
  "Please dont set things on fire that shouldn't...<br>Gain an additional 50 Ashes Per Second." 

];
const bonusText = document.createElement("p");
bonusText.style.position = "absolute";
bonusText.innerHTML = "TEST";
bonusText.style.left = "30000px";
bonusText.style.fontSize = "14px";
app.append(bonusText); //CREATING THE BONUS TEXT

//SHOW TEXT UPON HOVER
firepit.addEventListener("mouseenter", function(){
  bonusText.style.left = "270px";
  bonusText.style.top = "35px";
  bonusText.innerHTML = bonusDescrip[0];
  firepit.addEventListener("mouseleave", function(){
    bonusText.innerHTML = "";   //DISSAPEAR WHEN NO LONGER HOVERING
    bonusText.style.left = "30000px";
  });
});


charcoal.addEventListener("mouseenter", function(){
  bonusText.style.left = "290px";
  bonusText.style.top = "86px";
  bonusText.innerHTML = bonusDescrip[1];
  charcoal.addEventListener("mouseleave", function(){
    bonusText.innerHTML = "";
    bonusText.style.left = "30000px";
  });
});


lighterFluid.addEventListener("mouseenter", function(){
  bonusText.style.left = "333px";
  bonusText.style.top = "137px";
  bonusText.innerHTML = bonusDescrip[2];
  lighterFluid.addEventListener("mouseleave", function(){
    bonusText.innerHTML = "";
    bonusText.style.left = "30000px";
  });
});



//GLOBAL UPDATE
let lastTick = 0;
let amount = clickIncrease;
function globalUpdate(FR: number): void {
  const dFR = (FR - lastTick) / 1000; //FRAMERATE CALC
  lastTick = FR;

  amount = clickIncrease * dFR; //AUTOCLICK FUNCT
  clicks = clicks + amount;

  displayClicks.innerHTML = `(${clicks | 0}) Ashes`;
  CPS.innerHTML = `(${0.1 * upgradeLevels[0] + 2 * upgradeLevels[1] + 50 * upgradeLevels[2]}) Ashes / Second`;

  //IF AUTOCLICK UPGRADE
  //IS AVAILABLE
  if (clicks < upgradeCosts[0]) {
    firepit.disabled = true;
  } else {
    firepit.disabled = false;
  }

  if (clicks < upgradeCosts[1]) {
    charcoal.disabled = true;
  } else {
    charcoal.disabled = false;
  }

  if (clicks < upgradeCosts[2]) {
    lighterFluid.disabled = true;
  } else {
    lighterFluid.disabled = false;
  }

  requestAnimationFrame(globalUpdate);
}
requestAnimationFrame(globalUpdate);
