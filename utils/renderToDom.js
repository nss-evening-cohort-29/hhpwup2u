/* eslint-disable indent, no-trailing-spaces, no-multiple-empty-lines */
const renderToDOM = (divId, content) => {
    const selectedDiv = document.querySelector(divId);
    selectedDiv.innerHTML = content;
  };
  
  export default renderToDOM;
