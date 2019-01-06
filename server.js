const express = require('express')
const exec = require('child_process').exec
const cors = require('cors')
const multer = require('multer')

var upload = multer({ dest: 'uploads/' })

const app = express()
const PORT = process.env.PORT || 1234

app.use(cors())

app.post('/building', upload.single('image'), (req, res) => {
  console.log('🙋‍  Handling `GET /building`')

  console.log('🚀  Executing label_image.py')
  exec(
    `python3 ./src/intelligence/label_image.py \
      --graph=/tmp/output_graph.pb --labels=/tmp/output_labels.txt \
      --input_layer=Placeholder \
      --output_layer=final_result \
      --image=./uploads/${req.file.filename}`,
    (error, stdout, stderr) => {
      console.log('🎬  Finished label_image.py execution')
      console.log(`✅  Result:\n${stdout}`)
      const result = stdout.slice(0, 6)
      console.log(`✅  The building is: ${result}\n`)
      res.status(200).send(`✅  The building is: ${result}`)
      // Errors handling
      // console.error(`❌  ${stderr}`)
      if (error !== null) {
        console.error(`❌  Exec error: ${error}`)
        res.status(500).send('❌   Une erreur est survenue.')
      }
    },
  )
})

app.listen(PORT, () => {
  console.log(`🚀  Server running on port ${PORT}`)
})
