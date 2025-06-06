const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

//Router = enrutador
const categoriasRouter = require('./routes/categorias')
const librosRouter = require('./routes/libros') 

//Middleware = canal de comunicación (request > process > result)
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

//Motor de plantillas
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//rutas
app.use('/', librosRouter)
//app.use('/categorias', categoriasRouter)

//Iniciamos el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000')
})