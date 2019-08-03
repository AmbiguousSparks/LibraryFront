import {Model} from "./Model";
export class Book extends Model{
	constructor(){
		super();
		this.baseUrl = "http://localhost/APILibrary/Books/initial.php";
	}
	getAll() {
		return new Promise((s,f)=> {
			let request = this.request(this.baseUrl);
			request.onload = e => {
				let response = JSON.parse(request.responseText);
				s(response);
			}
			request.onerror = e=> {
				f(e);
			}
		});
	}
	getOne() {
		return new Promise((s,f) => {
			if(this.data.id) {
				let request = this.request(`${this.baseUrl}?id=${this.data.id}`);
				request.onload = e => {
					let response = JSON.parse(request.responseText);
					s(response);
				}
				request.onerror = e=> {
					f(e);
				}
			}else{
				f("Error");
			}
		});		
	}
	search(search){
		return new Promise((s,f) => {
			if(search) {
				let request = this.request(`${this.baseUrl}?search=${search}`);
				request.onload = e => {
					let response = JSON.parse(request.responseText);
					s(response);
				}
				request.onerror = e=> {
					f(e);
				}
			}else{
				f("Error");
			}
		});
	}
	request(url) {
		let xml = new XMLHttpRequest();
		xml.open("GET", url, true);
		xml.send();
		return xml;		
	}
	get id() {
		return this.data.id;
	}
	set id(value) {
		this.data.id = value;
	}
	get title(){
		return this.data.title;
	}
	set title(value) {
		this.data.title = value;
	}
	get tag(){
		return this.data.tag;
	}
	set tag(value) {
		this.data.tag = value;
	}
	get barCode() {
		return this.data.barCode;
	}
	set barCode(value){
		this.data.barCode = value;
	}
	get synopsis() {
		return this.data.synopsis;
	}
	set synopsis(value) {
		this.data.synopsis = value;
	}
	get release() {
		return this.data.release;
	}
	set release(value) {
		this.data.release = value;
	}
	get price() {
		return this.data.price;
	}
	set price(value) {
		this.data.price = value;
	}
	get cover() {
		return this.data.cover;
	}
	set cover(value){
		this.data.cover = value;
	}
	get quantity(){
		return this.data.quantity;
	}
	set quantity(value) {
		this.data.quantity = value;
	}
	get category() {
		return this.data.category;
	}
	set category(value) {
		this.data.category = value;
	}
	get author() {
		return this.data.author;
	}
	set author(value) {
		this.data.author = value;
	}
	get editor() {
		return this.data.editor;
	}
	set editor(value) {
		this.data.editor = value;
	}
}
