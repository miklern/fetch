const app = document.querySelector(".app");

/* Создание header  */

function renderHeader() {
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
  removeActiveCrumb();
  removeActiveName();
  removeUserContainer();
  removeUserAlbums();
}

function removeActiveCrumb() {
  const activeCrumb = document.querySelector('.bread-crumbs.active');
  activeCrumb.classList.remove('active');
  return activeCrumb;
}

function removeActiveName() {
  const activeName = document.querySelector('.user__name.active');
  activeName.classList.remove('active');
  return activeName;
}

function removeUserContainer() {
  const userContainer =  document.querySelector('.user__information');
  userContainer.remove();
  return userContainer;
}

function removeUserAlbums() {
  const userAlbums = document.querySelector('.user__albums');
  userAlbums.remove();
  return userAlbums;
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

  if (!infoContainer) {
    infoContainer = document.createElement('div');
    infoContainer.classList.add('user__information');

    console.log(userInfo)

    infoContainer.innerHTML = `
                              <div><span>Username:</span> ${userInfo[0].username}</div>
                              <div><span>Email:</span> ${userInfo[0].email}</div>
                              <div><span>Street:</span> ${userInfo[0].address.street}</div>
                              <div><span>Suite:</span> ${userInfo[0].address.suite}</div>
                              <div><span>City:</span> ${userInfo[0].address.city}</div>
                              <div><span>Phone:</span> ${userInfo[0].phone}</div>
                              <div><span>Website:</span> ${userInfo[0].website}</div>
                              `;
  } 
  return infoContainer;
}

function usersInfo() {

  const userBody = document.querySelector('.user__body');

 

  userBody.addEventListener('click', async function (event)  {  

      event.target.classList.add('active');
      const crumb = document.querySelector('.bread-crumbs');

      crumb.classList.add('active');

      getUsersInfo(event);
                          
      getUsersAlbums(event);

    });

}

async function getUsersInfo(event) {
      const userId = event.target.getAttribute('data-id');
      const info = await serverAPI.fetchUserInfo(userId);
      event.target.append(await renderUsersInfo(info));
}

async function getUsersAlbums(event) {
      const userId = event.target.getAttribute('data-id');
      const users = document.querySelector('.users');
      const albums = await serverAPI.fetchUserAlbums(userId);
      users.append(await renderUserAlbums(albums));
}

/* Создание блоков информации пользователя */

/* Создание альбома пользователя */

async function renderUserAlbums(userAlbums) {
  console.log("rendering users albums");

  let albumsContainer = document.querySelector(".user__albums");

  if (!albumsContainer) {
    albumsContainer = document.createElement('div');
    albumsContainer.classList.add('user__albums');

    if (userAlbums) {
      for (const album of userAlbums) {
        albumsContainer.append(renderUserAlbum(album));
      } 
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

function renderFooter() {
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
  usersInfo();
  renderHeader(); 
  renderFooter();
}

if (document.readyState !== "loading") {
  onDocumentLoaded();
} else {
  document.addEventListener("DOMContentLoaded", async function () {
    await onDocumentLoaded();
  });
}

/* Вывод на страницу */