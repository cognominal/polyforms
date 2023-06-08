// import type { Mouse } from "@playwright/test";

export function draggable(node: HTMLElement, data) {
	let state = data;

	node.draggable = true;
	node.style.cursor = 'grab';

	function handle_dragstart(e) {
		if (!e.dataTransfer) return;
		const data = JSON.stringify(state)
		// console.log('dragstart', data);
		e.dataTransfer.setData('text/plain', data)
	}

	node.addEventListener('dragstart', handle_dragstart);

	return {
		update(data) {
			state = data;
		},

		destroy() {
			node.removeEventListener('dragstart', handle_dragstart);
		}
	};
}

type OnDropZone = (data: string, event: DragEvent) => void;

export interface DropzoneOptions {
	dropEffect?: string;
	dragover_class?: string;
	on_dropzone: OnDropZone;
}

interface DropzoneState {
	dropEffect: string;
	dragover_class: string;
}

export function dropzone(node : HTMLElement, options: DropzoneOptions) {
	let state: DropzoneState = {
		dropEffect: 'move',
		dragover_class: 'droppable',
		...options
	};

	function handle_dragenter(e: MouseEvent) {
		if (!(e.target instanceof HTMLElement)) return;
		e.target.classList.add(state.dragover_class);
	}

	function handle_dragleave(e: MouseEvent) {
		if (!(e.target instanceof HTMLElement)) return;
		e.target.classList.remove(state.dragover_class);
	}

	function handle_dragover(e: MouseEvent) {
		e.preventDefault();
		if (!e.dataTransfer) return;
		e.dataTransfer.dropEffect = state.dropEffect;
	}

	function handle_drop(e: MouseEvent) {
		e.preventDefault();
		if (!e.dataTransfer) return; z
		const data = e.dataTransfer.getData('text/plain');
		if (!(e.target instanceof HTMLElement)) return;
		e.target.classList.remove(state.dragover_class);
		state.on_dropzone(data, e);
	}

	node.addEventListener('dragenter', handle_dragenter);
	node.addEventListener('dragleave', handle_dragleave);
	node.addEventListener('dragover', handle_dragover);
	node.addEventListener('drop', handle_drop);

	return {
		update(options) {
			state = {
				dropEffect: 'move',
				dragover_class: 'droppable',
				...options
			};
		},

		destroy() {
			node.removeEventListener('dragenter', handle_dragenter);
			node.removeEventListener('dragleave', handle_dragleave);
			node.removeEventListener('dragover', handle_dragover);
			node.removeEventListener('drop', handle_drop);
		}
	};
}
