// ========== Server
// import all modules
import express from 'express'
import Mustache from 'mustache'
import fs from 'fs'
import mustacheExpress from 'mustache-express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.engine('mustache', mustacheExpress())
app.set('views', path.join(__dirname, './templates'))
app.set('view engine', 'mustache')

app.get('/', (req, res) => {
  // res.render('index', {
  //   title: 'Web',
  //   name: 'Mathius',
  //   frameworks: ['Express', 'Nest', 'React Js', 'React Native', 'Next Js'],
  //   gfriend: [
  //     {
  //       name: 'Sowon',
  //       born: 1995
  //     },
  //     {
  //       name: 'Yerin',
  //       born: 1996
  //     },
  //     {
  //       name: 'Eunha',
  //       born: 1997
  //     }
  //   ],
  //   menikah: true,
  //   ubahJadiHurufBesar: () => {
  //     return (text, render) => {
  //       return render(text).toUpperCase()
  //     }
  //   }
  // })

  const template = fs.readFileSync(path.join(__dirname, './templates/index.mustache'))
  const header = fs.readFileSync(path.join(__dirname, './templates/header.mustache'))
  // Cache template sblm di render, akan mempercepat proses renderin
  Mustache.parse(template.toString())
  Mustache.parse(header.toString())
  const data = Mustache.render(template.toString(), {
    title: 'Web',
    name: 'Mathius',
    frameworks: ['Express', 'Nest', 'React Js', 'React Native', 'Next Js'],
    gfriend: [
      {
        name: 'Sowon',
        born: 1995
      },
      {
        name: 'Yerin',
        born: 1996
      },
      {
        name: 'Eunha',
        born: 1997
      }
    ],
    menikah: true,
    ubahJadiHurufBesar: () => {
      return (text, render) => {
        return render(text).toUpperCase()
      }
    }
  }, {
    headerComponent: header.toString()
  })

  res.send(data)
})

app.listen(3000, () => {
  console.log('Magic happen at port 3000')
})
