import {Model} from "./Model";

export class Customer extends Model{
	constructor(){
		super();
		this.baseUrl = "https://long-tongued-boresi.000webhostapp.com/Users/initial.php";
	}
	login() {
		return new Promise((s,f) => {
			if(this.password && this.email) {
				let req = this.request(`${this.baseUrl}?email=${this.email}&password=${this.password}`, "GET");
				req.onload = e => {
					s(JSON.parse(req.responseText));
				}
				req.onerror = e => {
					f(e);
				}
			}else {
				f("Error");
			}
		});
	}
	create() {
		return new Promise((s, f) => {
			if(this.password && this.email) {
				let req = this.request(this.baseUrl, "POST", this.toFormData());
				req.onload = e => {
					s(JSON.parse(req.responseText));
				}
				req.onerror = e => {
					f("Error");
				}
			}
		});
	}
	toFormData() {
		var form_data = new FormData();
		let item = this.toJson();
		for ( var key in item ) {
			form_data.append(key, item[key]);
		}
		return form_data;
	}
	request(url, method, data = {}) {
		let xml = new XMLHttpRequest();
		xml.open(method, url);
		xml.send(data);
		return xml;		
	}
	get id() {
		return this.data.id;
	}
	set id(value) {
		this.data.id = value;
	}
	get name() {
		return this.data.name;
	}
	set name(value) {
		this.data.name = value;
	}
	get email(){
		return this.data.email;
	}
	set email(value) {
		this.data.email = value;
	}
	get password() {
		return this.data.password;
	}
	set password(value) {
		this.data.password = value;
	}
}
