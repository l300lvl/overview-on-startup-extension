/*various code credit Panacier*/
const Main = imports.ui.main;
const Config = imports.misc.config;

const Gettext = imports.gettext.domain('overviewonstartup');
const _ = Gettext.gettext;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;
const Keys = Me.imports.keys;

const age = Config.PACKAGE_VERSION.split('.');
const showView = Main.overview;

function OverviewOnStartup(extensionMeta) {
    this._settings = Convenience.getSettings();
//disable connect for now, since it isnt being used
//    this._settingsSignals = [];
//    this._settingsSignals.push(this._settings.connect('changed::'+Keys.APPDISPLAY, this));
    this.appsDisplay = this._settings.get_string(Keys.APPDISPLAY);

    if (global.display.focus_window == null) {
        showView.show();
        if (this.appsDisplay == 'yes') {
            if (age[1] > 4) {
                showView._viewSelector._showAppsButton.checked = true;
            } else {
                showView._viewSelector.switchTab("applications");
            }
        }
    }
}

function enable() {
    new OverviewOnStartup();
}

function disable() {
    showView.hide();
}

function init() {
}
