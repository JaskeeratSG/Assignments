const pool = require('./db');


const getbooks = (req,res)=>{
    pool.query("SELECT * FROM BOOKS;", (error,result)=>{
    if(error)
    {
        console.log(error);
        result.status(400).json({error:error.message});
    }
    else{
        res.status(200).json(result.rows);
    }
})
}

const getbookbyid = (req,res)=>{
    const bookid= req.params.id;
    pool.query(`Select * FROM BOOKS WHERE id = ${bookid}`,(error,result)=>{
        if(error)
        {
            console.log(error);
            throw error;
        }
        else{
            res.status(200).json(result.rows);
        }
    })
}

const addnewbook = (req, res) => {
    const { id, title, author, publisheddate, isbn, genre } = req.body;

    pool.query(
        `INSERT INTO books (id, title, author, publisheddate, isbn, genre) 
         VALUES ($1, $2, $3, $4, $5, $6);`,
        [id, title, author, publisheddate, isbn, genre],
        (error, result) => {
            if (error) {
                console.error('Error inserting new book:', error);
                res.status(400).send(error.message); 
            } else {
                console.log('Book added successfully');
                res.status(200).send('Data added successfully');
            }
        }
    );
};

const updatebookdata = (req, res) => {
    const bookId = req.params.id; 
    const { title, author, publisheddate, isbn, genre } = req.body; 
  
    if (!title && !author && !publisheddate && !isbn && !genre) {
        return res.status(400).send('At least one field (title, author, publisheddate, isbn, genre) must be provided for update.');
    }
    const fileds = [];
    const values = [];

    if (title) {
        fileds.push('title');
        values.push(title);
    }
    if (author) {
        fileds.push('author');
        values.push(author);
    }
    if (publisheddate) {
        fileds.push('publisheddate');
        values.push(publisheddate);
    }
    if (isbn) {
        fileds.push('isbn');
        values.push(isbn);
    }
    if (genre) {
        fileds.push('genre');
        values.push(genre);
    }


    const updateQuery = `
        UPDATE books 
        SET ${fileds.map((field, index) => `${field} = $${index + 2}`).join(', ')} 
        WHERE id = $1;`;

    const val = [bookId, ...values];

    pool.query(updateQuery, val, (error, result) => {
        if (error) {
            console.error('Error updating book:', error);
            return res.status(400).send(error.message);
        }
        console.log(`Book with ID ${bookId} updated successfully.`);
        res.status(200).json(result);
    });
};


const deletebookbyid = (req,res)=>{
    const bookid = req.params.id;
   

    const delQuery = `DELETE FROM BOOKS WHERE id = ${bookid}`;

    pool.query(delQuery, (error, results)=>{
        if(error)
        {
            res.status(400).json({message:error.message});
        }
        else{
            res.status(200).json({messge: "require field has been deleted"});
        }
    })
}


module.exports={
     getbooks, 
     getbookbyid,
     addnewbook,
     updatebookdata,
     deletebookbyid
}