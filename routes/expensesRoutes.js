const express = require("express");
const{
    addExpenses,
    getAllExpenses,
    deleteExpenses,
    downloadExpensesExcel
} = require("../controllers/expensesController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addExpenses);
router.get("/get", protect, getAllExpenses);
router.get("/downloadexcel", protect, downloadExpensesExcel);
router.delete("/id", protect, deleteExpenses);


module.exports = router;