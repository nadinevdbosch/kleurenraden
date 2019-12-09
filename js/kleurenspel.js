/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/

/*eslint-env browser*/

/*eslint 'no-console': 0*/

var code        = []; // bevat te raden kleurencode
var beurt       = []; // bevat ingevoerde kleurencode
var kleurKnop   = document.querySelectorAll('.optie');
var raden       = document.querySelectorAll('.raden');
var codePin     = document.querySelectorAll('.geheim');
var vraagTeken  = document.querySelectorAll('.vraagTeken');
var kleurPin    = ['pinblauw','pingroen','pinoranje','pinrood','pinroze']; //classnamen voor rondjes
var beurtTeller;
var resetRaden;

document.querySelector('#nieuwSpel').addEventListener('click',nieuwSpel);
document.querySelector('#verwijder').addEventListener('click',verwijderKleur);

//Spel starten    
function startSpel() {
    
    //reset zichtbaarheid sections
    document.querySelector('#raadDeCode').className = '';  
    document.querySelector('#hoera').className      = 'hidden';
    document.querySelector('#jammer').className     = 'hidden'; 

    //reset koptekst
    document.querySelector('#kopTekst').innerText= "Kan jij de kleurencode raden?" ;

    beurtTeller = 0;
    
    genereerCode();
      
    //koppel alle eventlisteners
    for (var i = 0; i < kleurKnop.length; i++) {
        
      kleurKnop[i].addEventListener('click', pogingDoen);
    }
      
}
  
//  De kleurencode genereren
function genereerCode() { 
    var nieuweKleur;
    var i;

    for (i = 0; i < codePin.length; i++)
    {
      nieuweKleur = Math.floor(Math.random() * 5);

      if(code.includes(nieuweKleur)) // kijk of de nieuwe kleur al in de array zit
    //bron: https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
      {
        nieuweKleur = Math.floor(Math.random() * 5);
          
        while(code.includes(nieuweKleur)) //herhaal tot nieuwe kleur niet voorkomt in code Array
        {
          nieuweKleur = Math.floor(Math.random() * 5);
        }
      } 
      
      //zet de nieuwe kleur in de array
      code[i] = nieuweKleur;
    }         
}

    
  
// een poging doen om de kleur te raden
function pogingDoen() {
    var knop = this;
    //bron: https://stackoverflow.com/questions/4825295/javascript-onclick-to-get-the-id-of-the-clicked-button & https://medium.com/quick-code/understanding-the-this-keyword-in-javascript-cb76d4c7c5e8
    
    //maak de invoerrondjes leeg
    if(resetRaden){
        for (var i = 0; i < code.length; i++) {
            raden[i].className = 'raden';
        } 

      resetRaden = false;
    }
    
    //geef het invoerrondje de juiste kleur 
    raden[beurt.length].classList.add(knop.id); 

    //zet de valuewaarde van de aangeklikte knop achteraan in de beurt array
    beurt.push(knop.value);
    //Bron: https://alligator.io/js/push-pop-shift-unshift-array-methods/

    //ingevoerde kleuren is gelijk aan het aantal rondjes van de geheime code
    if (beurt.length === codePin.length) {
      if (controleerCode()) {
        toonSmiley('gewonnen');
      }
      else{
        beurtTeller +=1;
      }
    }      
    
    if ( beurtTeller == 4) {
      toonSmiley('verloren');
    }
  }

    
  function controleerCode() {
    var geraden = true;
    var i;

    // controleer de ingevoerde kleuren
    for (i = 0; i < code.length; i++) {
      
      if (beurt[i] == code[i]) {
          //toon kleur van de geraden pin en verwijder het "?"
          codePin[i].classList.add(kleurPin[code[i]]);
          vraagTeken[i].innerText = '';  
          
      } else {
          geraden = false;
      }
      
      //om aan te geven dat de invoerrondjes leeggemaakt moeten worden
      resetRaden = true; 
    }
    
    //Nieuwe beurt dus array leegmaken
    beurt = []; 
   
    return geraden;
  }
  

  function verwijderKleur() {
    if (beurt.length > 0) {
      raden[beurt.length - 1].className = 'raden'; //reset de class van het laatst gevulde rondje
//      beurt.pop(); //verwijder de wiste beurt uit de array
      //Bron: https://alligator.io/js/push-pop-shift-unshift-array-methods/

    }
  }

  function nieuwSpel () {
    code = [];  //geheime code leegmaken
    beurt = []; //beurt array leegmaken
    wisAlles(); 
    startSpel(); //Start het spel opnieuw
  }

  function wisAlles () {
    var i;

    // Maak beurt leeg
    for (i = 0; i < codePin.length; i++) {
        raden[i].className = 'raden';
    }

    // Reset code veld
    for (i = 0; i < codePin.length; i++) {
      codePin[i].className = 'geheim';
      vraagTeken[i].innerText = '?';
    }
  }


  function toonKleurenCode() {
    for (var i = 0; i < codePin.length; i++) {
      codePin[i].classList.add(kleurPin[code[i]]);
      vraagTeken[i].innerText = '';  //verwijder vraagteken 

    }
  }

  function gameOver () {
    for (var i = 0; i < kleurKnop.length; i++) {
      kleurKnop[i].removeEventListener('click', pogingDoen);
    }
      
    toonKleurenCode();
          
  }

  function toonSmiley(resultaat) {
    
    document.querySelector('#raadDeCode').className = 'hidden';  
      
    if(resultaat == 'gewonnen'){
        document.querySelector('#kopTekst').innerText = 'Hoera je hebt gewonnen!';
        document.querySelector('#hoera').className = 'resultaat'; 
    }  
    else {
        document.querySelector('#kopTekst').innerText= 'Helaas .... je hebt verloren.'; 
        document.querySelector('#jammer').className = 'resultaat'; 
    }
      
    gameOver();
  }

  
  

startSpel(); // Start het spel


//bronnen

    




              