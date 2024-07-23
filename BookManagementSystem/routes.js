const pool= require('./db');
const {
    getbooks,
    getbookbyid,
    addnewbook,
    updatebookdata,
    deletebookbyid
} = require('./controller');


const {Router} = require('express');

const router = Router();
router.get('/books',getbooks);

router.get('/books/:id',getbookbyid);

router.post('/books',addnewbook);

router.put('/books/:id',updatebookdata);

router.delete('/books/:id',deletebookbyid);




module.exports = router;