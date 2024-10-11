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

let clicks = 100000;
let clickIncrease = 0;
let multiplier = 1;
theGameButton.onclick = () => {
  //INCREASE CLICKS ON BUTTON CLICK
  clicks++;
};
app.append(theGameButton);

//AUTOCLICK UPGRADE LEVELS

const upgradeLevels = [0, 0, 0];

interface Item {
  name: string;
  cost: number;
  rate: number;
  multrate: number;
  left: string;
  top: string;
  hoverLeft: string;
  hoverTop: string;
  desc: string;
  lvl: number;
}

const itemShop: Item[] = [
  {
    name: "FirePit",
    cost: 10,
    rate: 0.1,
    multrate: 0,
    left: "20px",
    top: "50px",
    hoverLeft: "290px",
    hoverTop: "32px",
    desc: "A cozy firepit, great for some camping.<br>Gain an additional 0.1 Ashes Per Second.",
    lvl: 0
  },
  {
    name: "Charcoal",
    cost: 100,
    rate: 2,
    multrate: 0,
    left: "20px",
    top: "100px",
    hoverLeft: "300px",
    hoverTop: "80px",
    desc: "Quality Charcoal to fuel the fire.<br>Gain an additional 2 Ashes Per Second.",
    lvl: 0
  },
  {
    name: "Lighter Fluid",
    cost: 1000,
    rate: 50,
    multrate: 0,
    left: "20px",
    top: "150px",
    hoverLeft: "335px",
    hoverTop: "130px",
    desc: "Please dont set things on fire that shouldn't...<br>Gain an additional 50 Ashes Per Second.",
    lvl: 0
  },
  {
    name: "Flamethrower",
    cost: 5000,
    rate: 0,
    multrate: 0.04,
    left: "20px",
    top: "200px",
    hoverLeft: "355px",
    hoverTop: "180px",
    desc: "Does this even have a practical everyday use?<br>Ashes Per Second Increases by 4%.",
    lvl: 0
  },
  {
    name: "Smokey The Bear",
    cost: 19440,
    rate: 0,
    multrate: 0.75,
    left: "20px",
    top: "250px",
    hoverLeft: "40px",
    hoverTop: "280px",
    desc: "WHAT ARE YOU DOING?????<br>Ashes Per Second Increases by 75%",
    lvl: 0
  }
  
];

//!!!CREATING BUTTONS VIA DDD!!!//
const listOfButtons: HTMLButtonElement[] = [];
for (let a = 0; a <= itemShop.length-1; a++) {
  console.log(a);
  const button = document.createElement("button");
  if (itemShop[a].lvl == 0) {
    if (a == 2 || a == 1) {
      button.innerHTML = `Get ${itemShop[a].name} For: ${itemShop[a].cost | 0}  Ashes`;
    } else if (a == 4){
      button.innerHTML = `Hold ${itemShop[a].name} Hostage For: ${itemShop[a].cost | 0}  Ashes`;
    } else {
      console.log(itemShop[a].name);
      button.innerHTML = `Get a ${itemShop[a].name} For: ${itemShop[a].cost | 0}  Ashes`;
    }
  }

  button.onclick = () => {
    clickIncrease += itemShop[a].rate;
    multiplier += itemShop[a].multrate;
    clicks -= itemShop[a].cost;
    itemShop[a].lvl++;
    itemShop[a].cost *= 1.15;
    button.innerHTML = `${itemShop[a].cost | 0} | ${itemShop[a].lvl} ${itemShop[a].name}`;
  };

  button.style.position = "absolute";
  button.style.left = itemShop[a].left;
  button.style.top = itemShop[a].top;
  document.body.appendChild(button);
  listOfButtons.push(button);

  //HOVER SHOWS BONUS DETAILS
  button.addEventListener("mouseenter", function () {
    const bonusText = document.createElement("p");
    bonusText.style.left = itemShop[a].hoverLeft;
    bonusText.style.top = itemShop[a].hoverTop;
    bonusText.innerHTML = itemShop[a].desc;
    bonusText.style.position = "absolute";
    app.append(bonusText);
    button.addEventListener("mouseleave", function () {
      bonusText.innerHTML = ""; //DISSAPEAR WHEN NO LONGER HOVERING
      bonusText.style.left = "30000px";
    });
  });

  if (clicks < itemShop[a].cost) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

//DISPLAY CLICKS 🗣️🗣️🗣️🔥🔥🔥
const displayClicks = document.createElement("p");
displayClicks.style.position = "absolute";
displayClicks.innerHTML = "im shocked if you manage to see this in-game";
displayClicks.style.left = "970px";
displayClicks.style.top = "50px";
displayClicks.style.fontSize = "40px";
app.append(displayClicks);

//Clicks Per Second
const CPS = document.createElement("p");
CPS.style.position = "absolute";
CPS.innerHTML = "im shocked if you manage to see this in-game";
CPS.style.left = "975px";
CPS.style.top = "130px";
CPS.style.fontSize = "15px";
app.append(CPS);

//IF AUTOCLICK UPGRADE IS AVAILABLE
//HELPER FUNCTION

function checkAvailable(a: number, button: HTMLButtonElement) {
  if (clicks < itemShop[a].cost) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

//GLOBAL UPDATE
let lastTick = 0;
let amount = clickIncrease;
function globalUpdate(FR: number): void {
  const dFR = (FR - lastTick) / 1000; //FRAMERATE CALC
  lastTick = FR;

  amount = (clickIncrease*multiplier) * dFR; //AUTOCLICK FUNCT
  clicks = clicks + amount;

  displayClicks.innerHTML = `(${clicks | 0}) Ashes`;

  let totalCPS = 0;

  for (let c = 0; c<itemShop.length; c++){
    totalCPS += itemShop[c].lvl * itemShop[c].rate
  }

  if (multiplier == 1){
    CPS.innerHTML = `${totalCPS} Ashes Per Second`;
  } else {CPS.innerHTML = `${totalCPS}(X ${multiplier}) Ashes Per Second`; }
  

  for (let a = 0; a < listOfButtons.length; a++) {
    checkAvailable(a, listOfButtons[a]);
  }

  requestAnimationFrame(globalUpdate);
}
requestAnimationFrame(globalUpdate);






//SAIYAN LIMIT = "DNE"