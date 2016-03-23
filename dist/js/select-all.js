'use strict';

function selectAll(collection) {

  try {
    if (collection == null || !collection.length && !collection.querySelector) {
      throw new Error('Collection cannot be found.');
    }
  } catch (e) {
    console.warn(e.message);
    return;
  }

  var defaults = {
    title: 'Select all items'
  };

  var options = defaults;

  var bindSelectAll = function bindSelectAll(e) {
    e.stopPropagation();
  };

  var initSelectAll = function initSelectAll(element) {
    var selectAll = element;

    if (element.nodeName !== 'INPUT') {
      var chkSelectAll = createSelectAllCheckbox();

      element.parentNode.insertBefore(chkSelectAll, element);
      selectAll = chkSelectAll;
    }

    selectAll.addEventListener('click', bindSelectAll);
  };

  var createSelectAllCheckbox = function createSelectAllCheckbox() {
    var chkSelectAllLabel = document.createElement('label');
    var chkSelectAllInput = document.createElement('input');

    chkSelectAllInput.type = 'checkbox';
    chkSelectAllInput.classList.add('js-select-all');

    chkSelectAllLabel.appendChild(chkSelectAllInput);
    chkSelectAllLabel.innerHTML += ' ' + options.title;

    return chkSelectAllLabel;
  };

  var extendDefaults = function extendDefaults(obj) {
    var options = defaults;

    for (var x in obj) {
      if (defaults.hasOwnProperty(x)) {
        options[x] = obj[x];
      }
    }
    return options;
  };

  // extending default settings, if applicable
  if ({}.toString.call(arguments[1]) == '[object Object]') {
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