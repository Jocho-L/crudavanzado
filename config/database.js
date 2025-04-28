const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'libreriajs'
})

//promise = promesa (futuro), inciertas (error resolver)
async function testConnection(){
  try{
    //await = espera...
    const connection = await pool.getConnection()
    console.log("Conexión exitosa")
    connection.release()
  }catch(error){
    console.error(error)
  }
}

testConnection()
module.exports = pool