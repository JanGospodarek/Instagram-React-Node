const model = require("../model/model");
module.exports = {
  getTagObjects() {
    const arr = [];
    model.tags.forEach((el, i) => {
      arr.push({
        id: i,
        name: el,
        popularity: Math.floor(Math.random() * 1000),
      });
    });
    return arr;
  },
  getSpecifiedTagObject(index) {
    return {
      id: index,
      name: model.tags[index],
      popularity: Math.floor(Math.random() * 1000),
    };
  },
};
