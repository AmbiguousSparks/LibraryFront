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
	loadBests() {
		let book = new Book();
		return book.getBests();
	}
	loadOne() {
		let book = new Book();
		book.data.id = document.getElementById("idBook").value;
		return book.getOne();
	}
	showBest() {
		let response = this.loadBests();
		response.then(e =>{
			if(this.validate(e)){
				e["books"].forEach(book => {
					let bookAux = new Book();
					bookAux.fromJson(book);
					let element = document.createElement("div");
					element.setAttribute("class","card mr-1");
					element.innerHTML = 
					`
					<figure class="card-img">
					 <img class="card-img-top" src="http://localhost/APILibrary/Covers/${bookAux.cover}" alt="Card image cap">
					  </figure>
					  <div class="card-body">
						<h5 class="card-title limited">${bookAux.title}</h5>
						<p class="card-text limited">${bookAux.synopsis}</p>
						<a href="#" class="btn btn-primary">Detalhes</a>
					  </div>
					`;
					document.getElementById("spotlight").appendChild(element);
				});
			}else{
				console.error(e);
			}
		});
	}
	validate(response) {
		if(response.code != 1){
			return false;
		}
		return true;
	}
	
}
