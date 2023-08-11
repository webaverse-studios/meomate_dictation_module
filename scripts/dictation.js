/**
 * The Comedian Module
 * Gives the companion the ability make jokes, memes, silly words, or animated gifs
 */

function _handleMakeDictationSkill(event) {
    // debugger
    window.companion.SendMessage({type: "MAKE_DICTATION", user: event.name, value: event.value}, {run_immediately: true});
    // window.companion.SendMessage({type: "TEXT", user: event.name, value: event.value}, {run_immediately: true});
    setTimeout(() => {
        window.hooks.emit("hack_delay", "Speak the latest listening practice word three times, don't speak anything else!");
    }, 100);
}

function _handleCheckDictationSkill(event) {
    // debugger
    window.companion.SendMessage({type: "CHECK_DICTATION", user: event.name, value: event.value}, {run_immediately: true});
    // window.companion.SendMessage({type: "TEXT", user: event.name, value: event.value}, {run_immediately: true});
    setTimeout(() => {
        window.hooks.emit("hack_delay", "Check if the user's listen and write down result is correct, and make some comments.");
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
    window.hooks.on('dictation:handle_make_dictation_skill', _handleMakeDictationSkill)
    window.hooks.on('dictation:handle_check_dictation_skill', _handleCheckDictationSkill)
    // window.hooks.on('comedian:handle_meme_skill', _handleMemeSkill)
    // window.hooks.on('models:response:comedian:humorapi', _handleApiResponse)
}