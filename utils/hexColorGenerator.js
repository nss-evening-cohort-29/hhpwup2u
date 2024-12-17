// Takes in an array and returns a list of unique hex color values equal to the length of the array passed in.

const hexColorGenerator = (array) => {
  const randomColors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF',
    '#FF8C00', '#8000FF', '#00FF8C', '#8C00FF', '#FF0033',
    '#33FF8C', '#8CFF33', '#FF338C', '#8C33FF', '#33A1FF',
    '#A1FF33', '#FF5733', '#33FF57', '#33A1FF', '#57FF33',
    '#C0FF33', '#FF33C0', '#C0A133', '#FF6600', '#00FF99',
    '#6600FF', '#0099FF', '#CC33FF', '#FF3366', '#00CCFF',
    '#33CCFF', '#FF9933', '#9933FF', '#FF00CC', '#33FF66',
    '#66FF33', '#FF33CC', '#33FF33', '#FF6699', '#99FF66',
    '#6600CC', '#00FF66', '#6633CC', '#CCFF00', '#FF0033',
    '#FF99CC', '#33FFCC', '#CC99FF', '#FF6600', '#0099CC'
  ];
  const arrayLength = array.length;
  return randomColors.slice(0, arrayLength);
};

export default hexColorGenerator;
