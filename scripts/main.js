function httpGet(url) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      }
      else {
        reject(Error(req.statusText));
      }
    };

    req.onerror = reject;
    req.send();
  });
}

function getTypes(items) {
  return items.reduce((types, item) => {
    if (types.indexOf(item.type) === -1) { 
      types.push(item.type) 
    }
    return types 
  }, [])
}

function addType(type, index, types) {
  var typeRadio = document.createElement('input');
  typeRadio.type = 'radio';
  typeRadio.name = 'type';
  typeRadio.id = type;
  typeRadio.addEventListener('click', function() {
    clearItems();
    addItems(types);
  });

  var typeLabel = document.createElement('label');
  typeLabel.htmlFor = type;
  typeLabel.appendChild(document.createTextNode(type));


  var typeList = document.querySelector('.typeList');
  typeList.appendChild(typeRadio);
  typeList.appendChild(typeLabel);
}

function getSelectedType() {
  var typeNodeList = document.getElementsByName('type');
  var types = Array.prototype.slice.call(typeNodeList);
  return types.filter(type => type.checked);
}

function setItems(items) {
  const types = getTypes(items);

  types.forEach(addType);
}

function clearItems() {
  var itemList = document.querySelector('.itemList');
  itemList.childNodes.forEach(node => itemList.removeChild(node));
}

function addItems(items) {
  //var item = document.createElement('input');
  //item.type = 'radio';
  console.log(items);
}

httpGet('items.json')
  .then(JSON.parse)
  .then(data => data.items)
  .then(setItems)

let form = document.querySelector(".stavklass");

form.addEventListener("submit", function(e) {
  let stamina = this["stamina"].value;
  let goldPerFight = +this["goldPerFight"].value;
  let maxGoldHold = (goldPerFight+12*2)/0.3;
  let maxGoldGet = maxGoldHold + goldPerFight + (stamina * 12/2);
  let tdMaxGoldHold = document.getElementById('maxGoldHold');
  tdMaxGoldHold.innerHTML = maxGoldHold;
  let tdMaxGoldGet = document.getElementById('maxGoldGet');
  tdMaxGoldGet.innerHTML = maxGoldGet;

  e.preventDefault();
});