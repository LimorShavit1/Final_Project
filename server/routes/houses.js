const express = require('express');
const { check, validationResult } = require('express-validator');

const House = require('../models/House');

const router = express.Router();

const validate = [
    check('CustumerID').exists(),
    check('CustumerID.*').notEmpty().withMessage('No id provided'),

    check('ListName')
        .isLength({ min: 1 })
        .withMessage('Name field is empity'),
]

// /api/houses --> create list
router.post('/', validate, (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() })
    }

    const house = new House({
        CustumerID: req.body.CustumerID,
        ListName: req.body.ListName,
        items: req.body.items
    });

    house.save()
        .then(result => {
            res.send({
                message: 'House data created successfully',
                data: result
            })
        })
        .catch(err => console.log(err))

})

// /api/houses
router.get('/', (req, res) => {
    House.find()
        .then(houses => {
            res.send(houses)
        })
        .catch(err => console.log(err))
});

// /api/houses/id
router.get('/:id', (req, res) => {
    const houseId = req.params.id;

    House.findById(houseId)
        .then(house => {
            res.send(house);
        })
        .catch(err => console.log(err))
});

// /api/houses/ListId/id --> add user to given list id (in URL)
router.put('/ListId/:id', (req, res) => {
    //extract listId
    const listId = req.params.id;

    ///api/houses/CustumerId/5fe0ef332571ea3380c98557
    //603689e220096823c0315e96
    //605784e16e67847a782764b0 listID

    House.findById(listId)
        .then(houses => {
            //pass in body customerID we want to add current listID
            houses.CustumerID.push(req.body.CustumerID)
            return houses.save();
        })
        .then(result => {
            res.send(result);
        })
        .catch(err => console.log(err))
});


// /api/houses/id
router.delete('/:id', (req, res) => {
    const houseId = req.params.id;

    House.findByIdAndRemove(houseId)
        .then(result => {
            res.send(result);
        })
        .catch(err => console.log(err))
})

module.exports = router;