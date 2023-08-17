import { expose } from 'comlink';

export let ws;

function onMessage(event) {}

export async function init() {}

export async function cleanup() {
    ws.close();
}

expose({
    init,
});
