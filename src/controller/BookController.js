import {Book} from "../model/Book";
import {Editor} from "../model/Editor";
import {Category} from "../model/Category";
import {Author} from "../model/Author";

export class BookController {
	constructor() {
	
	}
	loadAll() {
		let book = new Book();
		return book.getAll();
	}
	showAll() {
		let books = this.loadAll();
		if(this.validate()){
			
		}
	}
	validate(response) {
		if(response["code"] != 1){
			return false;
		}
		return true;
	}
	
}
