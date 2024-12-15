import { Router } from "express";
import { putNewClient,
         getClientList,
         putNewProduct,
         getProductList,
         getInventory,
         getPurchaseList,
         putUpdateCient,
         postUpdateProduct,
         postUpdateInventory,
         getSubCategories,
         getShoppingList,
         postAddProduct,
         getPurchaseDetail,
         putAddPurchase,
         putUpdateVefied,
         getSubClases,
         putModifyPurchaseProduct,
         putNewSale,
         getSalesPerDay,
         getCashFlow,
         putNewMoneyFlow,
         updateRemoveFlow,
         putNewOutput,
         putCancelTheSale,
         getCRDetail,
         getBestProducts,
         getSalesByCategory,
         getDataLoginColtek,
         getClientOcupation,
         postToRemsionToElectronic,
         getReturns,
         getProfit,
         getPrintInvoice} from '../controllers/tasks';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: products
 *  description: products endpoints
*/


//*All retalet to clients
router.post('/pos/newclient', putNewClient);

router.post('/pos/clientlist', getClientList);

router.post('/pos/updateclient', putUpdateCient);

//*All about products
router.post('/pos/newproduct', putNewProduct);

router.post('/pos/productList', getProductList);

router.post('/pos/inventory', getInventory);

router.post('/pos/updateproduct', postUpdateProduct);

router.post('/pos/postupdateinventory', postUpdateInventory);

router.get('/pos/subcategories', getSubCategories);

router.post('/pos/shoppinglist', getShoppingList);

router.post('/pos/addproduct', postAddProduct);

//* All about purchases
router.post('/pos/purchaseList', getPurchaseList);

router.post('/pos/purchasedetail', getPurchaseDetail);

router.post('/pos/addpurchase', putAddPurchase);

router.post('/pos/updatevefied' , putUpdateVefied);

router.post('/pos/subclases' , getSubClases);

router.post('/pos/modifypurchaseproduct', putModifyPurchaseProduct);

//*All about sales
router.post('/pos/newsale', putNewSale);

router.post('/pos/salesperday', getSalesPerDay);

router.post('/pos/cashflow', getCashFlow);

router.post('/pos/newmoneyflow', putNewMoneyFlow);

router.post('/pos/removeflow', updateRemoveFlow);

router.post('/pos/newoutput', putNewOutput)

router.post('/pos/cancelthesale', putCancelTheSale)

router.post('/pos/crdetail', getCRDetail);

router.post('/pos/bestProducts', getBestProducts);

router.post('/pos/salesbycategory', getSalesByCategory)

router.get('/tasks/datalogincoltek', getDataLoginColtek)

router.get('/pos/clientocupation', getClientOcupation)

router.post('/pos/toremsiontoelectronic', postToRemsionToElectronic)

router.post('/pos/returns', getReturns)

router.post('/pos/profit', getProfit)

router.get('/pos/printinvoice', getPrintInvoice)

//*Other Functions
//router.post('/pos/inserSivarList', inserSivarList);

export default router