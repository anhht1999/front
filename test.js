// const myList = document.querySelector('ul');
// const myRequest = new Request('products.json');

// const render = fetch('https://jsonplaceholder.typicode.com/posts')
// .then(response=>response.json()).then(data=>{

//     const array = data.map((index,value)=>{
//         let listItem = document.createElement('li');
//         listItem.appendChild(document.createElement('p')).textContent = index.id;
//         listItem.appendChild(document.createElement('p')).textContent = index.userId;
//         listItem.append(index.title);
//         listItem.appendChild(document.createElement('p')).textContent =index.body;
//         listItem.appendChild(document.createElement('button')).textContent= "chi tiet"
//         listItem.appendChild(document.createElement('button')).textContent= "xoa"
//     })
//         myList.appendChild(listItem);
// })

// let listBlock = document.querySelector('#list');

let testAPI = 'https://jsonplaceholder.typicode.com/posts';


function start() {
    getTest(rederTest);
    handCreateForm();
}

start();

function getTest(callback) {
    fetch(testAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function rederTest(test) {
    let listBlock = document.querySelector('#list');

    let htmls = test.map(function (test) {
        return `
            <li class = "test-item-${test.id}">
                <h4>${test.title}</h4> 
                <p>${test.body}</p> 
                <p>${test.userId}</p> 
                <p>${test.id}</p>
                <button onclick="deleteTest(${test.id})">Xoa<button>
            </li>
        `
    });

    listBlock.innerHTML = htmls.join();
}

function handCreateForm() {

    let createBtn = document.querySelector('#create');

    createBtn.onclick = function () {
        let title = document.querySelector('input[name="title"]').value;
        let body = document.querySelector('input[name="body"]').value;
        let userId = document.querySelector('input[name="userId"]').value;

        let formData = {
            title: title,
            body: body,
            userId: userId,
        };
        createTest(formData, function () {
            getTest(rederTest);
        });
    };
}

function createTest(data, callback) {

    let options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    };

    fetch(testAPI, options)
        .then(function (response) {
            response.json();
        })
        .then(callback);
}

function deleteTest(id) {

    options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    fetch(testAPI + '/' + id, options)
        .then(function (response) {
            response.json();
        })
        .then(function () {
            let testItem = document.querySelector('.test-item-' + id);
            if (testItem) {
                testItem.remove();
            }
        });

}

