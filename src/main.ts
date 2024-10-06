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
