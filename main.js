function getUsersNames(userData) {
   fetch('https://jsonplaceholder.typicode.com/users')
      .then((data) => {
         return data.json();
      })
      .then((data) => {
         userData(data)  
      })
}

let usersList;

function renderUser(userData) {
   const userName = document.createElement('div');  

   userName.classList.add('users__name');

   userName.innerText = userData.name;

   return userName; 
}

let userBody;

function showList(data) {
   usersList = document.querySelector('.users__list');

   for (let names of data) {
      userBody = document.createElement('div');
      userBody.classList.add('user__body');
      userBody.append(renderUser(names));
      usersList.append(userBody);
   }
}

getUsersNames(showList);

function getUsersIcon(userData) {
   fetch('https://jsonplaceholder.typicode.com/photos')
      .then((data) => {
         return data.json();
      })
      .then((data) => {
         userData(data)
      })
}

function ready(data) {
   userBody = document.querySelectorAll('.user__body');
   
   for (let i = 0; i < userBody.length; i++) {
      let button = userBody[i];
      button.addEventListener('click', () => {
         let userIcon = document.querySelector('.users__icon');
         if (userIcon) { 
            userIcon.remove();
         } else {  
            userIcon = document.createElement('div');
            userIcon.classList.add('users__icon');  

            let icons = data.splice(0, 1); 
               for (let icon of icons) {
                  userIcon.append(renderIcon(icon)); 
                  }  
            } 
         button.append(userIcon);                   
      });
   }
}

function renderIcon(userData) {
      let iconImg = document.createElement('img');  
      iconImg.src = userData.thumbnailUrl;
      return iconImg;  
}

document.addEventListener('click', () => getUsersIcon(ready)); 

