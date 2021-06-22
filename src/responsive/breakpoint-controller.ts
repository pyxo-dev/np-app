import { ReactiveController, ReactiveControllerHost } from 'lit';

export class BreakpointController implements ReactiveController {
  host: ReactiveControllerHost;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    host.addController(this);
  }

  hostConnected() {
    window.addEventListener(
      'np:responsive:breakpointchange',
      this.requestHostUpdate
    );
  }

  hostDisconnected() {
    window.removeEventListener(
      'np:responsive:breakpointchange',
      this.requestHostUpdate
    );
  }

  private requestHostUpdate = () => {
    this.host.requestUpdate();
  };
}
