function selectAll(collection) {

  try {
    if (collection == null || (!collection.length && !collection.querySelector)) {
      throw new Error(`Collection cannot be found.`);
    }
  } catch (e) {
    console.warn(e.message);
    return;
  }

  const defaults = {
    title: 'Select all items'
  };

  let options = defaults;

  const bindSelectAll = function(e) {
    e.stopPropagation();
  };

  const initSelectAll = function(element) {
    let selectAll = element;

    if(element.nodeName !== 'INPUT') {
      let chkSelectAll = createSelectAllCheckbox();

      element.parentNode.insertBefore(chkSelectAll, element);
      selectAll = chkSelectAll;
    }

    selectAll.addEventListener('click', bindSelectAll);
  };

  const createSelectAllCheckbox = function() {
    const chkSelectAllLabel = document.createElement('label');
    const chkSelectAllInput = document.createElement('input');

    chkSelectAllInput.type = 'checkbox';
    chkSelectAllInput.classList.add('js-select-all');

    chkSelectAllLabel.appendChild(chkSelectAllInput);
    chkSelectAllLabel.innerHTML += ` ${options.title}`;

    return chkSelectAllLabel;
  };

  const extendDefaults = function(obj) {
    let options = defaults;

    for (let x in obj) {
      if (defaults.hasOwnProperty(x)) {
        options[x] = obj[x];
      }
    }
    return options;
  };

  // extending default settings, if applicable
  if (({}).toString.call(arguments[1]) == '[object Object]') {
    options = extendDefaults(arguments[1]);
  }

  if (collection.length) {
    collection = [].forEach.call(collection, initSelectAll);
  } else {
    initSelectAll(collection);
  }
}

selectAll(document.querySelectorAll('.js-select-all'), {
  title: 'Select pizza toppings'
});
