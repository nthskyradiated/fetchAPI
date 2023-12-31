document.getElementById("getText").addEventListener('click', getText);
document.getElementById("getUsers").addEventListener('click', getUsers);
document.getElementById("getData").addEventListener('click', getData);
document.getElementById("addPost").addEventListener('submit', addPost);


function getText() {
    fetch('sample.txt')
    .then(res => res.text())
    .then(data => {
        document.getElementById('output').innerHTML = data
    })
    .catch (err => console.log(err))

}
function getUsers() {
    fetch('users.json')
    .then(res => res.json())
    .then(data => {
        let output = '<h2>User List</h2>'
        data.forEach(user => {
        output += `
        <ul class="list-group mb-3">
        <li class="list-group-item">${user.id}</li>
        <li class="list-group-item">${user.name}</li>
        <li class="list-group-item">${user.email}</li>
        </ul>`
            
        });
        document.getElementById('output').innerHTML = output
    })
    .catch (err => console.log(err))
}
function getData() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => {
        let output = '<h2>Posts</h2>'
        data.forEach(post => {
        output += 
         `<div class="card card-body mb-3">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
         </div>`
            
        });
        document.getElementById('output').innerHTML = output
    })
    .catch (err => console.log(err))
}

function addPost(e) {
    e.preventDefault();

    let title = document.getElementById('title').value
    let body = document.getElementById('body').value

    let output =`<div class="card card-body">
    <h3>${title}</h3>
    <p>${body}</p>
    </div>`

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Accept' : 'application/json, text/plain, */*',
            'content-type': 'application/json'},
    body: JSON.stringify({title : title, body : body})
    })
    .catch (err => console.log(err))
    .then(res => res.json())
    .then(data =>console.log(data))
    document.getElementById('output').innerHTML = output
    document.getElementById("addPost").reset();
}