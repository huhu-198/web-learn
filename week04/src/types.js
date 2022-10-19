"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
class Todo {
    constructor(elem) {
        this.id = elem.id;
        this.content = elem.content;
        this.finished = elem.finished;
        this.ctime = elem.ctime;
        this.mtime = elem.mtime;
        this.el = null;
    }
}
exports.Todo = Todo;
