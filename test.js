let testAPI = 'https://jsonplaceholder.typicode.com/posts';


function start() {
    getTest(rederTest);
    handCreateForm();
    selectResponse()
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
                <button onclick="handEditForm(${test.id})">Sua<button>
            </li>`;
    });

    listBlock.innerHTML = htmls.join();
}

function handCreateForm() {

    document.querySelector('#edit').style.display = "none";
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

function editTest(data, callback) {

    options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    };

    fetch(testAPI + '/' + data.id, options)
        .then(function (response) {
            response.json();
        })
        .then(callback)
        .catch(error => console.log('Error:', error));

}


function handEditForm(id) {

    fetch(testAPI + '/' + id)
        .then((response) => response.json())
        .then(function (json) {
            document.querySelector('input[name="title"]').value = json.title;
            document.querySelector('input[name="body"]').value = json.body;
            document.querySelector('input[name="userId"]').value = json.userId;
            document.querySelector('#create').style.display = "none";
            document.querySelector('#edit').style.display = "block";

        });

    let editBtn = document.querySelector('#edit');

    editBtn.onclick = function () {
        let title = document.querySelector('input[name="title"]').value;
        let body = document.querySelector('input[name="body"]').value;
        let userId = document.querySelector('input[name="userId"]').value;

        let formData = {
            id: id,
            title: title,
            body: body,
            userId: userId,
        };
        editTest(formData, function () {
            getTest(rederTest);
        });
    };
}

function selectResponse() {

    let selectResponsex = document.querySelector('#select-response');

    selectResponsex.onchange = function () {
        if (document.querySelector('#select-response').value == "json") {
            fetch(testAPI)
            .then((response) => response.json())
            .then((json) => console.log(json));
        }
        if (document.querySelector('#select-response').value == "text") {
            fetch(testAPI)
            .then((response) => response.text())
            .then((text) => console.log(text));
        }
    };
}