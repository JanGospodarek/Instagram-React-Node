const model = require("../model/model");
module.exports = {
  getSpecifiedTagObject(index) {
    return {
      id: index,
      name: model.tags[index],
      popularity: Math.floor(Math.random() * 1000),
    };
  },
  addTag(data) {
    const index = model.tagsObjects.findIndex((el) => el.name == data.name);
    if (index == -1) {
      model.tagsObjects.push({ id: model.tags.length, ...data });
      return model.tagsObjects;
    } else {
      return "Tag with name " + data.name + " already exists";
    }
  },
};
