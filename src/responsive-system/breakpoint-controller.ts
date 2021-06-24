import { ReactiveController, ReactiveControllerHost } from 'lit';

export class BreakpointController implements ReactiveController {
  host: ReactiveControllerHost;

  updateRequested = false;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    host.addController(this);
  }

  hostConnected() {
    window.addEventListener('np:responsive:bpchange', this.requestHostUpdate);
  }

  hostDisconnected() {
    window.removeEventListener(
      'np:responsive:bpchange',
      this.requestHostUpdate
    );
  }

  private requestHostUpdate = () => {
    this.updateRequested = true;
    this.host.requestUpdate();
    this.host.updateComplete.then(() => {
      this.updateRequested = false;
    });
  };
}
