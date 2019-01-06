const exec = require('child_process').exec

exec(
  './run-label.sh --image=$HOME/building-photos/istv-3/istv-3-back.jpg',
  (error, stdout, stderr) => {
    console.log(`${stdout}`)
    const result = stdout.slice(0, 6)
    console.log(result)
    // console.log(`${stderr}`)
    if (error !== null) {
      console.log(`exec error: ${error}`)
    }
  },
)
