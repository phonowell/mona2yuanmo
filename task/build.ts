import $ from 'fire-keeper'
import compiler from 'fire-compiler'

// function

const clear = () => $.remove('./dist')

const compile = async () => {
  const html = await compilePug('./source/app.pug')
  if (!html) return

  const mapCss: Record<string, string> = {}
  const mapJs: Record<string, string> = {}

  let result = html
    .replace(/<link href="(.+?)">/g, (_, href) => {
      mapCss[href] = ''
      return `{{${href}}}`
    })
    .replace(/<script src="(.+?)"><\/script>/g, (_, src) => {
      mapJs[src] = ''
      return `{{${src}}}`
    })

  for (const source of Object.keys(mapCss)) {
    const css = await compileStyl(
      `./source/static/${source.replace('.css', '.styl')}`
    )
    if (!css) continue
    result = result.replace(`{{${source}}}`, `<style>${css}</style>`)
  }
  for (const source of Object.keys(mapJs)) {
    const js = await compileTs(
      `./source/static/${source.replace('.js', '.ts')}`
    )
    if (!js) continue
    result = result.replace(`{{${source}}}`, `<script>${js}</script>`)
  }

  await $.write('./dist/app.html', result)
}

const compilePug = async (source: string) =>
  await compiler.compilePugAsCode(await $.read<string>(source), {
    minify: true,
  })

const compileStyl = async (source: string) =>
  await compiler.compileStylAsCode(await $.read<string>(source), {
    importNib: true,
    minify: true,
  })

const compileTs = async (source: string) =>
  await compiler.compileTsAsCode(await $.read<string>(source), { minify: true })

const main = async (): Promise<void> => {
  await clear()
  await compile()
}

// export
export default main
export { compile }
