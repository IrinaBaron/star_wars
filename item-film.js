export function render(data) {
  
  console.log(data.results)
  let idList = location.search.slice(1);
  
  const container = document.createElement('div');
  container.classList.add('container');

  data.results.forEach(elem => {
    if (data.results.indexOf(elem) == (idList - 1)) {
      const h1 = document.createElement('h1');
      h1.textContent = elem.title + ' ' + elem.episode_id;

      const btnBack = document.createElement('a');
      btnBack.classList.add('btn-primary', 'btn');
      btnBack.textContent = 'Back to episodes';
      btnBack.href = `index.html`;
      btnBack.addEventListener('click', async (e) => {
        e.preventDefault();
        history.pushState(window.history.state, null, `index.html`);
        document.querySelector('#app').innerHTML = '';
        
        let {render} = await import ('./list.js');
        document.querySelector('#app').append(render(data));
      })

      const text = document.createElement('p');
      text.textContent = elem.opening_crawl;

      const h2 = document.createElement('h2');
      h2.textContent = 'Planets';
      const ulPlanet = document.createElement('ul');
      ulPlanet.classList.add('list-group', 'col-2');

      let arr;
      let urls = elem.planets;
      let requestes = urls.map(url => fetch(url));
      
      Promise.all(requestes)
      .then(responses => responses.forEach(async(response) => {
        arr = await response.json();
        
        const liPlanet = document.createElement('li');
        liPlanet.classList.add('list-group-item');
        liPlanet.textContent = arr.name;
        ulPlanet.append(liPlanet)
      }));

      const hTwo = document.createElement('h2');
      hTwo.textContent = 'Species';

      const ulSpecies = document.createElement('ul');
      ulSpecies.classList.add('list-group', 'col-2');

      let urlSpecies = elem.species;
      
      let requestes2 = urlSpecies.map(url => fetch(url)
      .then((response) =>{
        return response.json();
      })
      .then((data) => {
        
        const liSpecies = document.createElement('li');
        liSpecies.classList.add('list-group-item');
        liSpecies.textContent = data.name;
        ulSpecies.append(liSpecies);
      }));

      const producer = document.createElement('p');
      producer.textContent = elem.producer;

      const date = document.createElement('p');
      date.textContent = elem.release_date;

      container.append(h1);
      container.append(btnBack);
      container.append(text);
      container.append(h2);
      container.append(ulPlanet);
      container.append(hTwo);
      container.append(ulSpecies);
      container.append(producer);
      container.append(date);
    }
    
  })

  return container
}