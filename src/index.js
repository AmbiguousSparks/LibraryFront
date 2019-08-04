import 'bootstrap';
import './scss/app.scss';
import {BookController} from "./controller/BookController";
import {UserController} from "./controller/UserController";
window.bookController = new BookController();
window.userController = new UserController();
