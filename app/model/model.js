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
const photos = [];
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
  Photo: Photo,
  photos: photos,
  tags: tags,
  tagsObjects: tagObj,
};
