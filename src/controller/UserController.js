import {Customer} from "../model/Customer";

export class UserController {
	constructor() {
		this.formLogin = (document.getElementById("form-login")) ? document.getElementById("form-login") : false;
		this.initialize();
	}
	initialize(){
		this.initEvents();
		this.verifyLogin();
	}
	verifyLogin() {
		if(this.getCookie("id")) {			
			document.getElementById("user-name").innerHTML = `<sub>${this.getCookie("name")}</sub>`;
			document.getElementById("user-link").setAttribute("href","perfil.html");
			document.getElementById("user-name").setAttribute("class", "text-capitalize mr-1");
			if(window.location.pathname == "/login.html"){
				window.location.href = "/";
			}
		}else if(this.getCookie("email")){
			document.getElementById("user-link").setAttribute("href","perfil.html");
			this.login(this.getCookie("email"), this.getCookie("password"));
			if(window.location.pathname == "/login.html"){
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
			this.formLogin.addEventListener("submit", e => {
				this.deleteAllCookies();
				e.preventDefault();
				this.login(this.formLogin.querySelector("#email-login").value,this.formLogin.querySelector("#password-login").value);
			});
		}
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
