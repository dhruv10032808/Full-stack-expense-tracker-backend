const express=require('express')
const userAuthentication=require('../middleware/auth');
const purchaseController=require('../controllers/purchase')
const router=express.Router();

router.get('/premium-membership',userAuthentication.authenticate,purchaseController.purchasepremium)

router.post('/update-transaction-status',userAuthentication.authenticate,purchaseController.updateTransactionStatus);

router.post('/update-incomplete-transaction-status',userAuthentication.authenticate,purchaseController.updateIncompleteTransactionStatus)

module.exports=router;