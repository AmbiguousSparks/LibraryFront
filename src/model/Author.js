import {Model} from "./Model";

export class Author extends Model {
	constructor(){
		super();
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
}
