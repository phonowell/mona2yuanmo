import $ from 'fire-keeper'

import { compile } from './build'
import throttle from 'lodash/throttle'

// function

const compile2 = throttle(compile, 1e3)

const main = async () => {
  process.on('uncoughtException', err => console.log(err))
  $.watch('./source/**/*', compile2)
}

// export
export default main
