let _list = [];
_list.push(window.location.search.split('?p=')[1]);

function setList(list) {
  return window.localStorage.setItem('list', JSON.stringify(list));
}

function getList() {
  return window.localStorage.list;
}

window.onload = function () {
  const element = document.querySelector('.list-box');
  if (!element) {
    return null;
  }
  element.addEventListener('click', function (e) {
    const list = getList();
    if (!list) {
      setList(_list);
    }

    const localStorageList = list || JSON.parse(_list);
    const curUrl = window.location.search.split('?p=')[1] || 1;

    if (e.target.marked) {
      return null;
    }

    if (localStorageList.indexOf(curUrl) === -1) {
      _list.push(...localStorageList, curUrl);
    }

    setList(_list);
    e.target.marked = true;
    e.target.text += '√';
  });
}

let timeId = null;
(function onReady() {
  let ele = document.querySelectorAll('.list-box li a');
  if (ele.length) {
    console.log('complete');
    clearTimeout(timeId);
    const list = getList('list') || JSON.stringify(_list);
    if(!list) {
      setList(_list);
    }
    ele.forEach((e, index) => {
      JSON.parse(list).forEach(item => {
        if (item == index + 1) {
          if (e.innerText.indexOf('√') > -1) {
            return null;
          }
          e.marked = true;
          e.innerText += '√';
        }
      });
    })
  } else {
    console.log('complete not');

    timeId = setTimeout(() => {
      return onReady();
    }, 500);
  }
})();