const model = require('../model/model')
const fs = require('fs')

module.exports = {
    addPhoto: (form, req, path) => {
        form.uploadDir = `${path}/temp`      // folder do zapisu zdjęcia
        form.keepExtensions = true
        form.parse(req, function (err, fields, files) {

            const albumName = fields.album;
            const newFileName = files.file.path.split('\\')[files.file.path.split('\\').length - 1]

            fs.mkdir(`${path}/albums/${albumName}`, (err) => {
                fs.rename(files.file.path, `${path}/albums/${albumName}/${newFileName}`, (err) => {
                    const photo = new model.Photo(Date.now(), albumName, files.file.name, `${path}/albums/${albumName}/${newFileName}`, 'original', [{ status: "original", lastModifiedDate: files.file.lastModifiedDate }])
                    model.photos.push(photo)
                })
            })
        });
    }
}