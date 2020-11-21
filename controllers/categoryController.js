const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Category = mongoose.model('Category');

router.get('/', (req, res) => {
    
    res.render("category/addOrEdit", {
        viewTitle: "Add Product Category"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var category = new Category();
    category.productName = req.body.productName;
    category.categoryCode = req.body.categoryCode;
    category.save((err, doc) => {
        if (!err)
            res.redirect('category/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("category/addOrEdit", {
                    viewTitle: "Insert Product Category",
                    category: req.body
                });
            }
            else
                console.log('Error during category insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Category.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('category/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("category/addOrEdit", {
                    viewTitle: 'Update Product Category',
                    category: req.body
                });
            }
            else
                console.log('Error during Category update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Category.find((err, docs) => {
        if (!err) {
            res.render("category/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving category list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'productName':
                body['productNameError'] = err.errors[field].message;
                break;
            case 'categoryCode':
                body['categoryCodeError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Category.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("category/addOrEdit", {
                viewTitle: "Update Product Category",
                category: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/category/list');
        }
        else { console.log('Error in Category deletion :' + err); }
    });
});

module.exports = router;