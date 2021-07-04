const myList = document.querySelector('ul');
const myRequest = new Request('products.json');

const render = fetch('https://jsonplaceholder.typicode.com/posts')
.then(response=>response.json()).then(data=>{

    const array = data.map((index,value)=>{
        let listItem = document.createElement('li');
        listItem.appendChild(document.createElement('p')).textContent = index.id;
        listItem.appendChild(document.createElement('p')).textContent = index.userId;
        listItem.append(index.title);
        listItem.appendChild(document.createElement('p')).textContent =index.body;
        listItem.appendChild(document.createElement('button')).textContent= "chi tiet"
        listItem.appendChild(document.createElement('button')).textContent= "xoa"
        myList.appendChild(listItem);
    })
})