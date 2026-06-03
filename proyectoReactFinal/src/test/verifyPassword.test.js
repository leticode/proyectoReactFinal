import {test, expect} from "vitest";
import verifyPassword from "../utils/verifyPassword.js";

test("debe devolver true para una contraseña válida", () => {
    expect(verifyPassword("clave12!")).toBe(true)
})

test("debe devolver false si tiene menos de 7 caracteres", () => {
    expect(verifyPassword("abc!12")).toBe(false)
})

test("debe devolver false si no tiene caracter especial", () => {
    expect(verifyPassword("clave123")).toBe(false)
})

test("debe devolver false si está vacía", () => {
    expect(verifyPassword("")).toBe(false)
})