
export default class AppConfig {
    static ReleaseMode = false;

    static BackendUrl() {
        return this.ReleaseMode ? 'http://rnvscotlandyardrestapi.azurewebsites.net' : 'http://localhost:5000';
    }

    static SearchRadius() {
        return this.ReleaseMode ? 200 : 700;
    }
}