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
   const userDiv = document.createElement('div');  

   userDiv.classList.add('users__name');

   userDiv.innerText = userData.name;

   userDiv.setAttribute('data-key', userData.id);

   return userDiv; 
}

function showList(data) {
   usersList = document.querySelector('.users__list');

   for (let names of data) {
      let userBody = document.createElement('div');
      userBody.classList.add('user__body');
      userBody.append(renderUser(names));
      usersList.append(userBody);
   }
}

getUsersNames(showList);



 document.addEventListener('click', ready); 

let userName;

function ready() {
   userBody = document.querySelectorAll('.user__body');

   for (let i = 0; i < userBody.length; i++) {
      let button = userBody[i];
      button.addEventListener('click', showIcon);
   }
}

function showIcon() {

      let userIcon = document.querySelector('.users__icon');
      if (userIcon) { 
         userIcon.remove();
      } else {  
         userIcon = document.createElement('div');
         userIcon.classList.add('users__icon'); 
         userIcon.innerHTML = 'Сюда нужна автарка с сервера, но ее пока нет((';     
      }
      this.append(userIcon);
} 

      
document.addEventListener('click', ready);  

