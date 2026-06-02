import verifyEmail from "../utils/verifyEmail.js";

console.log(
    "Caso 1: lucia@gmail.com",
    verifyEmail("lucia@gmail.com") ? "PASS" : "FAIL"
)

console.log(
    "Caso 2: lucia@gmail",
    verifyEmail("lucia@gmail") ? "PASS" : "FAIL"
)

console.log(
    "Caso 3: @gmail.com",
    verifyEmail("@gmail.com") ? "PASS" : "FAIL"
)

console.log(
    "Caso 4: luciagmail.com",
    verifyEmail("luciagmail.com") ? "PASS" : "FAIL"
)

