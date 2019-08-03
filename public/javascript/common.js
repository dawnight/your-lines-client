// function hasClass(elem, className) {
//   let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
//   return reg.test(elem.className);
// }
//
// function addClass(elem, className) {
//   if (hasClass(elem, className)) {
//     return;
//   }
//   let newClassList = elem.className.split(' ');
//   newClassList.push(className);
//   elem.className = newClassList.join(' ');
// }
//
// function removeClass(elem, className) {
//   if (!hasClass(elem, className)) {
//     return;
//   }
//   let newClassList = elem.className.split(' ');
//   let markedIndex = newClassList.indexOf(className);
//   newClassList.splice(markedIndex, 1);
//   elem.className = newClassList.join(' ');
// }
