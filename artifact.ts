import $ from 'fire-keeper'
import $snakeCase from 'lodash/snakeCase'

// interface

type Data = {
  version: string
  flower: Mona[]
  feather: Mona[]
  sand: Mona[]
  cup: Mona[]
  head: Mona[]
}

type Mona = {
  setName: string
  position: string
  mainTag: TagMona
  normalTags: TagMona[]
  omit: boolean
  level: number
  star: number
}

type TagMona = {
  name: string
  value: number
}

type Yuanmo = {
  asKey: string
  rarity: number
  slot: string
  level: number
  mainStat: string
  subStat1Type: string
  subStat1Value: number
  subStat2Type: string
  subStat2Value: number
  subStat3Type: string
  subStat3Value: number
  subStat4Type: string
  subStat4Value: number
  mark: string
}

// variable

let dict: Record<string, string> = {}

// function

const main = async () => {

  dict = await $.read('./data/genshin/dictionary.yaml')

  const data = await $.read<Data>('F:/mona.json')
  const result: Yuanmo[] = [
    ...data.flower,
    ...data.feather,
    ...data.sand,
    ...data.cup,
    ...data.head,
  ]
    .filter(it => it.level === 20)
    .map(it => ({
      asKey: translateName(it.setName) || $snakeCase(it.setName),
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
  await $.write('F:/output.json', result)
}

const translateName = (
  input: string,
): string => dict[input] || ''

const translateValue = (
  input: number,
): number => input > 1 ? input : parseFloat((input * 100).toFixed(1))

// export
export default main