const {Router}=require('express')
const { loginuser, registeruser } = require('../controllers/usercontroller');

const router=Router();

router.post("/login",loginuser)
router.post("/register",registeruser)

module.exports=router;