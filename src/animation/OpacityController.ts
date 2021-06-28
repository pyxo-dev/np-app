import { ReactiveController, ReactiveControllerHost } from 'lit';

const ANIMATION_DURATION = 1000;

export class OpacityController implements ReactiveController {
  host: ReactiveControllerHost & HTMLElement;

  duration = ANIMATION_DURATION;

  constructor(host: ReactiveControllerHost & HTMLElement, duration?: number) {
    this.host = host;
    if (duration !== undefined) this.duration = duration;

    this.host.style.transition = `opacity ${this.duration}ms`;

    host.addController(this);
  }

  hostConnected() {
    if (this) {
      //
    }
  }

  animate = (callback = () => {}, duration = this.duration) => {
    if (this.host instanceof HTMLElement) {
      this.host.style.opacity = '0';

      setTimeout(() => {
        callback();
        if (this.host instanceof HTMLElement) this.host.style.opacity = '100%';
      }, duration);
    }
  };
}
