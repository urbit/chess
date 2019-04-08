import { api } from '/api';
import { warehouse } from '/warehouse';
import { router } from '/router';
import { operator } from "/operator";

function createGame(shp) {
  window.urb.poke(window.ship, "chess", "chess-command",
    {
      new: {
        shp: shp,
        gid: Math.trunc(new Date().getTime() / 1000),
        ori: Math.random() > 0.5 ? 'white' : 'black'
      }
    },
    (succ) => {
      console.log(succ);
    },
    (fail) => {
      console.log(fail);
    }
  );

}

let createBtn = document.getElementById("createNew");
createBtn.addEventListener("click", () => {
  let shpName = document.getElementById("shipName");
  createGame(shpName.value);
  shpName.value
});

function makeA(shp, da) {
  let newA = document.createElement("a", {});
  newA.href = "/~chess/" + shp + "/" + da;
  newA.innerText = shp + " - " + da;
  newA.style = "display:block";
  return newA;
}
function doSubList() {
  window.urb.subscribe(window.ship, "chess", "/list",
    (err) => {
      console.log(err);
    },
    (event) => {
      root.innerHTML = "";
      for (let i = 0; i < event.games.length; i++) {
        for (let j = 0 ; j < event.games[i].dates.length; j++) {
          root.appendChild(makeA(event.games[i].ship, event.games[i].dates[j]));
        }
      }
    },
    () => {
      doSubList();
    }
  );
}
doSubList();

api.setAuthTokens({
  ship: window.ship
});

router.start();
operator.start();
