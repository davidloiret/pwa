async function postData(url = '', data = {}) {
  console.log(url);
  const protoRegex = new RegExp('^(http|https)://');
  if (!protoRegex.test(url)) {
    url = `https://${url}`;
  }
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

document.addEventListener('DOMContentLoaded', () => { 
  const target = document.querySelector('#main-form');
  target.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = e.target[0].value;
    try {
      const data = await postData(url, {data: 'data'});
      console.log(data);
      const resElm = document.querySelector('#result');
      resElm.textContent = data.result;
    } catch (e) {
      console.error(e);
      const errorElm = document.querySelector('#error');
      errorElm.textContent = e;
      return false;
    }
  });
}, false);
