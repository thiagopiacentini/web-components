const template = document.createElement('template');
template.innerHTML = `
  
  <style>
    .tooltip-container {
      display: inline-block;
      position: relative;
      z-index: 2
    }
    .close {
      display: none;
    }

    svg {
      width: 1rem;
      cursor: pointer;
    }

    .notify-container {
      position: absolute;
      bottom: 125%;
      z-index: 9;
      width: 300px;
      background: white;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, .1);
      font-size: .8rem;
      border-radius: .5rem;
      padding: 1rem;
      transform: scale(0);
      transform-origin: bottom left;
      transition: transform .5s cubic-bezier(0.860, 0.000, 0.070, 1.000);
    }

  </style>

  <div class="tooltip-container">
  
    <svg viewBox="0 0 20 20" class="alert">
      <circle cx="10" cy="10" r="10" fill="#3280F4"/>
      <path d="M8.15991 2.40002H11.8399L10.6399 13.36H9.39991L8.15991 2.40002Z" fill="white"/>
      <ellipse cx="9.95998" cy="16.28" rx="1.48" ry="1.48" fill="white"/>
    </svg>
  
    <svg viewBox="0 0 20 20" class="close">
      <circle cx="10" cy="10" r="10" fill="#3280F4"/>
      <rect x="4" y="5.6405" width="2.32" height="14.56" transform="rotate(-45 4 5.6405)" fill="white"/>
      <rect x="5.64038" y="15.9359" width="2.32" height="14.56" transform="rotate(-135 5.64038 15.9359)" fill="white"/>
    </svg>

    <div class="notify-container">
      <slot name="message"/>
    </div>
  </div>
`;


class Tooltip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  tooltip(expandState) {
    const tooltip = this.shadowRoot.querySelector('.notify-container');
    const alert = this.shadowRoot.querySelector('.alert');
    const close = this.shadowRoot.querySelector('.close');

    if (expandState == true) {
      tooltip.style.transform = 'scale(1)';
      alert.style.display = 'none';
      close.style.display = 'block';
      expandState = false;
    } else {
      tooltip.style.transform = 'scale(0)';
      close.style.display = 'none';
      alert.style.display = 'block';

    }
  }

  connectedCallback(){
    this.shadowRoot.querySelector('.alert').addEventListener('click', () => {
      this.tooltip(true);
    });

    this.shadowRoot.querySelector('.close').addEventListener('click', () => {
      this.tooltip(false);
    });
    
    if (this.getAttribute('tip_background')) {
      this.shadowRoot.querySelector('.notify-container').style.background = this.getAttribute('tip_background');
    }
    
    if (this.getAttribute('tip_color')) {
      this.shadowRoot.querySelector('.notify-container').style.color = this.getAttribute('tip_color');
    }
  }
}

window.customElements.define('popup-notify', Tooltip);