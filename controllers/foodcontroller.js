const fs = require("fs");
const foodmodal = require("../model/foodModel");

//add food
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new foodmodal({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ sucess: true, message: "food created sucessfully" });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error });
  }
};

//all foodlist
const Listfood = async (req, res) => {
  try {
    const foods = await foodmodal.find({});
    res.json({ sucess: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: "Error" });
  }
};
//remove food item
const Removefooditem = async (req, res) => {
  try {
    const food = await foodmodal.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodmodal.findByIdAndDelete(req.body.id);
    res.json({ sucess: true, message: "Food removed" });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: "Error" });
  }
};

module.exports = { addFood, Listfood, Removefooditem };
