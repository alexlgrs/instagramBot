module.exports = {
    username: "nom du compte",
    password: "mdp du compte",
    apiKey: "clef api openai",
    ownerID: 5752196198,
    botID: 58167820991,
    languages: `
    • 🇿🇦 af : Afrikaans
    • 🇦🇱 sq : Albanian
    • 🇸🇦 ar : Arabic
    • 🇦🇲 hy : Armenian
    • 🇨🇦 ca : Catalan
    • 🇨🇳 zh : Chinese
    • 🇨🇳 zh-cn : Chinese (Mandarin/China)
    • 🇹🇼 zh-tw : Chinese (Mandarin/Taiwan)
    • 🇭🇰 zh-yue : Chinese (Cantonese)
    • 🇭🇷 hr : Croatian
    • 🇨🇿 cs : Czech
    • 🇩🇰 da : Danish
    • 🇳🇱 nl : Dutch
    • 🇺🇸 en : English
    • 🇦🇺 en-au : English (Australia)
    • 🇬🇧 en-uk : English (United Kingdom)
    • 🇺🇸 en-us : English (United States)
    • 🇪🇸 eo : Esperanto
    • 🇫🇮 fi : Finnish
    • 🇫🇷 fr : French
    • 🇩🇪 de : German
    • 🇬🇷 el : Greek
    • 🇭🇹 ht : Haitian Creole
    • 🇮🇳 hi : Hindi
    • 🇭🇺 hu : Hungarian
    • 🇮🇸 is : Icelandic
    • 🇮🇩 id : Indonesian
    • 🇮🇹 it : Italian
    • 🇯🇵 ja : Japanese
    • 🇰🇷 ko : Korean
    • 🇻🇦 la : Latin
    • 🇱🇻 lv : Latvian
    • 🇲🇰 mk : Macedonian
    • 🇳🇴 no : Norwegian
    • 🇵🇱 pl : Polish
    • 🇵🇹 pt : Portuguese
    • 🇧🇷 pt-br : Portuguese (Brazil)
    • 🇷🇴 ro : Romanian
    • 🇷🇺 ru : Russian
    • 🇷🇸 sr : Serbian
    • 🇸🇰 sk : Slovak
    • 🇪🇸 es : Spanish
    • 🇪🇸 es-es : Spanish (Spain)
    • 🇺🇸 es-us : Spanish (United States)
    • 🇹🇿 sw : Swahili
    • 🇸🇪 sv : Swedish
    • 🇮🇳 ta : Tamil
    • 🇹🇭 th : Thai
    • 🇹🇷 tr : Turkish
    • 🇻🇳 vi : Vietnamese
    • 🏴󠁧󠁢󠁷󠁬󠁳󠁿 cy : Welsh
    `,
    commands:{
        "ping":{
            "desc": "Permet de connaître la latence du bot.",
            "usage": "ping",
            "example": "ping",
            "name": "ping"
        },
        "setBio":{
            "desc": "Permet de changer la biographie du bot.",
            "usage": "setBio [Texte]",
            "example": "setBio Salut je suis stupide",
            "name": "setBio"
        },
        "help":{
            "desc": "Permet d'afficher la page d'aide du bot ou d'une commande.",
            "usage": "help (Commande)",
            "example": "help setBio\nhelp",
            "name": "help"
        },
        "say":{
            "desc": "Permet de recevoir un message vocal du bot, par défaut en francais.",
            "usage": "(langue_)say [Texte]",
            "example": "us_say Je parle avec la voix américaine\nsay Ca parle avec l'accent français wouhou",
            "name": "say"
        },
        "clearPdp":{
            "desc": "Permet de supprimer la photo de profil du bot.",
            "usage": "clearPdp",
            "example": "clearPdp",
            "name": "clearPdp"
        },
        "setPdp":{
            "desc": "Permet de définir la photo de profil du bot.",
            "usage": "setPdp",
            "example": "setPdp",
            "name": "setPdp"
        },
        "newPost":{
            "desc": "Permet de poster quelque chose sur le compte du bot.",
            "usage": "newPost",
            "example": "newPost",
            "name": "newPost"
        },
        "llist":{
            "desc": "Permet de recevoir la liste des langues accessibles avec la commande say",
            "usage": "llist",
            "example": "llist",
            "name": "llist"
        },
        "cat":{
            "desc": "Permet de recevoir une photo de chat, prend du temps",
            "usage": "cat",
            "example": "cat",
            "name": "cat"
        },
        "lc":{
            "desc": "Permet de connaître le pourcentage d'amour !",
            "usage": "lc [@utilisateur / objet] (@utilisateur / objet)",
            "example": "\nlc @marina.jdx\nlc bouffe\nlc @marina.jdx @oliviergiroud\nlc foot psg\nlc @marina.jdx raclette\nlc foot @marina.jdx",
            "name": "lc"
        },
        "voy":{
            "desc": "Permet de poser une question fermée à la voyante.",
            "usage": "voy [question]",
            "example": "voy Je vais aller en Russie bientôt ?\nvoy T'es interessante ?",
            "name": "voy"
        },
        "ask":{
            "desc": "Permet de poser une question et d'avoir une vraie réponse.",
            "usage": "ask [question]",
            "example": "ask Quelle est la recette de la tarte aux pommes ?",
            "name": "ask"
        },
        "cow":{
            "desc": "Permet de faire parler une vache.",
            "usage": "cow [phrase]",
            "example": "cow Ca mange de l'herbe ici",
            "name": "cow"
        }

    }

}
