import { writable } from "svelte/store";
import io from 'socket.io-client';

export const store = writable({
    homeScore: 0
})

const socket = io("http://localhost:8080");

export function updateKey(key, value) {
    socket.emit("update-key", key, value);
}

function updateBulk(payload) {
    store.update((x) => {
        return {...x, ...payload}
    })
}

socket.on("state-update", updateBulk)
socket.emit("get-cache", updateBulk)