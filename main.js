const app = document.querySelector(".app");

/* Создание header  */

function createHeader() {
  const headerContainer = document.createElement('div');
  headerContainer.classList.add('header');
  headerContainer.append(createBreadCrumbs());

  app.append(headerContainer);
}

function createBreadCrumbs() {
  const crumb = document.createElement('div');
  crumb.classList.add('bread-crumbs');
  crumb.innerHTML = `<span>List</span>`;
  crumb.addEventListener('click', removeActiveClass);
  return crumb;
}

function removeActiveClass() { 
  const activeCrumb = document.querySelector('.bread-crumbs.active'); 
  const activeName = document.querySelector('.user__name.active');
  const userContainer =  document.querySelector('.user__information');
  const userAlbums = document.querySelector('.user__albums');
  if (activeCrumb === this) {
    activeCrumb.classList.remove('active');
    activeName.classList.remove('active');
    userContainer.remove();
    userAlbums.remove();
  } 
}

/* Создание header */

/* FETCH ЗАПРОС */

function getAPI() {
  const url = "https://jsonplaceholder.typicode.com";

  async function fetchUsers() {
    try {
      const rawData = await fetch(`${url}/users`);
      const users = await rawData.json();

      console.log("fetching users", users);
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchUserAlbums(userId) {
    if (!userId) {
      console.log("there is no user id for fetching");

      return null;
    }
    try {
      const rawData = await fetch(`${url}/albums?userId=${userId}`);

      const albums = await rawData.json();

      console.log("fetching user albums", albums);
      return albums;
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchUserInfo(id) {
    if (!id) {
      console.log("there is no user id for fetching");

      return null;
    }
    try {
      const rawData = await fetch(`${url}/users?id=${id}`);

      const info = await rawData.json();

      console.log("fetching user info", info);
      return info;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    fetchUsers,
    fetchUserAlbums,
    fetchUserInfo
  };
}

/* FETCH ЗАПРОС */

/* Создание пользователя */

const serverAPI = getAPI();

async function renderUsers(users) {
  console.log("rendering users");

  const usersContainer = document.createElement("div");
  usersContainer.classList.add("users");

  const userBody = document.createElement("div");
  userBody.classList.add("user__body");
  usersContainer.append(userBody);

  if (users) {
    for (const user of users) {
      userBody.append(renderUser(user));
    }
  }

  app.append(usersContainer);
}

function renderUser(user) {
  if (user) {
    const userContainer = document.createElement("div");
    userContainer.append(user.name);
    userContainer.classList.add("user__name");
    userContainer.setAttribute('data-id', user.id);
    
    return userContainer;
  }
}

/* Создание пользователя */

/* Создание блоков информации пользователя */
async function renderUsersInfo(userInfo) {
  console.log("rendering users info");

  let infoContainer = document.querySelector(".user__information");

  if (infoContainer) {
    infoContainer.remove();
  } 
  infoContainer = document.createElement('div');
    infoContainer.classList.add('user__information');

    if (userInfo) {
      for (const info of userInfo) {
        infoContainer.innerHTML = `
                                  <div><span>Username:</span> ${info.username}</div>
                                  <div><span>Email:</span> ${info.email}</div>
                                  <div><span>Street:</span> ${info.address.street}</div>
                                  <div><span>Suite:</span> ${info.address.suite}</div>
                                  <div><span>City:</span> ${info.address.city}</div>
                                  <div><span>Phone:</span> ${info.phone}</div>
                                  <div><span>Website:</span> ${info.website}</div>
                                  `;
      } 
    }
  return infoContainer;
}

function usersInfo() {
  const userName = document.querySelectorAll('.user__name');

   for (let i = 0; i < userName.length; i++) {
      let button = userName[i];
      button.addEventListener('click', async function ()  {   
        this.classList.add('active');

        const crumb = document.querySelector('.bread-crumbs');
        crumb.classList.add('active');

        const atr = this.getAttribute('data-id');
        const info = await serverAPI.fetchUserInfo(atr);
        this.append(await renderUsersInfo(info));

        const users = document.querySelector('.users');
        const albums = await serverAPI.fetchUserAlbums(atr);
        users.append(await renderUserAlbums(albums));
      });
   }
}

/* Создание блоков информации пользователя */

/* Создание альбома пользователя */

async function renderUserAlbums(userAlbums) {
  console.log("rendering users albums");

  let albumsContainer = document.querySelector(".user__albums");

  if (albumsContainer) {
    albumsContainer.remove();
  } 
    albumsContainer = document.createElement('div');
    albumsContainer.classList.add('user__albums');

    if (userAlbums) {
      for (const album of userAlbums) {
        albumsContainer.append(renderUserAlbum(album));
      } 
    }
   
  return albumsContainer; 
}

function renderUserAlbum(album) {
  if (album) {    
    const userTitle = document.createElement("div");
    userTitle.classList.add("user__albums_title");
    userTitle.setAttribute('data-albumId', album.id);
    userTitle.append(album.title);
    
    const albumContainer = document.createElement("div");
    albumContainer.classList.add("user__album");
    albumContainer.append(userTitle)
    
    return albumContainer;
  }
}

/* Создание альбома пользователя */

/* Создание footer  */

function createFooter() {
  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer');

  const footerText = document.createElement('div');
  footerText.innerHTML = `@Lorem Ipsum Amet`;
  footerText.classList.add('footer__text');
  footerContainer.append(footerText);

  app.append(footerContainer);
}

/* Создание footer */

/* Вывод на страницу */

async function onDocumentLoaded() {
  console.log("document is loaded");

  const users = await serverAPI.fetchUsers();

  renderUsers(users);
}

if (document.readyState !== "loading") {
  createHeader(); 
  onDocumentLoaded();
  usersInfo();
  createFooter();
} else {
  document.addEventListener("DOMContentLoaded", async function () {
    createHeader();
    await onDocumentLoaded();
    await usersInfo();
    createFooter();
  });
}

/* Вывод на страницу */