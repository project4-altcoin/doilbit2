const express = require("express");
const { 
    getBasicApis,
    getBasicApi,
    createBasicApi,
    updateBasicApi,
    deleteBasicApi,
    searchBasicApi
} = require("../controllers/basicApi");
const router = express.Router();

router
    .route('/')
    .get(getBasicApi)
    .post(createBasicApi)

router
    .route('/:id')
    .get(getBasicApis)
    .put(updateBasicApi)
    .delete(deleteBasicApi)

module.exports = router;
