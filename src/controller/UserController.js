import {Customer} from "../model/Customer";

export class UserController {
	constructor() {
		this.formLogin = (document.getElementById("form-login")) ? document.getElementById("form-login") : false;
		this.formSignin = (document.getElementById("form-signin")) ? document.getElementById("form-signin") : false;
		this.initialize();
	}
	initialize(){
		this.initEvents();
		this.verifyLogin();
	}
	verifyLogin() {		
		if(this.getCookie("id")) {			
			document.getElementById("user-name").innerHTML = `<sub>${this.getCookie("name").split(" ")[0]}</sub>`;
			document.getElementById("user-link").setAttribute("href","perfil.html");
			document.getElementById("user-name").setAttribute("class", "text-capitalize mr-1");
			if(window.location.pathname == "/login.html" || window.location.pathname == "/cadastro.html" ){
				window.location.href = "/";
			}
		}else if(this.getCookie("email")){
			document.getElementById("user-link").setAttribute("href","perfil.html");
			this.login(this.getCookie("email"), this.getCookie("password"));
			if(window.location.pathname == "/login.html" || window.location.pathname == "/cadastro.html"){
				window.location.href = "/";
			}		
		}else {
			document.getElementById("user-link").setAttribute("href","login.html");
			document.getElementById("user-name").innerHTML = ``;
			document.getElementById("user-name").setAttribute("class", "");
		}
		
	}
	initEvents() {
		let _this = this;
		if(this.formLogin){
			[...this.formLogin].forEach(element => {
				if(element.id != "button-login"){
					element.dataset.valid = false;
				}							
				element.addEventListener("keyup", e => {								
					if(!this.isValid(element)){
						element.classList.add("is-invalid");
						element.dataset.valid = false;
					}else{
						element.classList.remove("is-invalid");
						element.classList.add("is-valid");
						element.dataset.valid = true;
					}
					this.verifyForm(this.formLogin);
				});
				
			});
			this.verifyForm(this.formLogin);
			
			this.formLogin.addEventListener("submit", e => {
				this.verifyForm(this.formLogin);
				this.deleteAllCookies();
				e.preventDefault();
				if(this.formLogin.querySelector("#button-login").classList.contains("disabled")){
					//inválid
					console.log("Inválido");
				}else{
					this.login(this.formLogin.querySelector("#email-login").value,this.formLogin.querySelector("#password-login").value);
				}
				
			});
		}
		if(this.formSignin){
			[...this.formSignin].forEach(element => {
				if(element.id != "button-signin"){
					element.dataset.valid = false;
				}				
				element.addEventListener("keyup", e => {								
					if(!this.isValid(element)){
						element.classList.add("is-invalid");
						element.dataset.valid = false;
					}else{
						element.classList.remove("is-invalid");
						element.classList.add("is-valid");
						element.dataset.valid = true;
					}
					this.verifyForm(this.formSignin);
				});
			});
			this.verifyForm(this.formSignin);
			this.formSignin.addEventListener("submit", e => {
				e.preventDefault();
				if(this.formSignin.querySelector("#button-signin").classList.contains("disabled")){
					//inválid
					console.log("Inválido");
				}else{
					//válido
					let customer =	this.loadFromForm(this.formSignin);
					customer.create().then(e => {
						if(e.code == 1){
							this.login(customer.email, customer.password);
						}else{
							console.log(e);
						}
					});
				}
			});
		}
	}
	
	loadFromForm(form){
		let user = new Customer();
		[...form.elements].forEach(element => {
			user[element.name.split("-")[0]] = element.value;
		});
		return user;
	}
	
	verifyForm(form) {
		let valid = true;
		[...form.elements].forEach(element => {
			if(element.id == "button-signin" || element.id == "button-login"){
				return;
			}
			if(element.type == "checkbox") {
				return;
			}
			if(element.dataset.valid == "false"){
				valid = false;				
			}
			if(valid){
				form.querySelector("button").classList.remove("disabled");
			}else{
				form.querySelector("button").classList.add("disabled");
			}
		});
	}
	
	isValid(element) {
		if(element.id.split("-")[0] == "email"){
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(element.value).toLowerCase());
		}
		else if(element.id.split("-")[0] == "password"){
			if(element.value.length < 8){
				return false;
			}else{
				return true;
			}
			
		}
		else if(element.id == "repassword-signin"){
			if(element.value.length < 8){
				return false;
			}else if(element.value != this.formSignin.querySelector("#password-signin").value){
				return false;
			}
			return true;			
		}
		return true;
	}
	
	login(email, password) {
		let user = new Customer();
		user.email = email;
		user.password = password;
		user.login().then(e => {
			if(e["code"] == 1){
				user.fromJson(e["response"]);
				this.makeCookiesLogin(user);
				this.verifyLogin();
			}else{
				this.deleteAllCookies();
				console.log(e["response"]);
			}
		});
	}
	logOut() {
		this.deleteAllCookies();
	}
	makeCookiesLogin(user){
		let date = new Date();
		date.setDate(date.getDate() + 3);
		if(document.getElementById("remember")) {
			if(document.getElementById("remember").checked){
				this.setCookie("email", user.email, date);
				this.setCookie("password", user.password, date);
			}			
		}		
		this.setCookie("name", user.name);
		this.setCookie("id", user.id);
		
	}
	setCookie(name, value, duration) {
		name = btoa(name);
		value = btoa(value);
        var cookie = name + "=" + escape(value) +
        ((duration) ? "; expires=" + duration.toGMTString() : "");
        document.cookie = cookie;
	}
	getCookie(name) {
		var cookies = document.cookie;
		name = btoa(name);
		var prefix = name + "=";
		var begin = cookies.indexOf("; " + prefix);
	 
		if (begin == -1) {
	 
			begin = cookies.indexOf(prefix);
			 
			if (begin != 0) {
				return null;
			}
	 
		} else {
			begin += 2;
		}
	 
		var end = cookies.indexOf(";", begin);
		 
		if (end == -1) {
			end = cookies.length;                        
		}
	 
		return atob(unescape(cookies.substring(begin + prefix.length, end)));
	}
	deleteCookie(name) {
		
       if (this.getCookie(name)) {
					name = btoa(name);
				  document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
		   }
	}
	deleteAllCookies() {
		this.deleteCookie("name");
		this.deleteCookie("email");
		this.deleteCookie("password");
		this.deleteCookie("id");
		this.verifyLogin();
	}
}
