var express = require('express');
var router = express.Router();
const plantModel = require('../models/plantModel');

router.get('/all', async function (req, res) {
    try{
        const plants = await plantModel.find();
        res.status(200).json({
            status: true,
            message: 'Lấy sản phẩm thành công',
            data: plants
        })
    }catch(e){
        res.status(400).json({ status: false, message: "Lấy sản phẩm thất bại" + e });
    }
});

router.get('/detail/:id', async function (req, res) {
    try{
        const { id }= req.params;
        const plant = await plantModel.findById(id);
        if(plant){
        res.status(200).json({
            status: true,
            message: 'Lấy sản phẩm thành công',
            data: plant
        });
    }
    else{
        res.status(404).json({ status: false, message: "Không thấy sản phẩm"});
    }
    }catch(e){
        res.status(400).json({ status: false, message: "Lấy sản phẩm thất bại" + e });
    }
})

router.post('/add', async function (req, res) {
    try{
        const {name, type, price, quantity, size, source, images} = req.body;
        const newPlant = {name, type, price, quantity, size, source, images};
        await plantModel.create(newPlant);
        res.status(200).json({
            status: true,
            message: "Successfully"
          });
    }catch(e){
        res.status(400).json({ status: false, message: "Thêm sản phẩm thất bại" + e });
    }
});

router.get("/search", async function (req, res) {
    try {
      const { query } = req.query;
      const plants = await plantModel.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
        ]
      });
  
      if (plants.length > 0) {
        res.status(200).json({
          status: true,
          message: "Tìm kiếm sản phẩm thành công",
          data: plants
        });
      } else {
        res.status(404).json({ status: false, message: "Không tìm thấy sản phẩm" });
      }
    } catch (e) {
      res.status(400).json({ status: false, message: "Error: " + e });
    }
  });

module.exports = router;