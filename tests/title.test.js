import {expect, it} from "vitest";
import { getDisplayTitle } from "../helpers/title.js";

it("retrieve an actual official manga title", () => {
    expect(getDisplayTitle({english: "Naruto", romaji: "NARUTO"})).toBe("Naruto")
})

it("if there is no english, use romaji title", () => {
    expect(getDisplayTitle({english: null, romaji: "NARUTO"})).toBe("NARUTO")
})
