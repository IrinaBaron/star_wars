export function render(data) {
  console.log(data.results)

  const container = document.createElement('ul');
  container.classList.add('list-group', 'container');

  for (const product of data.results) {
    
    const elemWrap = document.createElement('li');
    elemWrap.classList.add('list-group-item', 'list-group-flush');
    const productCard = document.createElement('div');
    productCard.classList.add('card-body');
    const id = document.createElement('p');
    id.classList.add('card-text');
    
    const title = document.createElement('h2');
    title.classList.add('card-title');
    const idUser = document.createElement('p');
    idUser.classList.add('card-text');
    const btnBody = document.createElement('a');
    btnBody.classList.add('btn-primary', 'btn');
   

    productCard.appendChild(id);
    productCard.appendChild(title);
    productCard.appendChild(idUser);
    productCard.appendChild(btnBody);
    elemWrap.appendChild(productCard);

    let numberOfList = (data.results.indexOf(product) + 1);

    id.textContent = numberOfList;
    title.textContent = product.title;
    
    btnBody.innerHTML = 'Read more';
    btnBody.href = `?${numberOfList}`;
    
    btnBody.addEventListener('click', async (e) => {
      e.preventDefault();
      
      history.pushState(window.history.state, null, `?${numberOfList}`);
      document.querySelector('#app').innerHTML = '';
      
      let {render} = await import ('./item-film.js');
      document.querySelector('#app').append(render(data));

      
    })
    
    container.appendChild(elemWrap);
  }

  return container
}

window.addEventListener('popstate', () => {
  console.log(e.state);
})