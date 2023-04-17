const model = require('../model/model')
const fs = require('fs')
module.exports = {
    getAllFiles: () => {
        return model.photos
    },
    getSpecifiedFile: (id) => {
        console.log(id);
        const index = model.photos.findIndex(el => el.id == id)
        if (index !== -1)
            return model.photos[index]
        else
            return { msg: 'There is no photo with id ' + id }
    },
    updateFile: (data) => {
        console.log(data);
        const index = model.photos.findIndex(el => el.id == data.id)

        if (index !== -1) {
            model.photos[index].lastChange = `${data.status} ${model.photos[index].history.length - 1}`
            model.photos[index].history.push({
                status: `${data.status} ${model.photos[index].history.length - 1}`,
                lastModifiedDate: Date.now()
            })
            return model.photos[index]

        } else {
            return { msg: 'Photo with id ' + data.id + " does not exist" }

        }
    },
    deleteFile: (id) => {
        const index = model.photos.findIndex(el => el.id == id)
        if (index !== -1) {
            fs.rm(model.photos[index].url, (err) => {
                const pathArr = model.photos[index].url.split('/')
                pathArr.pop()
                model.photos.splice(index, 1)
                fs.readdir(pathArr.join('/'), function (err, files) {
                    if (!files.length) {
                        fs.rmdir(pathArr.join('/'), (err) => {

                        })
                    }

                });
            })
            return { msg: 'Successfully deleted photo with id ' + id }
        } else
            return { msg: 'There is no photo with id ' + id }

    }
}
