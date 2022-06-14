import FormControl from 'utils/classes/FormControl';

const parsedText = (text) => text.toLowerCase().trim().replace(/\ /g, '');

const filterByName = (label = '', items = []) => {
  const filteredItem = items.filter((item) => {
    const parsedItem = parsedText(
      FormControl.decryptData({ title: item.title }).title
    );
    const pardedLabel = parsedText(label);
    return parsedItem.includes(pardedLabel);
  });
  return filteredItem;
};

export default filterByName;
