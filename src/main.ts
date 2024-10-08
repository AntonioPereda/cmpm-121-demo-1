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
const cookieIncrease = 1;
button.onclick = () => {
  clicks++;
  button.innerHTML = `(${clicks | 0}) Clicks`;
  //requestAnimationFrame(incrementCount);
};
app.append(button);


let lastTick = 0;
let amount = cookieIncrease;
function incrementCount(FR: number): void {
  const dFR = (FR - lastTick) / 1000;
  lastTick = FR;

  amount = cookieIncrease * dFR;
  clicks = clicks + amount;
  requestAnimationFrame(incrementCount);
}

requestAnimationFrame(incrementCount);


