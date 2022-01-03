import { writable, get } from "svelte/store";
import io from 'socket.io-client';
import { findIndex } from "lodash";

export const store = writable({
    homeScore: 0
})

const socket = io("http://192.168.1.161:8080");

export function updateKey(key, value) {
    socket.emit("update-key", key, value);
}

function updateBulk(payload) {
    store.update((x) => {
        return {...x, ...payload}
    })
}

export function casparEvent(action, item, layer) {
    socket.emit("casparcg", action, item, parseInt(layer))
}

socket.on("state-update", updateBulk)
socket.emit("get-cache", updateBulk)


export function processMacro(macro) {
    let st = get(store)
    switch(macro.charAt(0)) {
        case "1":
            var index = findIndex(st.stats.teams.H, (p) => p.uni == macro.slice(1))
            if(index != -1) updateKey("homePlayerNum", index)
            updateKey("scoreboard:toggle-home", null)
            break;
        case "2":
            var index = findIndex(st.stats.teams.V, (p) => p.uni == macro.slice(1))
            if(index != -1) updateKey("awayPlayerNum", index)
            updateKey("scoreboard:toggle-away", null)
    }
}