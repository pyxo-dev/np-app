import { ReactiveController, ReactiveControllerHost } from 'lit';

export class I18nController implements ReactiveController {
  host: ReactiveControllerHost;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    host.addController(this);
  }

  hostConnected() {
    window.addEventListener('np:i18n:langchange', this._requestHostUpdate);
  }

  hostDisconnected() {
    window.removeEventListener('np:i18n:langchange', this._requestHostUpdate);
  }

  private _requestHostUpdate = () => {
    this.host.requestUpdate();
  };
}
