var res = new Array;
var bookingArray = new Array;

function setCookie(value){
	var date = new Date();
	date.setTime(date.getTime() + (60*1000));
	var expires = 'expires=' + date.toGMTString();
	
	if(value == 'eng'){
		document.cookie = 'Language=English;'+ expires + '; path=/';
		window.location.replace("https://angeliqueandshaun.github.io/en/index.html");
	}
	
	if(value == 'afr'){
		document.cookie = 'Language=Afrikaans;'+ expires + '; path=/';
		document.getElementById('LANG-Modal').style.display = "none";
	}
}

function readCookie(){
	var allcookies = document.cookie;
	var name = 'Language';
	var value = '';
	
	var cookieArray = allcookies.split(";");
	
	for(var i = 0; i < cookieArray.length; i++){
		var c = cookieArray[i];
		while (c.charAt(0) == ' ') {
		  c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
		  return c.substring(name.length, c.length);
		}
	}
}

function checkCookie(){
	var url = window.location.href;
	var selectedLang = readCookie();	
	
	if( selectedLang == "=Afrikaans" ){
		if(url === "https://angeliqueandshaun.github.io/en/index.html" || url === "https://angeliqueandshaun.github.io/en/"){
			window.location.replace("https://angeliqueandshaun.github.io/af/index.html");
			
		}			
	}else if( selectedLang == "=English"){
		if(url === "https://angeliqueandshaun.github.io/af/index.html" || url === "https://angeliqueandshaun.github.io/af/"){
			window.location.replace("https://angeliqueandshaun.github.io/en/index.html");			
		}			
	}
	else{
		document.getElementById('LANG-Modal').style.display = "block";
	}
	
}

function ScrollTop(){				
	window.scrollTo(0,0);
}

function showModal(id){
	document.getElementById(id).style.display = "block";
}
		
function hideModal(id){
	document.getElementById(id).style.display = "none";
}						

function callServer(){
		var str = 'email=' + document.getElementById('email').value;
		var EmailAddress = str.toLowerCase();
		const HTTP = new XMLHttpRequest();
		const Url = 'https://script.google.com/macros/s/AKfycby1Saj-ZdReD9Lj4UGwob5dYk8k345uVLrYtnJLzZbMNUgUmak/exec' + '?' + EmailAddress;
		var myCheckBoxList = '<ul>';				
						
		document.getElementById('response').innerHTML = 'Wag asb dat ons jou inligting oproep';
		
		HTTP.responseType = 'text';
		HTTP.open('GET', Url, true);
		
		HTTP.onreadystatechange = function() {
			document.getElementById('response').innerHTML += '...';
			if(HTTP.readyState === 4 && HTTP.status === 200) {																				
				var JS_obj = JSON.parse(HTTP.response);
				var myLength = JS_obj.length;
				if(myLength === 0){
					document.getElementById('response').innerHTML = 'E-pos adres nie gevind </br> Gebruik asb die e-pos adres ingedien tydens Onthou die datum.';
				}else{								
					for(i = 0; i < myLength; i++) {							
						res.push(JS_obj[i]);
						var textnode = document.createTextNode(' ' + JS_obj[i]);
						var node = document.createElement('li');
						var checkbox = document.createElement('input');
						checkbox.type = 'checkbox';
						checkbox.id = 'list'+[i];
						checkbox.name = 'names';
						checkbox.value = 'name';
						
						node.appendChild(checkbox);
						node.appendChild(textnode);
						document.getElementById('checkboxlist').appendChild(node);
					}
					
					document.getElementById('page1').style.display = 'none';
					document.getElementById('page2').style.display = 'block';
					document.getElementById('page3').style.display = 'none';
					//res.forEach(addValues);					
					myCheckBoxList += '</ul>';
				}
			}
		}
									
		HTTP.send(Url);
}

function Submit(){
	const HTTP = new XMLHttpRequest();				
	var responsedata = '';
	var str = 'email=' + document.getElementById('email').value;
	var EmailAddress = str.toLowerCase();
	var text = '';
	var URL2 = '';
	var Allergies = '';
	var Song = '';
	
	
	if(document.getElementById('alergy').value != ''){
		Allergies = '&allergy=' + document.getElementById('alergy').value;
	}else{
		Allergies = '&allergy=none';
	}
	
	if(document.getElementById('song').value != ''){
		Song = '&song=' + document.getElementById('song').value;
	}else{
		song = '&song=none';
	}
	
	
	//document.getElementById('result').innerHTML = EmailAddress + Allergies + Song;
	var listlength = res.length;
	
	for(j = 0; j < listlength; j++){				
		var myBox = document.getElementById('list'+[j]);
		if (myBox.checked == true){
			responsedata = '&fname=' + res[j] + '&attend=yes';											
			text = text + responsedata;											
		}else{						
			responsedata = '&fname=' + res[j] + '&attend=no';
			text = text + responsedata;												
		}
	}
	
	URL2 = 'https://script.google.com/macros/s/AKfycby1Saj-ZdReD9Lj4UGwob5dYk8k345uVLrYtnJLzZbMNUgUmak/exec' + '?' + EmailAddress + text + Allergies + Song;
	document.getElementById('result').innerHTML = 'Wag asb terwyl ons jou besonderhede indien...';
	
	HTTP.responseType = 'text';
	HTTP.open('GET', URL2, true);
	
	HTTP.onreadystatechange = function() {
		document.getElementById('response').innerHTML += '...';
		if(HTTP.readyState === 4 && HTTP.status === 200) {						
			//var JS_obj = JSON.parse(HTTP.response);
			var returnText = HTTP.response;
			if(returnText === 'executed'){
				document.getElementById('page1').style.display = 'none';
				document.getElementById('page2').style.display = 'none';
				document.getElementById('page3').style.display = 'block';
			}else{
				document.getElementById('result').innerHTML = 'Ons kan ongelukkig nie jou versoek indien nie. Verfris asb die webblad';
			}
									
		}
	}											
	HTTP.send(URL2);
}			

function Confirm(){
	document.getElementById('Acc-Page1').style.display = 'none';
	document.getElementById('Acc-Page2').style.display = 'block';
	document.getElementById('Acc-Page3').style.display = 'none';
	GetAcc();
}

function GetAcc(){								
	const HTTP = new XMLHttpRequest();
	const Url = 'https://script.google.com/macros/s/AKfycbxNweG_q2HfiY7UHUkn6DbNZJXeERGZvAUBlQTO6rHbYUNb15A/exec';
	var mySelectList = '<select name:"rooms" id="rooms">';				
					
	document.getElementById('Accresponse').innerHTML = 'Wag asb dat ons die beskikbare verblyf oproep';
	
	HTTP.responseType = 'text';
	HTTP.open('GET', Url, true);
	
	HTTP.onreadystatechange = function() {
		document.getElementById('Accresponse').innerHTML += '...';
		if(HTTP.readyState === 4 && HTTP.status === 200) {
			document.getElementById('Accresponse').innerHTML = 'Kies asb die verblyf wat jy wil bespreek';
			var JS_obj = JSON.parse(HTTP.response);					
			var myLength = JS_obj.length;
			if(myLength > 0){						
				for(i = 0; i < myLength; i++) {							
					bookingArray.push(JS_obj[i]);							
					var node = document.createElement('option');
					var text = JS_obj[i];
					if(text === 'RIC-1' || text === 'RIC-4' || text === 'RIC-6'){
						node.textContent = 'Red Ivory Chalet (Slaap 4 - 2 kamers @R490.00 pppn)';
						node.value = JS_obj[i];
					} else if (text === 'RIC-2' || text === 'RIC-3' || text === 'RIC-5'){
						node.textContent = 'Red Ivory Chalet (Slaap 4 - 1 kamer @R490.00 pppn)';
						node.value = JS_obj[i];
					} else if (text === 'BUN-1' || text === 'BUN-2' || text === 'BUN-3' || text === 'BUN-4' || text === 'BUN-5' || text === 'BUN-6'){
						node.textContent = 'Bungalows (Slaap 4 @R390.00 pppn)';
						node.value = JS_obj[i];								
					} else if (text === 'BUN-7' || text === 'BUN-8' || text === 'BUN-9'){
						node.textContent = 'Bungalows (Slaap 2 @R390.00 pppn)';
						node.value = JS_obj[i];								
					} else if (text === 'SAF-1' || text === 'SAF-2' || text === 'SAF-3' || text === 'SAF-4' || text === 'SAF-5' ){
						node.textContent = 'Safari tent (Slaap 2 @R290.00 pppn)';
						node.value = JS_obj[i];								
					} else if (text === 'LR8-1' || text === 'LR8-2' || text === 'LR8-3' || text === 'LR8-4' || text === 'LR8-5' || text === 'LR8-6' || text === 'LR8-7' || text === 'LR8-8'){
						node.textContent = 'Loft room (Slaap 8 - enkel stapel bed @R240.00 pppn)';
						node.value = JS_obj[i];								
					} else if (text === 'LR-1' ){
						node.textContent = 'Loft room (Slaap 4 @R240.00 pppn)';
						node.value = JS_obj[i];
					} else {
						node.textContent = JS_obj[i];
						node.value = JS_obj[i];
					}																												
					document.getElementById('selectbox').appendChild(node);	
					document.getElementById('Acclist').style.display = 'block';
				}
			}else{
				document.getElementById('Accresponse').innerHTML = 'Unfortunately all accommodation has been booked. </br> Please contact Angelique or Shaun for alternative arrangements';
				document.getElementById('SubmitButton').style.display = 'none';
			}
																									
		}
	}											
	HTTP.send(Url);
}

function AccBack(){
	document.getElementById('Acc-Page2').style.display = 'block';
	document.getElementById('Acc-Page3').style.display = 'none';
	document.getElementById('BookingGuest2Value').value = '';
	document.getElementById('BookingGuest3Value').value = '';
	document.getElementById('BookingGuest4Value').value = '';
	//document.getElementById('Selection').innerHTML = 'You have selected the: </br>';
}

function NextPage(){
	document.getElementById('Acc-Page2').style.display = 'none';
	document.getElementById('Acc-Page3').style.display = 'block';
	document.getElementById('Selection').innerHTML = 'Jy het die volgende gekies: </br>';
	document.getElementById('BookingGuest2').style.display = 'none';
	document.getElementById('BookingGuest3').style.display = 'none';
	document.getElementById('BookingGuest4').style.display = 'none';
	
	var mySelection = document.getElementById('selectbox');
	var text = selectbox.options[selectbox.selectedIndex].value;				
	if(text === 'RIC-1' || text === 'RIC-4' || text === 'RIC-6'){
		document.getElementById('Selection').innerHTML += 'Red Ivory Chalet (Slaap 4 - Queen bed en 2 enkel beddens (2 kamers) @R490.00 pppn)';
		document.getElementById('BookingGuest2').style.display = 'block';
		document.getElementById('BookingGuest3').style.display = 'block';
		document.getElementById('BookingGuest4').style.display = 'block';
	} else if (text === 'RIC-2' || text === 'RIC-3' || text === 'RIC-5'){
		document.getElementById('Selection').innerHTML += 'Red Ivory Chalet (Slaap 4 - Queen bed en dubbel slaper (1 kamer) @R490.00 pppn)';					
		document.getElementById('BookingGuest2').style.display = 'block';
		document.getElementById('BookingGuest3').style.display = 'block';
		document.getElementById('BookingGuest4').style.display = 'block';
	} else if (text === 'BUN-1' || text === 'BUN-2' || text === 'BUN-3' || text === 'BUN-4' || text === 'BUN-5' || text === 'BUN-6'){
		document.getElementById('Selection').innerHTML += "Bungalows (Slaap 4 - Queen bed en 'n stel stapel beddens @R390.00 pppn)";												
		document.getElementById('BookingGuest2').style.display = 'block';
		document.getElementById('BookingGuest3').style.display = 'block';
		document.getElementById('BookingGuest4').style.display = 'block';
	} else if (text === 'BUN-7' || text === 'BUN-8' || text === 'BUN-9'){
		document.getElementById('Selection').innerHTML += 'Bungalows (Slaap 2 - Queen bed @R390.00 pppn)';						
		document.getElementById('BookingGuest2').style.display = 'block';
	} else if (text === 'SAF-1' || text === 'SAF-2' || text === 'SAF-3' || text === 'SAF-4' || text === 'SAF-5' ){
		document.getElementById('Selection').innerHTML += 'Safari tent (Slaap 2 @R290.00 pppn)';
		document.getElementById('BookingGuest2').style.display = 'block';
	} else if (text === 'LR8-1' || text === 'LR8-2' || text === 'LR8-3' || text === 'LR8-4' || text === 'LR8-5' || text === 'LR8-6' || text === 'LR8-7' || text === 'LR8-8'){				
		document.getElementById('Selection').innerHTML += 'Loft room Single Bed (Slaap 8 - 4 stelle stapel beddens @R240.00 pppn)';						
	} else if (text === 'LR-1' ){					
		document.getElementById('Selection').innerHTML += "Loft room (Slaap 4 - 2 enkel beddens en 'n stel stapel beddens @R240.00 pppn)";
		document.getElementById('BookingGuest2').style.display = 'block';
		document.getElementById('BookingGuest3').style.display = 'block';
		document.getElementById('BookingGuest4').style.display = 'block';
	} else {
		document.getElementById('Selection').innerHTML = 'none';
	}
	
}

function SubmitAcc(){								
	var HTTP2 = new XMLHttpRequest();
	var Url = 'https://script.google.com/macros/s/AKfycbxNweG_q2HfiY7UHUkn6DbNZJXeERGZvAUBlQTO6rHbYUNb15A/exec';
	var EmailAddress = '&email=' + document.getElementById('Booking-Email').value;
	var Guest1 = document.getElementById('BookingGuest1Value').value;				
	var GuestContact = '&contact=' + document.getElementById('BookingContactValue').value;				
	var Guest2 = document.getElementById('BookingGuest2Value').value;
	var Guest3 = document.getElementById('BookingGuest3Value').value;				
	var Guest4 = document.getElementById('BookingGuest4Value').value;				
	var UnitNumber = '&unit=' + document.getElementById('selectbox').options[document.getElementById('selectbox').selectedIndex].value;
	var Duration = document.getElementById('DateSelect').options[document.getElementById('DateSelect').selectedIndex].value;				
	var Date = '';	
	var Nights = '';
	var Breakfast = '&breakfast=' + document.getElementById('BreakfastSelect').options[document.getElementById('BreakfastSelect').selectedIndex].value;
	
	if (Guest1 == ''){
		Guest1 = '';
	}else{
		Guest1 = '&guest1=' + document.getElementById('BookingGuest1Value').value;
	}
	
	if (Guest2 == ''){
		Guest2 = '';
	}else{
		Guest2 = '&guest2=' + document.getElementById('BookingGuest2Value').value;
	}
	
	if (Guest3 == ''){
		Guest3 = '';
	}else{
		Guest3 = '&guest3=' + document.getElementById('BookingGuest3Value').value;
	}
	
	if (Guest4 == ''){
		Guest4 = '';
	}else{
		Guest4 = '&guest4=' + document.getElementById('BookingGuest4Value').value;
	}
	
	if(Duration == 1){
		Date = '&date=26/04/2012';
		Nights = '&nights=2';
	}else{
		Date = '&date=27/04/2012';
		Nights = '&nights=1';
	}
	
	document.getElementById('SubmitLabel').innerHTML = 'Wag asb terwyl ons jou versoek indien';
	Url += '?' + EmailAddress + Guest1 + GuestContact + Guest2 + Guest3 + Guest4 + UnitNumber + Date + Nights + Breakfast;
	//document.getElementById('SubmitLabel').innerHTML = Url;
	
	
	HTTP2.responseType = 'text';
	HTTP2.open('GET', Url, true);
	
	HTTP2.onreadystatechange = function() {
		document.getElementById('SubmitLabel').innerHTML += '...';
		if(HTTP2.readyState === 4 && HTTP2.status === 200) {						
			var text = HTTP2.response;
			
			if(text == 'confirmed'){
				document.getElementById('notify').innerHTML = 'Dankie vir jou versoek. Ons sien uit om jou daar to sien. </br>Kuthaba Bush Lodge sal in kontak wees aangaande jou versoek.</br></br>Let wel dat jou versoek eers afgehandel wees na Kuthaba Bush Lodge betaling ontvang het';					
				
			}else {
				document.getElementById('notify').innerHTML = 'O gedorie.. Iets het verkeerd gegaan. Verfris asb die webblad.</br>Jammer vir die ongerief.';					
			}		
		
																			
		}
		document.getElementById('Acc-Page3').style.display = 'none';
		document.getElementById('Acc-Page4').style.display = 'block';
	}											
	HTTP2.send(Url);				
}

