import $ from 'fire-keeper'

// variable

const dist = './dist'

// function

const clean = () => $.remove(dist)

const compile = async () => {
  await compileYaml()
  await compileStyl()
  await compileTs()
  await compilePug()
}

const compilePug = async () => {
  await $.compile('source/index.pug', dist)

  const css = await $.read(`${dist}/index.css`)
  if (!css) throw new Error('css is not found')
  await $.remove(`${dist}/index.css`)

  const html = await $.read(`${dist}/index.html`)
  if (!html) throw new Error('html is not found')
  await $.remove(`${dist}/index.html`)

  const js = await $.read(`${dist}/index.js`)
  if (!js) throw new Error('js is not found')
  await $.remove(`${dist}/index.js`)

  const result = html
    .replace('<style></style>', `<style>${css}</style>`)
    .replace('<script></script>', `<script>${js}</script>`)
  await $.write(`${dist}/start.html`, result)
}
const compileStyl = async () => await $.compile('./source/index.styl', dist)
const compileTs = async () => {

  const json = await $.read('./source/dictionary.json')
  if (!json) throw new Error('json is not found')

  const ts = await $.read('./source/index.ts')
  if (!ts) throw new Error('ts is not found')

  await $.write(`${dist}/index.ts`, ts.replace("import dict from './dictionary.json'", `const dict = ${JSON.stringify(json)} as const`))
  await $.compile(`${dist}/index.ts`)
  await $.remove(`${dist}/*.ts`)
}
const compileYaml = async () => await $.compile('./source/dictionary.yaml')

const main = async (): Promise<void> => {
  await clean()
  await compile()
}

// export
export default main