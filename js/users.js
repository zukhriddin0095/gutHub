import { LIMIT, ENDPOINT } from "./const.js";
import request from "./main.js";

const UsersCard = document.querySelector(".users__card");
const Pagination = document.querySelector(".pagination");
const SearchInput = document.querySelector(".header__searching__input");
const userName = document.querySelector(".user__aside")

let search = "";
let activePage = 1;

function getUsers({ avatar_url, login, id, node_id }) {
  return ` <div class="users__card__box">
              <img src="${avatar_url}" alt="">
              <a href="../user.html?login=${login}">${login}</a>
              <h5>Id: ${id} </h5>
              <h5> ${node_id} </h5>
            </div>`;
}

async function getUsersCrud() {
  UsersCard.innerHTML = `<span class="loader"></span>`;
  try {
    let query = new URLSearchParams({
      page: activePage,
      per_page: 30,
    });

    const Users = await request(`${ENDPOINT}/users?${query}`);

    UsersCard.innerHTML = ``;
    // UsersCard.innerHTML = `<span class="loader"></span>`;

    let pages = Math.ceil(Users.length / LIMIT);
    //  search
    SearchInput.addEventListener("keyup", function () {
      activePage = 1;
      search = this.value;
      let UsersSearch = Users.filter((pr) =>
        pr.login.toLowerCase().includes(search)
      );
      if (UsersSearch.length !== 0) {
        UsersCard.innerHTML = ``;
        UsersSearch.map((pr) => {
          let card = getUsers(pr);
          UsersCard.innerHTML += card;
        });
      } else {
        UsersCard.innerHTML = `<div class="no__products"> No Products: UNDIFINED </div>`;
      }
    });
    //  search
    // url...
    
    const login = new URLSearchParams(location.search).get("login");

    // url...

    Pagination.innerHTML = `<li class="page-item ${
      activePage === 1 ? "disabled" : ""
    }">
      <button class="page-link">Previous</button>
    </li>`;

    for (let i = 1; i <= pages; i++) {
      Pagination.innerHTML += `
        <li class="page-item ${
          i === activePage ? "active" : ""
        }"><button class="page-link">${i}</button></li>
      `;
    }

    Pagination.innerHTML += `<li class="page-item ${
      activePage === pages ? "disabled" : ""
    }">
      <button class="page-link">Next</button>
    </li>`;

    for (let i = 0; i < Pagination.children.length; i++) {
      let pageItem = Pagination.children[i];
      pageItem.addEventListener("click", () => {
        if (i === 0) {
          getPage("-");
        } else if (i === pages + 1) {
          getPage("+");
        } else {
          getPage(i);
        }
      });
    }

    Users.map((res) => {
      UsersCard.innerHTML += getUsers(res);
    });
  } catch {
    console.log("error");
  }
}

getUsersCrud();

function getPage(page) {
  console.log(page);
  if (page == "+") {
    activePage++;
  } else if (page == "-") {
    activePage--;
  } else {
    activePage = page;
  }
  getUsersCrud();
}




