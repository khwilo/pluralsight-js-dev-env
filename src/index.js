import './index.css';

import { getUsers, deleteUser } from './api/userApi';

const usersBodyID = document.getElementById('users');

// Populate the users' table
getUsers().then(result => {
  let usersBody = "";

  result.forEach(user => {
    usersBody += `<tr>
      <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
      <td>${user.id}</td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
    </tr>`
  });

  usersBodyID.innerHTML = usersBody;

  const deleteLinks = document.getElementsByClassName('deleteUser');

  Array.from(deleteLinks, link => {
    link.onclick = event => {
      const element = event.target;
      event.preventDefault();
      deleteUser(element.attributes["data-id"].value);
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    }
  });
});
