import { LIMIT, ENDPOINT } from "./const.js";
import request from "./main.js";

const UsersCard = document.querySelector(".users__card");


function getUsers({ avatar_url, login, followers_url, following_url, id }) {
  return ` <div class="users__card__box">
              <img src="${avatar_url}" alt="">
              <h3>${login}</h3>
              <h5>Id: ${id} </h5>
            </div>`;
}

async function getUsersCrud() {
  UsersCard.innerHTML = "loading....";
  try {
    // let query = URLSearchParams({
    //   q: search,
    //   page: activePage,
    //   limit: LIMIT,
    // });
    const Users = await request(`${ENDPOINT}`);
    UsersCard.innerHTML = "";
    Users.map((res) => {
      UsersCard.innerHTML += getUsers(res);
    });
  } catch {
    console.log("error");
  }
}

getUsersCrud();
