const config = {
    env: 'proda',
    get apiIpWithPort() {
        return this.env === 'prod' ? 'https://api.amplieto.com' : 'http://localhost:3100'
    },
    get apiBaseurl() {
        return 'http://' + this.apiIpWithPort
    },
    get apiUrl() {
        return this.apiIpWithPort + '/admin/';
    },
    get amitLabUrl(){
        return "https://amplieto.com"
    }
}

export default config;
