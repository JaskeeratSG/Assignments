
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'books',
  password: 'Mummypapa10@',
  port: 5000, 
});

pool.connect()
.then(() => {
    console.log('Connected to PostgreSQL database');
})
.catch(err => {
    console.error('Error connecting to PostgreSQL database', err);
  });
  
  pool.on('error', (err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });
  

module.exports = pool;