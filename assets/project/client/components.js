// import components from componentns module
const componentsPath = './componentsModule.js';
import components from './componentsModule.js';

class HeaderTestComponent extends HTMLElement {

	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = components['header-test'];
	}
}

// define custom elements
customElements.define('app-header-test', HeaderTestComponent);

// delete require Cache
delete require.cache[componentsPath];