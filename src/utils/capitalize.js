function capitalize(textLine = '') {
  const lowerTextLine = textLine.toLowerCase();
  return lowerTextLine.replace(/^\D/, lowerTextLine.charAt(0).toUpperCase());
}

export default capitalize;
