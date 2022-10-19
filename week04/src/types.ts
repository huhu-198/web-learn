export interface ITodo {
	id: string;
	content: string;
	finished: boolean;
	ctime: number;
	mtime: number;
}

export class Todo implements ITodo {
	id: string;
	content: string;
	finished: boolean;
	ctime: number;
	mtime: number;
	// DOM元素
	el: HTMLElement;

	constructor(elem: ITodo) {
		this.id = elem.id;
		this.content = elem.content;
		this.finished = elem.finished;
		this.ctime = elem.ctime;
		this.mtime = elem.mtime;
		this.el = null;
	}
}
