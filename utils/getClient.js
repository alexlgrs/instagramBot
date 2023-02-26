const { IgApiClientRealtime, withRealtime } = require("instagram_mqtt");
const {
    GraphQLSubscriptions
} = require("instagram_mqtt/dist/realtime/subscriptions");
const { IgApiClient } = require("instagram-private-api");
const {
    SkywalkerSubscriptions
} = require("instagram_mqtt/dist/realtime/subscriptions");
const {username, password} = require("./params")

module.exports = async () => {
    return new Promise(async resolve => {
        const ig = withRealtime(new IgApiClient()); 
        ig.state.generateDevice(username);
        await ig.account.login(username, password);
        
        ig.realtime.on("error", console.error);
        ig.realtime.on("close", () => console.error("Erreur, connexion en temps réel fermée"));

        await ig.realtime.connect({
            irisData: await ig.feed.directInbox().request(),
            connectOverrides: {}
        });

        ig.realtime.direct.sendForegroundState({
            inForegroundApp: true,
            inForegroundDevice: true,
            keepAliveTimeout: 60
        });
        resolve(ig);
    });
};
