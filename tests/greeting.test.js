import { expect, it } from "vitest";
import { getGreeting } from "../helpers/greeting.js";

it("expect a greeting string when passed in a certain time", () => {
    expect(getGreeting(5)).toBe("Good morning! What are you reading today?");
})

it("expect a greeting string for the else condition", () =>{
    expect(getGreeting(23)).toBe("Still up? Let's find something good!");
})