const express = require("express");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgresql://postgres:Grayson@localhost:5432/booklist",
});

async function init() {
  const app = express();

  app.get("/get", async (req, res) => {
    const client = await pool.connect();
    const [booksRes, addBookRes, deleteBookRes] = await Promise.all([
      client.query(
        "SELECT * FROM booklist WHERE book_id = $1",
        [req.query.search]
      ),
      client.query("SELECT * FROM booklist WHERE book_id = $1", [
        req.query.search,
      ]),
    ]);
    res
      .json({
        status: "ok",
        books: booksRes.rows[0] || {},
       })
      .end();
    await client.end();
    });

  const PORT = process.env.PORT || 3000;
  app.use(express.static("./static"));
  app.listen(PORT);

  console.log(`running on http://localhost:${PORT}`);
}

init();


// const getBooks = () => {
//   return new Promise(function(resolve, reject) {
//     pool.query('SELECT * FROM booklist ORDER BY book_id ASC', (error, results) => {
//       if (error) {
//         reject(error)
//       }
//       resolve(results.rows);
//     })
//   }) 
// }
// const createBook = (body) => {
//   return new Promise(function(resolve, reject) {
//     const { title, author } = body
//     pool.query('INSERT INTO booklist (title, author) VALUES ($1, $2) RETURNING *', [title, author], (error, results) => {
//       if (error) {
//         reject(error)
//       }
//       resolve(`A new merchant has been added added: ${results.rows[0]}`)
//     })
//   })
// }
// const deleteBook = () => {
//   return new Promise(function(resolve, reject) {
//     const id = parseInt(request.params.book_id)
//     pool.query('DELETE FROM booklist WHERE book_id = $1', [book_id], (error, results) => {
//       if (error) {
//         reject(error)
//       }
//       resolve(`Book deleted with ID: ${id}`)
//     })
//   })
// }

// export default {
//   getBooks,
//   createBook,
//   deleteBook,
// }

