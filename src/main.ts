import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Antonio's 'Original' Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "🔥";

let clicks = 0;
button.onclick = () => {
  clicks++;
  button.innerHTML = `(${clicks}) Clicks`;
};
app.append(button);
/*
let delay = 1000;
setInterval(cGrowth, delay);
*/

/*
let lastTick = 0;
let amount = 1;
function incrementCount(FR: int): void {
  const dFR = (FR - lastTick) / 1000;
  lastTick = FR;

  amount = amount * dFR;
  clicks = clicks + amount;
  requestAnimationFrame(incrementCount);
}

incrementCount(0);
console.log(amount);
*/
