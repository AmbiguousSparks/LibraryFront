import 'bootstrap';
import './scss/app.scss';
import {Editor} from "./model/Editor";
import {Book} from "./model/Book";
window.editor = new Editor();
window.book = new Book();
window.book.id = 144;
