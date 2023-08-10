/**
 * The Comedian Module
 * Gives the companion the ability make jokes, memes, silly words, or animated gifs
 */

function _handleDictationSkill(event) {
    // debugger
    window.companion.SendMessage({type: "MAKE_DICTATION", user: event.name, value: event.value}, {run_immediately: true});
    // window.companion.SendMessage({type: "TEXT", user: event.name, value: event.value}, {run_immediately: true});
    setTimeout(() => {
        window.hooks.emit("hack_delay", "Speak the dictation word three times, don't speak anything else!");
    }, 100);
}

function _handleApiResponse(response) {
    const responseObj = JSON.parse(response);
    const name = window.companion.GetCharacterAttribute('name');
    if (responseObj.url) {
        //Is a meme
        window.companion.SendMessage({ type: "WEB_IMAGE", user: name, value: responseObj.url, timestamp: Date.now(), alt: responseObj.description});
    } else {
        //Is a joke
        const joke = JSON.parse(response).joke.replace(/\\/g, '');
        window.hooks.emit('moemate_core:handle_skill_text', {name: name, value: joke});
    }
}

export function init() {
    window.hooks.on('dictation:handle_dictation_skill', _handleDictationSkill)
    // window.hooks.on('comedian:handle_meme_skill', _handleMemeSkill)
    // window.hooks.on('models:response:comedian:humorapi', _handleApiResponse)
}