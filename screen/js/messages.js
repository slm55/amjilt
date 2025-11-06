// messages.js - rotating messages module
export class RotatingMessages {
  constructor({ targetId = 'rotatingMessage', messages = [], intervalMs = 25000 } = {}) {
    this.target = document.getElementById(targetId);
    this.messages = messages && messages.length ? messages.slice() : ["Welcome to Amjilt Cyber School — where innovation begins."];
    this.intervalMs = intervalMs;
    this.index = 0;
    this.timer = null;
  }

  _showNext() {
    if (!this.target) return;
    const next = this.messages[this.index % this.messages.length];
    // animate fade
    this.target.style.opacity = '0';
    this.target.style.transform = 'translateY(6px)';
    setTimeout(() => {
      this.target.textContent = next;
      this.target.style.opacity = '1';
      this.target.style.transform = 'translateY(0)';
    }, 400);
    this.index++;
  }

  start() {
    if (!this.target) return;
    // show first immediately
    this._showNext();
    this.timer = setInterval(() => this._showNext(), this.intervalMs);
    // pause on hover (useful for touch)
    this.target.addEventListener('mouseover', () => this.pause());
    this.target.addEventListener('mouseout', () => this.resume());
  }

  pause() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  resume() {
    if (!this.timer) {
      this.timer = setInterval(() => this._showNext(), this.intervalMs);
    }
  }

  stop(){
    this.pause();
    this.index = 0;
  }
}
