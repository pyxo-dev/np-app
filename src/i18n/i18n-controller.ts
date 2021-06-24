import { ReactiveController, ReactiveControllerHost } from 'lit';

export class I18nController implements ReactiveController {
  host: ReactiveControllerHost;

  updateRequested = false;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    host.addController(this);
  }

  hostConnected() {
    window.addEventListener('np:i18n:langchange', this.requestHostUpdate);
  }

  hostDisconnected() {
    window.removeEventListener('np:i18n:langchange', this.requestHostUpdate);
  }

  private requestHostUpdate = () => {
    this.updateRequested = true;
    this.host.requestUpdate();
    this.host.updateComplete.then(() => {
      this.updateRequested = false;
    });
  };
}
