// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// borrowed from https://www.sveltelab.dev/xzz3zkyjzwe6kfk

export function draggable(node, data) {
	let state = data;

	node.draggable = true;
	node.style.cursor = 'grab';

	function handle_dragstart(e) {
		if (!e.dataTransfer) return;
		// console.log("🚀 ~ file: dnd.js:12 ~ handle_dragstart ~ e:", e)
        console.log(`x ${e.offsetX} y ${e.offsetY}`)
		const stateAsText = JSON.stringify(state)

		e.dataTransfer.setData('text/plain', stateAsText);
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

export function dropzone(node, options) {
	let state = {
		dropEffect: 'move',
		dragover_class: 'dropZone',
		...options
	};

	function handle_dragenter(e) {
		if (!(e.target instanceof HTMLElement)) return;
		e.target.classList.add(state.dragover_class);
	}

	function handle_dragleave(e) {
		if (!(e.target instanceof HTMLElement)) return;
		e.target.classList.remove(state.dragover_class);
	}

	function handle_dragover(e) {
		e.preventDefault();
		if (!e.dataTransfer) return;
		e.dataTransfer.dropEffect = state.dropEffect;
	}

	function handle_drop(e) {
		e.preventDefault();
		if (!e.dataTransfer) return;
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
				dragover_class: 'dropZone',
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
