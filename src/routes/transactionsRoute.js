import express from 'express';
import {
    createTransaction,
    deleteTransactionById,
    getSummaryByUserId,
    getTransactionById
} from '../controllers/transactionsController.js';


const router = express.Router();

router.get("/:userId", getTransactionById);
router.post('/', createTransaction);
router.delete('/:id', deleteTransactionById);
router.get("/summary/:userId", getSummaryByUserId);



export default router; 