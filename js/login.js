import request from "./main.js";

const formInput = document.querySelector("#form");

formInput.addEventListener("submit", async function (e) {
  e.preventDefault();
  try {
    let user = {
      email: this.email.value,
      password: this.password.value,
    };
    await request("https://reqres.in/api/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    location = "../users.html";
  } catch (err) {
    alert("Xato kodni tog'rlap tering");
  }
});
