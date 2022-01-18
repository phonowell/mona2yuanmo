import $ from 'fire-keeper'
import debounce from 'lodash/debounce'

// function

const build = debounce(() => $.exec('npm run alice build'), 5e3, { trailing: true })

const main = () => {
  process.on('uncaughtException', e => console.error(e))
  $.watch([
    './source/**/*.pug',
    './source/**/*.styl',
    './source/**/*.ts',
    './source/**/*.yaml',
  ], build)
}

// export
export default main