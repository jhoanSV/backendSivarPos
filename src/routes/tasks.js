import { Router } from "express";
import { putNewClient,
         getClientList,
         putNewProduct,
         getProductList } from '../controllers/tasks';

const router = Router();

/**
 * @swagger
**/


// All retalet to clients
router.post('/Newclient', putNewClient);

router.get('/clientlist', getClientList);

//All about products

router.post('/putnewproduct', putNewProduct);

router.get('/productList', getProductList)
export default router;