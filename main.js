let cssPromises = {};

export function loadResource(src) {
  //JS
  if (src.endsWith('.js')) {
    return import(src);
  }
  //CSS
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;

      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => {
          resolve()
        })
      });

      document.head.append(link);
    }
    return cssPromises[src]
  }
  //Данные с сервера
  return fetch(src).then(res => res.json())

}
const appContainer = document.getElementById('app');
const searchParams = location.search;
console.log(searchParams)
function renderPage(moduleName, apiUrl, css) {
  
  Promise.all([moduleName, apiUrl, css].map(src => loadResource(src)))
    .then(([pageModule, data]) => {
      appContainer.innerHTML = '';
      appContainer.append(pageModule.render(data));
    })
}

if (searchParams) {
  //загрузка детальной страницы товара
  renderPage(
    './item-film.js',
    `https://swapi.dev/api/films/${searchParams}`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
  );
} else {
  
  renderPage(
    './list.js',
    'https://swapi.dev/api/films/',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
  )
}

window.addEventListener('popstate', () => {
  console.log(e.state);
  
});

