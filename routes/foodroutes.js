const {Router}=require('express')
const multer=require('multer');
const { addFood, Listfood, Removefooditem } = require('../controllers/foodcontroller');

const router=Router();
//image strorage enginne
const storage= multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload=multer({storage:storage})
router.post("/add",upload.single("image"),addFood)
router.get("/list",Listfood)
router.post("/remove",Removefooditem)

module.exports=router;