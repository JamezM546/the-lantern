import {expect, it} from "vitest"
import { formatStatus } from "../helpers/status.js"

it("get manga status", () => {
    expect(formatStatus("RELEASING")).toBe("Ongoing")
})

//For unknown code, we can use any name
it("get unknown manga status if status is not available", () => {
    expect(formatStatus("ABANDONED")).toBe("ABANDONED")
})
