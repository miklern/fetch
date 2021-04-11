/* Вывод блоков Вывод пользователей и их фото*/

async function getUsersInformation() {

   let usersInformation = await fetch('https://jsonplaceholder.typicode.com/users')
   let usersPhoto = await fetch('https://jsonplaceholder.typicode.com/photos')

   let information = await usersInformation.json()
   let photo = await usersPhoto.json()

   photo = photo.splice(0, 10)

   let usersList = document.querySelector('.users__list')

   const conctPhotoInfotmation = information.concat(photo);

   for ( let key in conctPhotoInfotmation ) {

      usersList.innerHTML += `
      <div class="users__body">
         <div class="users__photo">
         <img src="${photo[key].thumbnailUrl}">
         </div> 
         <a href="index2.html" class="users__name">${information[key].name}</a>
      </div> 
      `
   }
}


getUsersInformation()

/* Вывод блоков Вывод пользователей и их фото*/