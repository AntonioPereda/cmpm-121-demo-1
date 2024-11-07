import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

//SETUP
const gameName = "Fan The Flames";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
header.style.fontFamily = "Copperplate, Fantasy";
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
let multiplier = 1;
theGameButton.onclick = () => {
  //INCREASE CLICKS ON BUTTON CLICK
  clicks++;
};
app.append(theGameButton);


function shakeButton(button: HTMLElement) {
  let shakeCount = 0;

  const shakeInterval = setInterval(() => {
      if (shakeCount < 10) { // shake 10 times
          const offset = shakeCount % 2 === 0 ? 5 : -5; // alternate left and right
          button.style.transform = `translateX(${offset}px)`;
          shakeCount++;
      } else {
          clearInterval(shakeInterval);
          button.style.transform = 'translateX(0px)'; // reset position
      }
  }, 50); // adjust speed as needed
}

theGameButton.addEventListener('click', () => {
  shakeButton(theGameButton as HTMLElement);
});


//MAKING ITEMSHOP
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
    lvl: 0,
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
    lvl: 0,
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
    lvl: 0,
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
    lvl: 0,
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
    lvl: 0,
  },
];

function getItemLvl(id: number): number {
  return itemShop[id].lvl;
}
//!!!CREATING BUTTONS VIA DDD!!!//
const listOfButtons: HTMLButtonElement[] = [];
for (let id = 0; id <= itemShop.length - 1; id++) {
  const button = document.createElement("button");
  if (getItemLvl(id) == 0) {
    if (id == 2 || id == 1) {
      button.innerHTML = `Get ${itemShop[id].name} For: ${itemShop[id].cost | 0}  Ashes`;
    } else if (id == 4) {
      button.innerHTML = `Hold ${itemShop[id].name} Hostage For: ${itemShop[id].cost | 0}  Ashes`;
    } else {
      button.innerHTML = `Get a ${itemShop[id].name} For: ${itemShop[id].cost | 0}  Ashes`;
    }
  }

  button.onclick = () => {
    clickIncrease += itemShop[id].rate;
    multiplier += itemShop[id].multrate;
    clicks -= itemShop[id].cost;
    itemShop[id].lvl++;
    itemShop[id].cost *= 1.15;
    button.innerHTML = `${itemShop[id].cost | 0} | ${itemShop[id].lvl} ${itemShop[id].name}`;
  };

  button.style.position = "absolute";
  button.style.left = itemShop[id].left;
  button.style.top = itemShop[id].top;
  document.body.appendChild(button);
  listOfButtons.push(button);

  //HOVER SHOWS BONUS DETAILS
  button.addEventListener("mouseenter", function () {
    const bonusText = document.createElement("p");
    bonusText.style.left = itemShop[id].hoverLeft;
    bonusText.style.top = itemShop[id].hoverTop;
    bonusText.innerHTML = itemShop[id].desc;
    bonusText.style.fontFamily = "Courier New, Monospace";
    bonusText.style.position = "absolute";
    app.append(bonusText);
    button.addEventListener("mouseleave", function () {
      bonusText.innerHTML = ""; //DISSAPEAR WHEN NO LONGER HOVERING
      bonusText.style.left = "30000px";
    });
  });

  if (clicks < itemShop[id].cost) {
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
const clicksPerSecond = document.createElement("p");
clicksPerSecond.style.position = "absolute";
clicksPerSecond.innerHTML = "im shocked if you manage to see this in-game";
clicksPerSecond.style.left = "975px";
clicksPerSecond.style.top = "130px";
clicksPerSecond.style.fontSize = "15px";
app.append(clicksPerSecond);

//IF AUTOCLICK UPGRADE IS AVAILABLE
//HELPER FUNCTION

function checkAvailable(a: number, button: HTMLButtonElement) {
  if (clicks < itemShop[a].cost) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

function isMultiplierDefault(): boolean {
  return multiplier === 1;
}

//GLOBAL HELPERS
let lastTick = 0;
let amount = clickIncrease;
function checkButtons(): void {
  listOfButtons.forEach((button, index) => {
    checkAvailable(index, button);
  });
}
function calculateFrames(FR: number): number {
  const dFR = (FR - lastTick) / 1000;
  lastTick = FR;
  return dFR;
}
function updateClicks(dFR: number): void {
  amount = clickIncrease * multiplier * dFR;
  clicks += amount;
}

//GLOBAL UPDATE
let shakeTrack = 0;
function globalUpdate(frameRate: number): void {
  const deltaFrameRate = calculateFrames(frameRate);
  updateClicks(deltaFrameRate);


  displayClicks.innerHTML = `(${clicks | 0}) Ashes`;

  let totalclicksPerSecond = 0;
  shakeTrack+= (clickIncrease * multiplier * deltaFrameRate);
  if (shakeTrack > 10){
    shakeButton(theGameButton as HTMLElement);
    shakeTrack = 0;
  }

  for (let c = 0; c < itemShop.length; c++) {
    totalclicksPerSecond += itemShop[c].lvl * itemShop[c].rate;
  }

  if (isMultiplierDefault()) {
    clicksPerSecond.innerHTML = `${totalclicksPerSecond} Ashes Per Second`;
  } else {
    clicksPerSecond.innerHTML = `${totalclicksPerSecond}(X ${multiplier}) Ashes Per Second`;
  }

  checkButtons();

  requestAnimationFrame(globalUpdate);
}

requestAnimationFrame(globalUpdate);
