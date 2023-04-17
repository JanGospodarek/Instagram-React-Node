const fileController = require('./controllers/fileController')
const jsonController = require('./controllers/jsonController')
const getRequestData = require('./utils/getRequestData')
const model = require('./model/model')
const formidable = require("formidable");

const router = async (req, res) => {
    switch (req.method) {
        case "GET":
            if (req.url == '/api/photos') {

                const photos = jsonController.getAllFiles()

                res.end(JSON.stringify(photos, null, 5))
            } else if (req.url.match(/\/api\/photos\/([0-9]+)/)) {

                const id = req.url.split('/')[req.url.split('/').length - 1]
                const photo = jsonController.getSpecifiedFile(id)

                res.end(JSON.stringify(photo, null, 5))
            }

            break;

        case "POST":
            if (req.url == '/api/photos') {

                let form = formidable({});
                fileController.addPhoto(form, req, __dirname + '/data')


            }

            break;
        case "PATCH":
            if (req.url == '/api/photos') {
                const data = await getRequestData(req)
                const parsed = JSON.parse(data)
                const msg = jsonController.updateFile(parsed)
                res.end(JSON.stringify(msg, null, 5))
            }

            break;
        case "DELETE":
            if (req.url.match(/\/api\/photos\/([0-9]+)/)) {
                const id = req.url.split('/')[req.url.split('/').length - 1]
                const msg = jsonController.deleteFile(id)

                res.end(JSON.stringify(msg, null, 5))
               
             }

            break;
    }
}
module.exports = router