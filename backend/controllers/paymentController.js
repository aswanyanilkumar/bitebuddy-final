//controllers/paymentController.js
exports.processPayment = async (req, res) => {
    try {
      const { amount, paymentMethod } = req.body;
  
      // Simulate a success response
      if (!amount || !paymentMethod) {
        return res.status(400).json({ error: "Missing payment details" });
      }
  
      // Fake payment success
      return res.status(200).json({
        success: true,
        message: "Payment processed successfully",
        transactionId: "TXN" + Date.now()
      });
    } catch (error) {
      res.status(500).json({ error: "Payment failed", details: error.message });
    }
  };
  