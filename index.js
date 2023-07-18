const canvas = document.createElement("canvas");
document.querySelector(".myGame").appendChild(canvas);
console.log("vigkghj");
canvas.width = innerWidth;
canvas.height = innerHeight;
const context = canvas.getContext('2d');


let difficulty = 2;
const form = document.querySelector("form");
const scoreBoard = document.querySelector(".scoreBoard");
let PlayerScore=0;

document.querySelector("input").addEventListener("click", (e) => {
  e.preventDefault();

  form.style.display = "none";
  scoreBoard.style.display = "block";

  const userValue = document.getElementById("difficulty").value;

  if (userValue === "Easy") {

    setInterval(spawnEnemy, 2000);
    return (difficulty = 2);

  }
  if (userValue === "Medium") {
    setInterval(spawnEnemy, 1400);
    return (difficulty = 3);

  }
  if (userValue === "Hard") {
    setInterval(spawnEnemy, 1000);
    return (difficulty = 4);
  }
  if (userValue === "Insane") {
    setInterval(spawnEnemy, 700);
    return (difficulty = 5);
  }

})



// Endscreen
const gameoverLoader = () => {
  // Creating endscreen div and play again button and high score element
  const gameOverBanner = document.createElement("div");
  const gameOverBtn = document.createElement("button");
  const highScore = document.createElement("div");

  highScore.innerHTML = `High Score : ${
    localStorage.getItem("highScore")
      ? localStorage.getItem("highScore")
      : PlayerScore
  }`;

  const oldHighScore =
    localStorage.getItem("highScore") && localStorage.getItem("highScore");

  if (oldHighScore < PlayerScore) {
    localStorage.setItem("highScore", PlayerScore);

    // updating high score html
    highScore.innerHTML = `High Score: ${PlayerScore}`;
  }

  // adding text to playagain button
  gameOverBtn.innerText = "Play Again";

  gameOverBanner.appendChild(highScore);

  gameOverBanner.appendChild(gameOverBtn);

  // Making reload on clicking playAgain button
  gameOverBtn.onclick = () => {
    window.location.reload();
  };

  gameOverBanner.classList.add("gameover");

  document.querySelector("body").appendChild(gameOverBanner);
};

//-----------------------------------
playerposition = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

  }

  draw() {
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false

    );

    context.fillStyle = this.color;
    context.fill();
  }


}

// ----------------------------

class Weapon {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;

  }

  draw() {
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false

    );

    context.fillStyle = this.color;
    context.fill();
  }
  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

}


//-------------------------

class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;

  }

  draw() {
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false

    );

    context.fillStyle = this.color;
    context.fill();
  }
  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

}



class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha=1;
  }

  draw() {
    context.save();
    context.globalAlpha=this.alpha;
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false

    );

    context.fillStyle = this.color;
    context.fill();
    context.restore();
  }
  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha-=0.01;
  }

}



//--------------------------

let person = prompt("Please enter your name", "Harry Potter");

if (person != null) {

  document.getElementById("intro").innerHTML =
    "Hello " + person + " Please Select your level and get ready to play";
}

const vik = new Player(
  playerposition.x, playerposition.y, 15,
  'white');



const weapons = [];
const enemies = [];
const particles=[];

const spawnEnemy = () => {
  const enemySize = Math.random() * (40 - 5) + 5;

  const enemyColor = `hsl(${Math.floor(Math.random() * 360)},100%,50%)`;
  let random;
  if (Math.random() < 0.5) {
    random = {
      x: Math.random() < 0.5 ? canvas.width + enemySize : 0 - enemySize,
      y: Math.random() * canvas.height,
    };
  } else {
    random = {
      y: Math.random() < 0.5 ? canvas.height + enemySize : 0 - enemySize,
      x: Math.random() * canvas.width,
    };
  }

  const myAngle = Math.atan2((canvas.height / 2) - random.y, (canvas.width / 2) - random.x);
  const velocity = {
    x: Math.cos(myAngle) * difficulty,
    y: Math.sin(myAngle) * difficulty,
  };

  enemies.push(new Enemy(random.x, random.y, enemySize, enemyColor, velocity));
}

let animationId;
let factorx;
let factory;


function animation( ) {
  
  context.fillStyle = "rgba(49, 49, 49,0.2)";

  context.fillRect(0, 0, canvas.width, canvas.height);
  vik.draw();

 particles.forEach((particle,particleIndex)=>{
   if(particle.alpha<=0){
    particles.splice(particleIndex,1);
   }
    particle.update();
 })
 

  weapons.forEach((weapon,weaponIndex) => {
    
    weapon.update();
    if(
      weapon.x + weapon.radius<1 ||
      weapon.y + weapon.radius<1 ||
      weapon.x - weapon.radius>canvas.width ||
      weapon.y - weapon.radius>canvas.height
    ){
      weapons.splice(weaponIndex,1);
    }
  });

  enemies.forEach((enemy, enemyIndex) => {
    
    enemy.update();

    const distanceBetweenPlayerAndEnemy=Math.hypot(
      vik.x-enemy.x,
      vik.y-enemy.y
    );
    if (distanceBetweenPlayerAndEnemy - vik.radius - enemy.radius < 1) {
      cancelAnimationFrame(animationId);
     
      return gameoverLoader();
      
    }
    weapons.forEach((weapon, weaponIndex) => {
      const distanceBetWeaponAndEnemy = Math.hypot(
        weapon.x - enemy.x,
        weapon.y - enemy.y
      );
       if (distanceBetWeaponAndEnemy - weapon.radius - enemy.radius < 1) {
        if(weapon.x>canvas.width/2){
           factorx=-1;
        }else{
          factorx=1;
        }
        if(weapon.y>canvas.height/2){
          factory=-1;
        }else{
          factory=1;
        }
          if(enemy.radius>25){
              gsap.to(enemy,{
                radius: enemy.radius-15
              })
              setTimeout(()=>{
                
                weapons.splice(weaponIndex,1);
              },0)
          }else{
            
            for(let i=0;i<enemy.radius*5;i++){
              particles.push(new Particle(weapon.x,weapon.y,Math.random() * 2,enemy.color,{
                x:Math.random()-(0.5*Math.random()*5*factorx),
                y:Math.random()-(0.5*Math.random()*5*factory),
              }))
            }
            setTimeout(()=>{
              enemies.splice(enemyIndex,1);
              weapons.splice(weaponIndex,1);
            },0)
            PlayerScore+=10;
            scoreBoard.innerHTML=`Score : ${PlayerScore}`;
          }
        
      }

    })
  })

  //-------------

  animationId=requestAnimationFrame(animation);
  
}



canvas.addEventListener("click", (e) => {
  const myAngle = Math.atan2(e.clientY - canvas.height / 2, e.clientX - canvas.width / 2);
  const velocity = {
    x: Math.cos(myAngle) * 6,
    y: Math.sin(myAngle) * 6,
  };

  weapons.push(
    new Weapon(
      canvas.width / 2,
      canvas.height / 2,
      5,
      "white",
      velocity
    )

  )
}
)

animation();

