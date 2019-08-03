export class Model {
	constructor() {
		this.data = {};
	}
	
	toJson() {
		return this.data;
	}
	
	fromJson(json) {
		this.data = json;
	}
}
