module.exports.command = async (ig, message) => {
    const func = require("../utils/functions")
    
    ig.account.removeProfilePicture();
    func.sendSucces("Photo de profil retirée", message);
}

exports.help = {
    "name": "clearPdp",
    "desc": "Permet de supprimer la photo de profil du bot.",
    "usage": "clearPdp",
    "example": "clearPdp"
}