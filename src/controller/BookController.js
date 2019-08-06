import {Book} from "../model/Book";
import {Editor} from "../model/Editor";
import {Category} from "../model/Category";
import {Author} from "../model/Author";

export class BookController {
	constructor() {
		this.inputSearch = document.getElementById("input-search");
		this.currentPage = window.location.pathname;
		this.initialize();
	}
	initialize() {
		this.initEvents();
		if(this.currentPage == "/"){
			this.showBest();
		}
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
	loadSearch(search) {
		let book = new Book();
		return book.search(search);
	}
	initEvents() {
		let listSearch = document.getElementById("list-search");
		let divSearch = document.getElementById("div-search");
		var typingTimer; //timer identifier
		var doneTypingInterval = 300;
		this.inputSearch.addEventListener("keyup", e => {
			clearTimeout(typingTimer);
			typingTimer = setTimeout(() => {
				listSearch.innerHTML = ``;
				if(this.inputSearch.value.length >= 3){				
					this.loadSearch(this.inputSearch.value).then(e=>{
					if(this.validate(e)){
						let i = 0;
						e["books"].forEach(book => {							
							if(i < 4){
								let element = document.createElement("li");
								let bookAux = new Book();
								bookAux.fromJson(book);
								element.innerHTML = 
								`	<img class="img-autocomplete img-thumbnail mr-2" src="http://localhost/APILibrary/Covers/${bookAux.cover}">
									<span class="">${bookAux.title}</span>
								`;
								divSearch.style.display = "block";
								listSearch.appendChild(element);
							}
							i++;											
						});
						if(i > 5) {
							let button = document.createElement("button");
							button.setAttribute("class", "btn btn-primary w-100");
							button.innerHTML = `Pesquisar todos ${i} livros`;
							listSearch.appendChild(button);
						}
					}else{
							let element = document.createElement("li");						
							element.innerHTML = 
							`	Não foram encontrados livros.
							`;
							divSearch.style.display = "block";
							listSearch.appendChild(element);
						}
					});					
				}else {
					divSearch.style.display = "none";
				}
			}, doneTypingInterval);
			
		});
		this.inputSearch.addEventListener("search", e => {
			listSearch.innerHTML = "";
			divSearch.style.display = "none";
		});
	}
	
	showBest() {
		let response = this.loadBests();
		response.then(e =>{
			if(this.validate(e)){
				e["books"].forEach(book => {
					let bookAux = new Book();
					bookAux.fromJson(book);
					let element = document.createElement("div");
					element.setAttribute("class","card");
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
