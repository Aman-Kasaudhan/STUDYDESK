const express=require("express");
const router=express.Router();

const {contactAdmin}=require("../util/mailRecieve")
const {sendWhatsApp}=require("../util/whatsapp_send")


router.post("/admin",contactAdmin)

router.post("/send/whatsapp", async (req, res) => {
  try {
    await sendWhatsApp(req.body);

    res.status(200).json({
      success: true,
      message: "Message sent via WhatsApp",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "WhatsApp failed",
    });
  }
});
module.exports = router;
