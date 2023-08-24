class ErrorResponse extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
function request(url, options) {
  return new Promise(async (resolve, reject) => {
    let res = await fetch(url, options);
    if (res.ok === false) {
      reject(new ErrorResponse(res.status, res.statusText));
    }
    let data = await res.json();
    resolve(data);
  });
}

const UsersCarda = document.querySelector(".user__aside");

function getUsers({ avatar_url, login, id, node_id }) {
  return ` <div class="users__card__box">
              <img src="${avatar_url}" alt="">
              <a href="../user.html?login=${login}">${login}</a>
              <h5>Id: ${id} </h5>
              <h5> ${node_id} </h5>
            </div>`;
}
const login = new URLSearchParams(location.search).get("login");

async function getUsersCrud() {
  try {
    const Users = await request(`https://api.github.com/users`);

    let CardUsers = Users.filter((res) =>  res.login == login);
    console.log(CardUsers);

    CardUsers.map((res) => {
      UsersCarda.innerHTML += getUsers(res);
    });
  } catch {
    console.log("error");
  }
}

getUsersCrud();
