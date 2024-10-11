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

const upgradeLevels = [0, 0, 0];

interface Item {
  name: string,
  cost: number,
  rate: number,
  left: string,
  top: string,
  hoverLeft: string,
  hoverTop: string,
  desc: string
};

const itemShop : Item[] = [

  {name: "FirePit", 
  cost: 10, rate: 0.1, 
  left: "20px", 
  top: "50px",
  hoverLeft: "290px", 
  hoverTop: "32px",
  desc: "A cozy firepit, great for some camping.<br>Gain an additional 0.1 Ashes Per Second."
  },
  {name: "Charcoal", 
  cost: 100, 
  rate: 2, 
  left: "20px", 
  top: "100px",
  hoverLeft: "300px", 
  hoverTop: "80px",
  desc: "Quality Charcoal to fuel the fire.<br>Gain an additional 2 Ashes Per Second."
},
  {name: "Lighter Fluid", 
  cost: 1000, 
  rate: 50, 
  left: "20px", 
  top: "150px",
  hoverLeft: "335px", 
  hoverTop: "130px",
  desc: "Please dont set things on fire that shouldn't...<br>Gain an additional 50 Ashes Per Second."
}

];


//!!!CREATING BUTTONS VIA DDD!!!//
let listOfButtons: HTMLButtonElement[] = [];
for (let a = 0; a <= 2; a++){
  let button = document.createElement("button");
  if (upgradeLevels[a] == 0) {
    if (a == 2 || a == 1) {
      button.innerHTML = `Get ${itemShop[a].name} For: ${itemShop[a].cost | 0}  Ashes `;
    } else {button.innerHTML = `Get a ${itemShop[a].name} For: ${itemShop[a].cost | 0}  Ashes `;}
  }

  button.onclick = () => {
    clickIncrease += itemShop[a].rate;
    clicks -= itemShop[a].cost;
    upgradeLevels[a]++;
    itemShop[a].cost *= 1.15;
    button.innerHTML = `${itemShop[a].cost | 0} | ${upgradeLevels[a]} ${itemShop[a].name}`;
  };

  button.style.position = "absolute";
  button.style.left = itemShop[a].left;
  button.style.top = itemShop[a].top;
  document.body.appendChild(button);
  listOfButtons.push(button);


  //HOVER SHOWS BONUS DETAILS
  button.addEventListener("mouseenter", function () {
    let bonusText = document.createElement("p");
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

  function checkAvailable(a: number, button: HTMLButtonElement){
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

  amount = clickIncrease * dFR; //AUTOCLICK FUNCT
  clicks = clicks + amount;

  displayClicks.innerHTML = `(${clicks | 0}) Ashes`;
  CPS.innerHTML = `(${0.1 * upgradeLevels[0] + 2 * upgradeLevels[1] + 50 * upgradeLevels[2]}) Ashes Per Second`;

  for (let a = 0; a < listOfButtons.length; a++){
    checkAvailable(a, listOfButtons[a]);
  }
  

  requestAnimationFrame(globalUpdate);
}
requestAnimationFrame(globalUpdate);
