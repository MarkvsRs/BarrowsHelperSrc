//alt1 base libs, provides all the commonly used methods for image matching and capture
//also gives your editor info about the window.alt1 api
import * as a1lib from "@alt1/base";
import { ImgRef } from "@alt1/base";
//import { lookup } from "dns";
import { stringify } from "querystring";
import   * as resemble from "resemblejs";
import { ChainedSet } from "webpack-chain";

import * as Chatbox from "@alt1/chatbox";
import { maxHeaderSize } from "http";

import * as $ from "./jquery";

//tell webpack to add index.html and appconfig.json to output

require("!file-loader?name=[name].[ext]!./index.html");
require("!file-loader?name=[name].[ext]!./appconfig.json");
var img
var imgdoor
var brocount = 0
var toKill  = 8
var refreshrate = 100
var storedrefreshrate = 100
var interval 
var justleft = 0 
var tunnelglbl
var tunnelglbl2
var tunnelglbl3 = "None"
var tunnelglbl4
var regex = "([^\/]+$)"
var regex2 = "^.*(?=(Deselect))"
var regex3 = "^.*(?=(\.PNG))"
var pageload = 0
var BarrowsKC = 0
const appColor = a1lib.mixColor(0, 255, 0);
var droprate = 0
var Linzakill = 0

//Chat reader stuff
let reader = new Chatbox.default();
reader.readargs = {
  colors: [
    a1lib.mixColor(255, 255, 255), //white text
]
};

function showSelectedChat(chat) {
	//Attempt to show a temporary rectangle around the chatbox.  skip if overlay is not enabled.
	try {
	  alt1.overLayRect(
		appColor,
		chat.mainbox.rect.x,
		chat.mainbox.rect.y,
		chat.mainbox.rect.width,
		chat.mainbox.rect.height,
		2000,
		5
	  );
	} catch { }
  }

    
declare global {
    interface Navigator {
        msSaveBlob?: (blob: any, defaultName?: string) => boolean
    }
}

if (navigator.msSaveBlob) {
    // use navigator.msSaveBlob
}

//Find all visible chatboxes on screen
let findChat = setInterval(function () {
  if (reader.pos === null)
    reader.find();
  else {
    clearInterval(findChat);
    reader.pos.boxes.map((box, i) => {
      $(".chat").append(`<option value=${i}>Chat ${i}</option>`);
    });

    if (localStorage.ccChat) {
      reader.pos.mainbox = reader.pos.boxes[localStorage.ccChat];
    } else {
      //If multiple boxes are found, this will select the first, which should be the top-most chat box on the screen.
      reader.pos.mainbox = reader.pos.boxes[0];
    }
    showSelectedChat(reader.pos);
    setInterval(function () {
      readChatbox();
    }, 600);
  }
}, 1000);
  
function readChatbox() {
	var opts = reader.read() || [];
	var chat = "";
  
	console.log("opts")
	console.log(opts)
	for (const a in opts) {
	  chat += opts[a].text + " ";
	}  
	
	console.log("chat")
	console.log(chat)
	console.log("comps")
	console.log(comps)
	  var comps = chat.match(
		"The chest is now empty"
		);
		//add 1 to kc and localstorage for kc. 
		if (comps != null)
		{
			
	console.log("notNull")
	console.log(comps[1])
		  if (comps[1] = "The chest is now empty") {
			BarrowsKC ++
			
	console.log("++")
 			localStorage.setItem("barrowsKC",JSON.stringify(BarrowsKC));

			 

		  }
		}
	}
   


//loads all images as raw pixel data async, images have to be saved as *.data.PNG
//this also takes care of metadata headers in the image that make browser load the image
//with slightly wrong colors
//this function is async, so you cant acccess the images instantly but generally takes <20ms
//use `await imgs.promise` if you want to use the images as soon as they are loaded
var puzzleimgsSq = a1lib.ImageDetect.webpackImages(
	{	
	SqM: require("./Puzzles/SquareMiddle.data.PNG")
	}
);
var puzzleimgsCoTo = a1lib.ImageDetect.webpackImages(
	{	
	CoM: require("./Puzzles/CornMiddle.data.PNG"),
	ToM: require("./Puzzles/TopMiddle.data.PNG")
	}
);
var puzzleimgsCT = a1lib.ImageDetect.webpackImages(
	{	
	
	CTM: require("./Puzzles/CirTriMiddle.data.PNG")
	}
);


var doorimg = a1lib.ImageDetect.webpackImages(
	{
	door: require("./Misc/DoorLock.data.PNG")
	}
);

var chestimg = a1lib.ImageDetect.webpackImages(
	{
	chest: require("./Misc/Chest.data.PNG")
	}
);

var slainimg = a1lib.ImageDetect.webpackImages(
	{
		slain: require("./Misc/Slain.data.PNG")
	}
);

var brotherimgs = a1lib.ImageDetect.webpackImages(
	{
	Ahrim: require("./Brothers/Ahrim.data.PNG"),
	Dharok: require("./Brothers/Dharok.data.PNG"),
	Guthan: require("./Brothers/Guthan.data.PNG"),
	Karil: require("./Brothers/Karil.data.PNG"),
	Torag: require("./Brothers/Torag.data.PNG"),
	Verac: require("./Brothers/Verac.data.PNG"),	
	Akrisae: require("./Brothers/Akrisae.data.PNG"),
	Linza: require("./Brothers/Linza.data.PNG")
	}

);
var fullbrotherList = 	{
	Ahrim: 'Ahrim',
	Dharok:	'Dharok',
	Guthan: 'Guthan',
	Karil:	'Karil',
	Torag: 	'Torag',
	Verac: 	'Verac',
	Akrisae:'Akrisae',
	Linza: 	'Linza'
	}
;
var brotherList = 	{
	Ahrim: 'Ahrim',
	Dharok:	'Dharok',
	Guthan: 'Guthan',
	Karil:	'Karil',
	Torag: 	'Torag',
	Verac: 	'Verac',
	Akrisae:'Akrisae',
	Linza: 	'Linza'
	}
;

var brotherListselect = {
	Ahrim: 'Ahrim',
	Dharok:	'Dharok',
	Guthan: 'Guthan',
	Karil:	'Karil',
	Torag: 	'Torag',
	Verac: 	'Verac',
	Akrisae:'Akrisae',
	Linza: 	'Linza'
	}


var brotherListnonselect = {}

function ObjectLength( object ) {
	var length = 0;
	for( var key in object ) {
		if( object.hasOwnProperty(key) ) {
			++length;
		}
	}
	return length;
};

//only called when brother is selected.deselected.
export function changesettings(toggle) {
	if (toggle.src.match("Deselect"))
	{
		//when a brother is selected
		//add to brother list
		brotherListselect[toggle.id] = [toggle.id];

		//remove from ignore list
		delete brotherListnonselect[toggle.id]; 

		toKill = ObjectLength(brotherListselect)

		//Set the localobjects for subsequent plugin loads
		localStorage.setItem("LocalStorageBrotherSelectList", JSON.stringify(brotherListselect));
		localStorage.setItem("LocalStorageBrotherNonSelectList", JSON.stringify(brotherListnonselect));
		

		
	}
	else {	
		//remove relevant brother from list
		delete brotherListselect[toggle.id]; 
		//add relevant brother to ignore list
		brotherListnonselect[toggle.id] = [toggle.id];

		toKill = ObjectLength(brotherListselect)
		
		//Set the localobjects for subsequent plugin loads
		localStorage.setItem("LocalStorageBrotherSelectList", JSON.stringify(brotherListselect));
		localStorage.setItem("LocalStorageBrotherNonSelectList", JSON.stringify(brotherListnonselect));
	}	
	return;	
};

export function changerefresh(refresh) {
	
    localStorage.setItem("Localstoragerefreshrate", refresh.value);
	storedrefreshrate = parseInt(localStorage.Localstoragerefreshrate);
	//storedrefreshrate = refresh.value
	if (refreshrate != storedrefreshrate)
	{refreshrate = storedrefreshrate
	 
	clearInterval(interval)
	start()
	}
	return;

};

export function changeKC(KC) {
   
	localStorage.setItem("barrowsKC",KC.value);
	
	BarrowsKC = parseInt(localStorage.barrowsKC);
	
	start()
	
	return;
};

export function TunnelSelect(tunnel)
{
	//If the image was a dead one
	if (tunnel.src.match("Deselect"))
	{
		tunnelglbl = tunnel.src.match(regex)
		tunnelglbl2  = tunnelglbl[0].match(regex3)
		tunnelglbl4  = tunnelglbl2[0].match(regex2)
		tunnelglbl3 = tunnelglbl4[0] //just the brother name
		localStorage.setItem("LocalStorageTunnel",tunnelglbl3);
	}
	else if (tunnel.src.match("Tunnel"))
	{
		tunnelglbl3 = "None"
		localStorage.setItem("LocalStorageTunnel",tunnelglbl3);
	}
	//If the image was an alive one
	else
	{
		tunnelglbl = tunnel.src.match(regex)
		tunnelglbl2  = tunnelglbl[0].match(regex3)
		tunnelglbl3 = tunnelglbl2[0] //just the brother name}
		
		localStorage.setItem("LocalStorageTunnel",tunnelglbl3);
	}
	return;
}
//Webpage calls this function here.
export function start() {
	
	//only run the once, and only if the storage isnt empty, otherwise stick with default
	if (pageload == 0 )
	{
		if (localStorage.getItem("Localstoragerefreshrate") !== null) //only change if the user has set a refresh rate
		{
			//Reads from stroage refresh rate, update it to be refresh rate.
			storedrefreshrate = parseInt(localStorage.Localstoragerefreshrate);
			(document.getElementById('refreshratehtml')as HTMLInputElement).value = String(storedrefreshrate);
			refreshrate = storedrefreshrate
		}
		


		//KC counter
		if (localStorage.getItem("barrowsKC") !== null )
		{
			BarrowsKC = parseInt(localStorage.barrowsKC);
			(document.getElementById('KCchange')as HTMLInputElement).value = String(BarrowsKC);
		}
		//set conter to be current value in settings.
		

		//need to sort brother lists, and set red images in here.

		if (localStorage.getItem("LocalStorageBrotherNonSelectList") !== null)
		{
			
			brotherListnonselect = JSON.parse(localStorage.getItem("LocalStorageBrotherNonSelectList"))
	

			for (const [key2] of Object.entries(brotherListnonselect)) 
			{
				if (!key2.includes(tunnelglbl3)) //dont overwirte selected tunnel if player has selected it
				{
					(document.getElementById(`${key2}HTMLimg`) as HTMLImageElement).src = `./TooltipHeads/${key2}Deselect.PNG` ;
					(document.getElementById(`${key2}`) as HTMLImageElement).src = `./TooltipHeads/${key2}Deselect.PNG` ;
				}
			}
		}
		
		//Setup brotherListSelect with stored info
		if (localStorage.getItem("LocalStorageBrotherSelectList") !== null)
		{
			brotherListselect = JSON.parse(localStorage.getItem("LocalStorageBrotherSelectList"));
		}
		if (localStorage.getItem("LocalStorageTunnel") !== null  && localStorage.getItem("LocalStorageTunnel") != "None")
		{
			tunnelglbl3 = localStorage.getItem("LocalStorageTunnel");
			(document.getElementById(`${tunnelglbl3}HTMLimg`) as HTMLImageElement).src = `./TooltipHeads/${tunnelglbl3}HTMLimgTunnel.PNG` ;
		}

		toKill = ObjectLength(brotherListselect)
		pageload = 1
	}


	//Set effective refresh rate
    interval = setInterval(tick,refreshrate); 



	//go to tick method and loop away!
	tick(); 
}

function tick() {
   	//grab the rs window capture
	   
	img = a1lib.captureHoldFullRs();
	//run at barrows check/reset brother list. 
	atbarrows(img);
	
	chest(img);
}


function atbarrows(img: ImgRef){

	
	//Display current KC
	var text = document.getElementById(`Status`).textContent = "Barrows KC: " +JSON.stringify(BarrowsKC)  +  " --- Linza Piece Rate: 1/" + Linzakill + " \tCurrent droprate for this chest: 1/" + droprate;

	//Check Brothers slain list header
	for (const [key] of Object.entries(slainimg)) {
		var loc = img.findSubimage(slainimg[key]);
	
		if (loc.length == 0){
			//change status in alt1 browser to "Not at barrows"
			document.getElementById('Status').textContent =  "Not at barrows";
				//reset brother list.
				var newObject = JSON.stringify(fullbrotherList);
				brotherList = JSON.parse(newObject);

				//brotherList = fullbrotherList
				//reset brocount (used so that the count doesn't go out of control after each run/tele out)	
				brocount = 0;


				//whilst not at barrows shove the refresh rate down a tonne to save on cpu and idel players
				if (refreshrate < 5000)
				{
					refreshrate = 5000
					justleft = 1
					clearInterval(interval)
					start()
					return;
				}

				for (const [key] of Object.entries(brotherimgs)) {						
					//blank out brother images
					if (!key.includes(tunnelglbl3)) //dont overwirte selected tunnel if player has selected it
					{
						(document.getElementById(`${key}HTMLimg`) as HTMLImageElement).src = `./TooltipHeads/${key}Dead.PNG`
					}
				}
		}
		if (loc.length != 0){

			//whilst just returning to barrows restore the refresh rate to custom
			if (justleft == 1 && refreshrate == 5000)
				{
					refreshrate = storedrefreshrate
					justleft = 0
					clearInterval(interval)
					start()
					return;
				}

			//run brother finder
			findBrothers(img);
			
			//run puzzle
			doorLock(img);
			
			chest(img);



		}		
		
	}
	

	return;
}

function findBrothers(img: ImgRef) {
	
	//set this here so the count doesnt keep going up each loop round
	brocount = 0
	
	var brocountMinusLinza = brocount
	//var text = document.getElementById('debug').textContent = ` test: ${brocount}`;
	for (const [key] of Object.entries(brotherimgs)) {
		
		var broloc = img.findSubimage(brotherimgs[key]);
					
		if (broloc.length == 0){
			//Display coloured version of the brother image, as they are not dead yet
			if (!key.includes(tunnelglbl3)) //dont overwirte selected tunnel if player has selected it
				{
					(document.getElementById(`${key}HTMLimg`) as HTMLImageElement).src = `./TooltipHeads/${key}.PNG`
				}
		}	
	}
	//loop through Non dead bro's and overwirte iwth Red image if deselected	
	for (const [key] of Object.entries(brotherList)) 
	{
		for (const [key2] of Object.entries(brotherListnonselect)) {
			
			if (!key2.includes(tunnelglbl3)) //dont overwirte selected tunnel if player has selected it
				{
					(document.getElementById(`${key2}HTMLimg`) as HTMLImageElement).src = `./TooltipHeads/${key2}Deselect.PNG` 
				}
					
		}
	}
	//loop through Non dead bro's and overwrite with dead image if dead (even if deselected)
	for (const [key] of Object.entries(brotherimgs)) {
		
			var broloc = img.findSubimage(brotherimgs[key]);	
		//search for brother names in killcount list.
		if (broloc.length != 0) {
			//increase kill counter
			brocount += 1;
			//determine if linzais killed (for droprate stuff)
			if ( key.includes('Linza'))
					{
						brocountMinusLinza = 1
						Linzakill = 192
					}
					else {Linzakill = 0}
			if (!key.includes(tunnelglbl3)) //dont overwirte selected tunnel if player has selected it
				{
					//replace image with greyed out version if brother name found in list
					(document.getElementById(`${key}HTMLimg`) as HTMLImageElement).src = `./TooltipHeads/${key}Dead.PNG`
					
				}
			//remove relevant brother from brother list - used to display which brother is left when showing tunnel location
			delete brotherList[key];			
		} 
	}
	/*
	// Some debug shit I'm leaving in as I cba to rrewrite it when i inevitably need it again
	var text = document.getElementById('debug').textContent = ` test: tokill ${toKill}`
	
	var text = document.getElementById('spare').textContent = ` broselectlist ${Object.keys(brotherListselect)}`
	
	var text = document.getElementById('canvastest').textContent = ` non bro select list ${Object.keys(brotherListnonselect)}`
	
	var text = document.getElementById('canvastest2').textContent = ` brolist ${Object.keys(brotherList)}`
	
	var text = document.getElementById('spare').textContent = `${Object.keys(brotherList).filter((key) => !key.includes('Torag'))}`
	
	
	//display brothers killed/tomb location/go loot the chest

	if (brocount ==1)
	{
		var text = document.getElementById('Status').textContent = brocount +  " brothers slain, Keep going!";
	}
	if (brocount < toKill-1 && brocount != 1)
	{
		var text = document.getElementById('Status').textContent = brocount + " brothers slain, Keep going!";
	}

		if (brocount >= toKill-1 && toKill != 0)
		{
			if(ObjectLength(brotherList) == 1)
			{//only show tunnel if all 8 killed
				var text = document.getElementById('Status').textContent = brocount  +" brothers slain, enter the tunnel at " + Object.keys(brotherList)  +"'s tomb";
			}
			else
			{ 
				if(tunnelglbl3 == "None" ||tunnelglbl3 == undefined)
				{
					var text = document.getElementById('Status').textContent = brocount  +" brothers slain, so tunnel location unknown. Possibilities: " + Object.keys(brotherList).filter((key) => !key.includes('Linza'));
				}
				else{
					var text = document.getElementById('Status').textContent = brocount  +" brothers slain, when ready, enter the tunnel at " + tunnelglbl3  +"'s tomb";
				}
			}
		}
	
	

	if (brocount == 8)
	{
		var text = document.getElementById('Status').textContent = "All brothers have been slain, go and loot the chest.";
	}	
	
	return;
	*/
	
	if ((brocount-brocountMinusLinza) ==0)
	{
		droprate = 0
	}

	if ((brocount-brocountMinusLinza) >0)
	{
		droprate = Math.round(Math.max((450-(58*(brocount-brocountMinusLinza))),73) / (Math.min((1+(brocount-brocountMinusLinza)),7)) * 100) / 100
	}
	
}	


function doorLock(img:ImgRef){
	var Doorloc = img.findSubimage(doorimg.door);	
	//only run if door lock window is on screen, saves on performance
	if (window.alt1) {
		if (Doorloc.length != 0) {

			if (refreshrate != 50)
				{
					refreshrate = 50
					clearInterval(interval)
					start()
					return;
				}
			
					
			img = a1lib.captureHoldFullRs();
			getDiffCoTo(img) //remove when putting consisten check back in
			img = a1lib.captureHoldFullRs();
			getDiffSq(img) //remove when putting consisten check back in
			img = a1lib.captureHoldFullRs();
			getDiffCT(img) //remove when putting consisten check back in
			
		} 
		if(Doorloc.length ==0 && refreshrate == 50)
		{
			refreshrate = storedrefreshrate
					
					clearInterval(interval)
					start()
					return;
		}
	}
	
	
	return;
}

function getDiffCoTo(img:ImgRef){
	//finds door lock mech window from main image
	
	var Doorloc = img.findSubimage(doorimg.door);	

	//for every image in puzzleimages
	for (const [key] of Object.entries(puzzleimgsCoTo)) {
		
		
		//document.getElementById('canvastest').textContent = `${Doorloc.length}`
	//only run if door lock window is on screen, saves on performance
	if (window.alt1) {
		//if door lock found
			if (Doorloc.length != 0) {
				
				//recapture just door lock window			
				//pull back the relevant size of the barrows window (500X320 pixels)

				//acount for size diff with 3 funcs, 1 for each puzz except 4sq pieces
				
				imgdoor = a1lib.captureHold((Doorloc[0].x +46),(Doorloc[0].y +214), 397, 278 );   // top left corner coords / bottom left
				//convert that area to data
				var buf1 = imgdoor.toData((Doorloc[0].x +46),(Doorloc[0].y +214),63, 63); 
				
				var buf2 = imgdoor.toData((Doorloc[0].x +189),(Doorloc[0].y +214),63, 63); 
				
				var buf3 = imgdoor.toData((Doorloc[0].x +332),(Doorloc[0].y +214),63, 63); 
				//buf1.show()
				//buf2.show()
				//buf3.show()

				//Compare data stream of left puzzle location with image from object, Less than 10% mismatch results in success
				resemble(buf1)
				.compareTo(puzzleimgsCoTo[key])
				.ignoreColors()
				.ignoreAntialiasing()
				.onComplete(function (data) {				
					if (parseInt(data.misMatchPercentage) < 10 )
						{
						//display border
						alt1.overLayRect(a1lib.mixColor(0, 255, 0), (Doorloc[0].x +46),(Doorloc[0].y +214), (puzzleimgsCoTo[key]['width']+4), (puzzleimgsCoTo[key]['height']+4), 300, 3);
						}
					//compareimg(data)
				}	
				);
					
				//Compare data stream of middle puzzle location with image from object, Less than 10% mismatch results in success
				resemble(buf2)
				.compareTo(puzzleimgsCoTo[key])
				.ignoreColors()
				.ignoreAntialiasing()
				.onComplete(function (data) {
					if (parseInt(data.misMatchPercentage) < 10 )
						{
						//display border							
						alt1.overLayRect(a1lib.mixColor(0, 255, 0), (Doorloc[0].x +189),(Doorloc[0].y +214), (puzzleimgsCoTo[key]['width']+4), (puzzleimgsCoTo[key]['height']+4), 300, 3);
						}
					//compareimg(data)
				}	
				);
					
				//Compare data stream of right puzzle location with image from object, Less than 10% mismatch results in success
				resemble(buf3)
				.compareTo(puzzleimgsCoTo[key])
				.ignoreColors()
				.ignoreAntialiasing()
				.onComplete(function (data) {				
					if (parseInt(data.misMatchPercentage) < 10 )
						{						
						alt1.overLayRect(a1lib.mixColor(0, 255, 0), (Doorloc[0].x +332),(Doorloc[0].y +214), (puzzleimgsCoTo[key]['width']+4), (puzzleimgsCoTo[key]['height']+4), 300, 3);
						}
					//compareimg(data)
				}	
				);
			}
		}
	}
	
	return;
}


function getDiffSq(img:ImgRef){
	//finds door lock mech window from main image
	
	var DoorlocSq = img.findSubimage(doorimg.door);	

	//for every image in puzzleimages
	for (const [key] of Object.entries(puzzleimgsSq)) {
		
	//only run if door lock window is on screen, saves on performance
	if (window.alt1) {
		//if door lock found
		
				//document.getElementById('canvastest2').textContent = `${DoorlocSq.length}`
			if (DoorlocSq.length != 0) {
				
				//recapture just door lock window			
				//pull back the relevant size of the barrows window (500X320 pixels)

				//acount for size diff with 3 funcs, 1 for each puzz except 4sq pieces
				
				imgdoor = a1lib.captureHold((DoorlocSq[0].x +57),(DoorlocSq[0].y +225), 386, 268 );   // top left corner coords / bottom left
				//convert that area to data
				var buf1 = imgdoor.toData((DoorlocSq[0].x +57),(DoorlocSq[0].y +225),41, 41); 
				
				var buf2 = imgdoor.toData((DoorlocSq[0].x +200),(DoorlocSq[0].y +225),41, 41); 
				
				var buf3 = imgdoor.toData((DoorlocSq[0].x +343),(DoorlocSq[0].y +225),41, 41); 
				//buf1.show()
				//buf2.show()
				//buf3.show()

				//Compare data stream of left puzzle location with image from object, Less than 10% mismatch results in success
				resemble(buf1)
				.compareTo(puzzleimgsSq[key])
				.ignoreColors()
				.ignoreAntialiasing()
				.onComplete(function (data) {				
					if (parseInt(data.misMatchPercentage) < 10 )
						{
						//display border
						alt1.overLayRect(a1lib.mixColor(0, 255, 0), (DoorlocSq[0].x +57),(DoorlocSq[0].y +225), (puzzleimgsSq[key]['width']+4), (puzzleimgsSq[key]['height']+4), 300, 3);
						}
					//compareimg(data)
				}	
				);
					
				//Compare data stream of middle puzzle location with image from object, Less than 10% mismatch results in success
				resemble(buf2)
				.compareTo(puzzleimgsSq[key])
				.ignoreColors()
				.ignoreAntialiasing()
				.onComplete(function (data) {
					if (parseInt(data.misMatchPercentage) < 10 )
						{
						//display border							
						alt1.overLayRect(a1lib.mixColor(0, 255, 0), (DoorlocSq[0].x +200),(DoorlocSq[0].y +225), (puzzleimgsSq[key]['width']+4), (puzzleimgsSq[key]['height']+4), 300, 3);
						}
					//compareimg(data)
				}	
				);
					
				//Compare data stream of right puzzle location with image from object, Less than 10% mismatch results in success
				resemble(buf3)
				.compareTo(puzzleimgsSq[key])
				.ignoreColors()
				.ignoreAntialiasing()
				.onComplete(function (data) {				
					if (parseInt(data.misMatchPercentage) < 10 )
						{						
						alt1.overLayRect(a1lib.mixColor(0, 255, 0), (DoorlocSq[0].x +343),(DoorlocSq[0].y +225), (puzzleimgsSq[key]['width']+4), (puzzleimgsSq[key]['height']+4), 300, 3);
						}
					//compareimg(data)
				}	
				);
			}
		}
	}
	
	return;
}


function getDiffCT(img:ImgRef){
	//finds door lock mech window from main image
	
	var DoorlocSq = img.findSubimage(doorimg.door);	

	//for every image in puzzleimages
	for (const [key] of Object.entries(puzzleimgsCT)) {
		
	//only run if door lock window is on screen, saves on performance
	if (window.alt1) {
		//if door lock found
		
				//document.getElementById('canvastest2').textContent = `${DoorlocSq.length}`
			if (DoorlocSq.length != 0) {
				
				//recapture just door lock window			
				//pull back the relevant size of the barrows window (500X320 pixels)

				//acount for size diff with 3 funcs, 1 for each puzz except 4sq pieces
				
				imgdoor = a1lib.captureHold((DoorlocSq[0].x +41),(DoorlocSq[0].y +227), 403, 270 );   // top left corner coords / bottom left
				//convert that area to data
				var buf1 = imgdoor.toData((DoorlocSq[0].x +41),(DoorlocSq[0].y +227),78, 43); 
				
				var buf2 = imgdoor.toData((DoorlocSq[0].x +184),(DoorlocSq[0].y +227),78, 43); 
				
				var buf3 = imgdoor.toData((DoorlocSq[0].x +326),(DoorlocSq[0].y +227),78, 43); 
				//buf1.show()
				//buf2.show()
				//buf3.show()

				//Compare data stream of left puzzle location with image from object, Less than 10% mismatch results in success
				resemble(buf1)
				.compareTo(puzzleimgsCT[key])
				.ignoreColors()
				.ignoreAntialiasing()
				.onComplete(function (data) {				
					if (parseInt(data.misMatchPercentage) < 10 )
						{
						//display border
						alt1.overLayRect(a1lib.mixColor(0, 255, 0), (DoorlocSq[0].x +41),(DoorlocSq[0].y +227), (puzzleimgsCT[key]['width']+4), (puzzleimgsCT[key]['height']+4), 300, 3);
						}
					//compareimg(data)
				}	
				);
					
				//Compare data stream of middle puzzle location with image from object, Less than 10% mismatch results in success
				resemble(buf2)
				.compareTo(puzzleimgsCT[key])
				.ignoreColors()
				.ignoreAntialiasing()
				.onComplete(function (data) {
					if (parseInt(data.misMatchPercentage) < 10 )
						{
						//display border							
						alt1.overLayRect(a1lib.mixColor(0, 255, 0), (DoorlocSq[0].x +184),(DoorlocSq[0].y +227), (puzzleimgsCT[key]['width']+4), (puzzleimgsCT[key]['height']+4), 300, 3);
						}
					//compareimg(data)
				}	
				);
					
				//Compare data stream of right puzzle location with image from object, Less than 10% mismatch results in success
				resemble(buf3)
				.compareTo(puzzleimgsCT[key])
				.ignoreColors()
				.ignoreAntialiasing()
				.onComplete(function (data) {				
					if (parseInt(data.misMatchPercentage) < 10 )
						{						
						alt1.overLayRect(a1lib.mixColor(0, 255, 0), (DoorlocSq[0].x +326),(DoorlocSq[0].y +227), (puzzleimgsCT[key]['width']+4), (puzzleimgsCT[key]['height']+4), 300, 3);
						}
					//compareimg(data)
				}	
				);
			}
		}
	}
	
	return;
}

function chest(img) //finds reward chest, used to reset tunnel green image
{
	var chestloc = img.findSubimage(chestimg.chest);	
	
	//only run if chest loot window is on screen, saves on performance
	if (window.alt1) {
		if (chestloc.length != 0) {
			tunnelglbl3 = "None"
			localStorage.setItem("LocalStorageTunnel",tunnelglbl3);
			brocount = 8
			Linzakill = 0
		}
	}


}

if (window.alt1) {
	alt1.identifyAppUrl("./appconfig.json");
}