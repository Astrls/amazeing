import { LEVEL_1, LEVEL_2, LEVEL_3 } from "./levels.js";

document.body.style.padding = "0px";
document.body.style.margin = "0px";
document.body.style.boxSizing = "border-box";
document.body.style.width = "100vw"
document.body.style.height = "100vh"
document.body.style.display = "flex"
document.body.style.alignItems = "center"
document.body.style.justifyContent = "center"
document.body.style.backgroundColor = "#dbd9d9"

let main = document.querySelector("main");

//Function to create Container
const createMazeContainer = (level) => {
  let mazeContainer = document.createElement("div");
  mazeContainer.className = "maze-container";
  main.append(mazeContainer);
  mazeContainer.style.backgroundImage = 'url("assets/grass_pattern.jpg")';
  mazeContainer.style.backgroundSize = "cover";
  mazeContainer.style.display = "grid";
  mazeContainer.style.maxWidth = `${level[0].length*55}px`
  mazeContainer.style.gridTemplateRows = `repeat(${level.length}, 1fr)`;
  mazeContainer.style.gridTemplateColumns = `repeat(${level[0].length}, 1fr)`;
};


const createLevel = (level) => {
  for (let i = 0; i < level.length; i++) {
    level[i].forEach((elem) => {
      if (elem === "*") {
        let asset = document.createElement("div");
        selMazeContainer.append(asset);
        asset.classList.add("hedge");
        asset.classList.add(i);
        asset.style.width = "50px";
        asset.style.height = "60px";
        asset.style.margin = "1px";
      } else if (elem === ".") {
        let asset = document.createElement("div");
        selMazeContainer.append(asset);
        asset.classList.add("path");
        asset.classList.add(i);
        asset.style.width = "50px";
        asset.style.height = "50px";
        asset.style.margin = "1px";
      } else if (elem === "S") {
        let asset = document.createElement("div");
        asset.classList.add("start");
        asset.classList.add("link");
        asset.classList.add(i);
        selMazeContainer.append(asset);
        asset.style.width = "50px";
        asset.style.height = "50px";
        asset.style.margin = "1px";
      } else if (elem === "T") {
        let asset = document.createElement("div");
        asset.classList.add("treasure");
        asset.classList.add(i);
        selMazeContainer.append(asset);
        asset.style.width = "50px";
        asset.style.height = "50px";
        asset.style.margin = "1px";
      }
    });
  }
};

//Create the level and maze
createMazeContainer(LEVEL_2);
let selMazeContainer = document.querySelector(".maze-container");
createLevel(LEVEL_2);

//Get index of the div where Link is positioned
const getLinkPos = () => {
  const allElements = Array.from(selMazeContainer.querySelectorAll("div"));
  const allSquares = [];
  allElements.forEach((elem) => {
    allSquares.push(elem.outerHTML);
  });
  let linkPos = allSquares.findIndex((e) => e.includes("link")) + 1;
  return linkPos;
};

// moving through the maze
const letsGetMovin = (nextlevel) =>{
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") {
    let player = document.querySelector(".link");
    if (
      player.nextSibling.classList.contains("path") ||
      player.nextSibling.classList.contains("start")
    ) {
      player.nextSibling.classList.add("link");
      player.classList.remove("link");
    } else if (player.nextSibling.classList.contains("treasure")) {
      player.nextSibling.classList.add("link");
      player.classList.remove("link");
      window.open(`${nextlevel}`, '_blank');
    } else {
      player.style.animation = "shake 0.5s";
    }
  }
  if (e.key === "ArrowLeft") {
    let player = document.querySelector(".link");
    if (
      player.previousSibling.classList.contains("path") ||
      player.previousSibling.classList.contains("start")
    ) {
      player.previousSibling.classList.add("link");
      player.classList.remove("link");
    } else if (player.previousSibling.classList.contains("treasure")) {
      player.previousSibling.classList.add("link");
      player.classList.remove("link");
      window.open(`${nextlevel}`, '_blank');
    } else {
      player.style.animation = "shake 0.5s";
    }
  }

  if (e.key === "ArrowDown") {
    let player = document.querySelector(".link");
    let nextPos = document.querySelector(
      `.maze-container :nth-child(${getLinkPos() + LEVEL_2[0].length})`
    );
    console.log(nextPos);
    if (
      nextPos.classList.contains("path") ||
      nextPos.classList.contains("start")
    ) {
      nextPos.classList.add("link");
      player.classList.remove("link");
    } else if (nextPos.classList.contains("treasure")) {
      nextPos.classList.add("link");
      player.classList.remove("link");
      window.open(`${nextlevel}`, '_blank');
    } else {
      player.style.animation = "shake 0.5s";
    }
  }
  if (e.key === "ArrowUp") {
    let player = document.querySelector(".link");
    let nextPos = document.querySelector(
      `.maze-container :nth-child(${getLinkPos() - LEVEL_2[0].length})`
    );
    console.log(nextPos);
    if (
      nextPos.classList.contains("path") ||
      nextPos.classList.contains("start")
    ) {
      nextPos.classList.add("link");
      player.classList.remove("link");
    } else if (nextPos.classList.contains("treasure")) {
      nextPos.classList.add("link");
      player.classList.remove("link");
      window.open(`${nextlevel}`, '_blank');
    } else {
      player.style.animation = "shake 0.5s";
    }
  }
  if (e.code === "Space") {
    let player = document.querySelector(".link");
    let nextPos = document.querySelector(".start");
    player.classList.remove("link")
    nextPos.classList.add("link")
  }
});
}

letsGetMovin(`maze3.html`)

