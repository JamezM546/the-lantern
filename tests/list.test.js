import {expect, it} from "vitest";
import { addToList } from "../helpers/list.js";

function createStorage() {
    let saved = null;
    return {
        setItem(key, value) {
            saved = value;
        },
        getItem(key) {
            return saved;
        },
    };
}

it("save a manga to the local storage", () => {
    const storage = createStorage();
    addToList([], { id: 1 }, storage);
    const stored = JSON.parse(storage.getItem("lantern_list"));
    expect(stored[0].id).toBe(1);
});

it("does not save duplicate manga", () => {
    const storage = createStorage();
    const list = [];
    addToList(list, { id: 1 }, storage);
    addToList(list, { id: 1 }, storage);
    const stored = JSON.parse(storage.getItem("lantern_list"));
    expect(stored.length).toBe(1);
});
