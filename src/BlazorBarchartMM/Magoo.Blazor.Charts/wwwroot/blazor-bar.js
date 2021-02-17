const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        --bb-d: flex;
		--bb-jc: flex-end;
		--bb-fd: column;
		--bb-t: height 200ms ease;
        --bb-td: 0ms;
		--bb-id: 200ms;
		--bb-it: height var(--bb-id) ease;
		--bb-bt: 4px solid currentColor;
		--bb-h: 50px;
		--bb-w: 20px;
		--bb-m: 0;
		--bb-p: 5px 0 0 0;
		--bb-bc: green;
		--bb-bl: 0;
		--bb-c: white;

		display: var(--bb-d);
		justify-content: var(--bb-jc);
		flex-direction: var(--bb-fd);
		margin: var(--bb-m);
		padding: var(--bb-p);
		transition: var(--bb-t);
        transition-delay: var(--bb-td);
		width: var(--bb-w);
		border-top: var(--bb-bt);
		height: var(--bb-h);
	}

	.bb-inner {
        transition: var(--bb-it);
		background-color: var(--bb-bc);
		border-left: var(--bb-bl);
		color: var(--bb-c);
		height: var(--bb-h);
		width: var(--bb-w);
	}
</style>
<div class="bb-inner">
</div>
`;

class BlazorBar extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('blazor-bar', BlazorBar);
