class Photo {
  constructor(id, album, originalName, url, lastChange, history, tags) {
    this.id = id;
    this.album = album;
    this.originalName = originalName;
    this.url = url;
    this.lastChange = lastChange;
    this.history = history;
    this.tags = tags;
  }
}
class User {
  constructor(id, name, email, password, confirmed, lastName) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.confirmed = confirmed;
    this.lastName = lastName;
  }
}
const photos = [];
const users = [];
const invalidTokens = [];
const tags = [
  "#love",
  "#instagood",
  "#fashion",
  "#photooftheday",
  "#art",
  "#photography",
  "#instagram",
  "#beautiful",
  "#picoftheday",
  "#nature",
  "#happy",
  "#cute",
  "#travel",
  "#style",
  "#followme",
  "#tbt",
  "#instadaily",
  "#repost",
  "#like4like",
  "#summer",
  "#beauty",
  "#fitness",
  "#food",
  "#selfie",
  "#me",
  "#instalike",
  "#girl",
  "#friends",
  "#fun",
];
const tagObj = [];
tags.forEach((el, i) => {
  tagObj.push({
    id: i,
    name: el,
    popularity: Math.floor(Math.random() * 1000),
  });
});

module.exports = {
  Photo,
  photos,
  users,
  tags,
  tagsObjects: tagObj,
  User,
  invalidTokens,
};
