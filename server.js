const express = require('express')
const exec = require('child_process').exec
const cors = require('cors')
const multer = require('multer')

const uploadHandler = multer()

const app = express()
const PORT = process.env.PORT || 1234

app.use(cors())

app.post('/building', uploadHandler.fields([]), (req, res) => {
  console.log('reqbody', req.body)
  console.log('🙋‍  Handling `GET /building`')

  console.log('🚀  Executing label_image.py')
  exec(
    `python3 ./src/intelligence/label_image.py \
      --graph=/tmp/output_graph.pb --labels=/tmp/output_labels.txt \
      --input_layer=Placeholder \
      --output_layer=final_result \
      --image=./src/intelligence/training_data/istv-2/istv-2-back.jpg`,
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
