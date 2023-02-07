import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

declare var UnityLoader:any;

@customElement('unity-player')

export class UnityPlayer extends LitElement {
    // Location of the UnityLoader.js file used by unity webgl builds.
    @property()
    loader: string = "";

    // Location of the container json file generated by Unity in webgl builds.
    @property()
    container: string = "";
   
    // Width in percentage points of the game-container element used by the WebGL canvas.
    @property()
    width?: number = 100;
    
    // Height in percentage points of the game-container element used by the WebGL canvas.
    @property()
    height?: number = 100;
    
    get gameContainer() {
        return this.renderRoot.querySelector("#game-container");
    }

    constructor() {
        super();
        window.addEventListener('loader-loaded', ()=> {
            UnityLoader.instantiate(this.gameContainer, this.container);
        });
    }
    
    override connectedCallback () {
        super.connectedCallback();
        var script = document.createElement("script");
        script.src = this.loader;
        script.onload = () => {
            var ev = new Event('loader-loaded');
            window.dispatchEvent(ev);
        };
        document.body.appendChild(script);
    }

    render() {
        return html`<div id="game-container" style="width: ${this.width}%; height: ${this.height}%;"></div>`;
    }
}
