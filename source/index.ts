import dict from './dictionary.json'

// variable

// function

const binding = () => {
  const $file = document.querySelector<HTMLInputElement>('.file')
  if (!$file) throw new Error('$file is not found')
  $file.addEventListener('change', e => {
    const { files } = e.target as unknown as { files: Blob[] }
    if (!files?.length) return
    const reader = new FileReader()
    reader.onload = () => format(reader.result as string || '')
    reader.readAsText(files[0])
  })

  const $btn = document.querySelector<HTMLButtonElement>('.btn')
  if (!$btn) throw new Error('$btn is not found')
  $btn.addEventListener('click', () => $file.click())
}

const format = (text: string) => {
  const data = JSON.parse(text)
  const result = [
    ...data.flower,
    ...data.feather,
    ...data.sand,
    ...data.cup,
    ...data.head,
  ]
    .filter(it => it.level === 20)
    .map(it => ({
      asKey: translateName(it.setName) || snakeCase(it.setName),
      rarity: it.star,
      slot: translateName(it.position),
      level: it.level,
      mainStat: translateName(it.mainTag.name),
      subStat1Type: translateName(it.normalTags[0].name),
      subStat1Value: translateValue(it.normalTags[0].value),
      subStat2Type: translateName(it.normalTags[1].name),
      subStat2Value: translateValue(it.normalTags[1].value),
      subStat3Type: translateName(it.normalTags[2].name),
      subStat3Value: translateValue(it.normalTags[2].value),
      subStat4Type: translateName(it.normalTags[3].name),
      subStat4Value: translateValue(it.normalTags[3].value),
      mark: 'none',
    }))
  save(JSON.stringify(result, null, 2))
}

const main = () => {
  binding()
}

const save = (content: string) => {
  const blob = new Blob([content], { type: 'application/json;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'yuanmo.json'
  a.click()
}

const snakeCase = (str: string) => str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()

const translateName = (
  input: string,
) => dict[input] || ''

const translateValue = (
  input: number,
) => input > 1 ? input : parseFloat((input * 100).toFixed(1))

// execute
main()