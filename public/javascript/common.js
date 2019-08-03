function hasClass(elem, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(elem.className);
}

function addClass(elem, className) {
  if (hasClass(elem, className)) {
    return;
  }
  let newClassList = elem.className.split(' ');
  newClassList.push(className);
  elem.className = newClassList.join(' ');
}

function removeClass(elem, className) {
  if (!hasClass(elem, className)) {
    return;
  }
  let newClassList = elem.className.split(' ');
  let markedIndex = newClassList.indexOf(className);
  newClassList.splice(markedIndex, 1);
  elem.className = newClassList.join(' ');
}

window.$message = function (options) {
  let { status = 'success', content = '', duration = 3000 } = options;
  const MARK_RIGHT = '√';
  const MARK_WARN = '！';
  const MARK_WRONG = '×';

  let statusMark = MARK_RIGHT;
  if (status === 'warning') {
    statusMark = MARK_WARN;
  } else if (status === 'error') {
    statusMark = MARK_WRONG;
  }

  const HTML = `
      <div class="notice__wrapper">
        <p class="notice">
          <i class="icon ${status}">${statusMark}</i>
          <span class="content">${content}</span>
        </p>
      </div>
    `;

  const $messageDom = document.createElement('div');
  $messageDom.innerHTML = HTML;
  document.body.append($messageDom);

  setTimeout(() => {
    document.body.removeChild($messageDom);
  }, duration);

};

