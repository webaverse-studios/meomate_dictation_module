
function _handleMakeDictationSkill(event) {
    window.companion.SendMessage({type: "MAKE_DICTATION", user: event.name, value: event.value}, {run_immediately: true});
    setTimeout(() => {
        window.hooks.emit("hack_delay", "Speak the latest listening practice word three times, don't speak anything else!");
    }, 100);
}

function _handleCheckDictationSkill(event) {
    window.companion.SendMessage({type: "CHECK_DICTATION", user: event.name, value: event.value}, {run_immediately: true});
    setTimeout(() => {
        window.hooks.emit("hack_delay", "Check if the user's listen and write down result is correct, and make some comments.");
    }, 100);
}

export function init() {
    window.hooks.on('dictation:handle_make_dictation_skill', _handleMakeDictationSkill)
    window.hooks.on('dictation:handle_check_dictation_skill', _handleCheckDictationSkill)
}