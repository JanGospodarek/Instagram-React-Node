class Photo {
  constructor(id, album, originalName, url, lastChange, history) {
    this.id = id;
    this.album = album;
    this.originalName = originalName;
    this.url = url;
    this.lastChange = lastChange;
    this.history = history;
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
module.exports = { Photo: Photo, photos: photos, tags: tags };
