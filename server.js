const exec = require('child_process').exec

console.log('🚀  Executing label_image.py')
exec(
  `python3 label_image.py \
    --graph=/tmp/output_graph.pb --labels=/tmp/output_labels.txt \
    --input_layer=Placeholder \
    --output_layer=final_result \
    --image=$HOME/building-photos/istv-2/istv-2-back.jpg`,
  (error, stdout, stderr) => {
    console.log('🎬  Finished label_image.py execution')
    console.log(`✅  Result:\n${stdout}`)
    const result = stdout.slice(0, 6)
    console.log(`✅  The building is: ${result}\n`)
    // Errors handling
    console.error(`❌  ${stderr}`)
    if (error !== null) {
      console.error(`❌  Exec error: ${error}`)
    }
  },
)
