const { IgApiClient } = require("instagram-private-api");
const { get } = require("request-promise");

const igd = new IgApiClient()
module.exports = class InstaUser {
    constructor(userID, ig) {
        this.id = userID;
        this.ig = ig;
        this.thread = this.ig.entity.directThread([this.id]);
    }

    async send(content) {
        await this.thread.broadcastText(content);
        return true;
    }

    async fetchInfo() {
        if (!this.id) return false;
        let rawInfos = await this.ig.user.info(this.id);
        this.username = rawInfos.username;
        return rawInfos;
    }

    async sendImage(imgBuffer) {
        await this.thread.broadcastPhoto({ file: imgBuffer });
        return true;
    }

    async sendVoice(voiceBuffer) {
        await this.thread.broadcastVoice({file: voiceBuffer})
        return true
    }

    async sendLink(message, link){
        await this.thread.broadcastLink(message, [link]);
        return true;
    }
};