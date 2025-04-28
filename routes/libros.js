const express = require('express')
const router = express.Router()
const db = require('../config/database')

// Ruta principal para mostrar libros
router.get('/', async (req, res) => {
  try {
    const consulta = `    
    SELECT
      L.idlibro,
      C.categoria,
      L.titulo,
      L.precio,
      L.tapa,
      L.descripcion
    FROM libros L
      INNER JOIN categorias C ON L.idcategoria = C.idcategoria`
    const [libros] = await db.query(consulta)
    res.render('index', { libros })
  } catch (error) {
    console.error(error)
  }
})

// Ruta para acceder a la vista de creación (formulario)
router.get('/create', async (req, res) => {
  try {
    const [categorias] = await db.query("SELECT * FROM categorias")
    res.render('create', { categorias })
  } catch (error) {
    console.error(error)
  }
})

// Ruta que recibe los datos que nos envía el formulario de creación
router.post('/create', async (req, res) => {
  try {
    const { categoria, titulo, precio, tapa, descripcion } = req.body
    await db.query("INSERT INTO libros (idcategoria, titulo, precio, tapa, descripcion) VALUES (?, ?, ?, ?, ?)",
      [categoria, titulo, precio, tapa, descripcion])
    res.redirect('/')
  } catch (error) {
    console.error(error)
  }
})

// Ruta para eliminar un libro
router.get('/delete/:id', async (req, res) => {
  try {
    const idEliminar = req.params.id
    await db.query("DELETE FROM libros WHERE idlibro = ?", [idEliminar])
    res.redirect('/')
  } catch (error) {
    console.error(error)
  }
})

// Ruta para editar un libro
router.get('/edit/:id', async (req, res) => {
  try {
    const [categorias] = await db.query("SELECT * FROM categorias")
    const [datos] = await db.query("SELECT * FROM libros WHERE idlibro = ?", [req.params.id])
    
    if (datos.length == 0) {
      return res.redirect('/')
    }
    
    res.render('edit', { categorias, libro: datos[0] })
  } catch (error) {
    console.error(error)
  }
})

// Ruta que recibe los datos para editar un libro
router.post('/edit/:id', async (req, res) => {
  try {
    const { categoria, titulo, precio, tapa, descripcion } = req.body
    await db.query("UPDATE libros SET idcategoria = ?, titulo = ?, precio = ?, tapa = ?, descripcion = ? WHERE idlibro = ?",
      [categoria, titulo, precio, tapa, descripcion, req.params.id])
    res.redirect('/')
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
