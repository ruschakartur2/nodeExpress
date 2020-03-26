const {Router} = require('express')
const router = Router();
const Basket = require('../models/basket-module');
const Course = require('../models/course');

router.post('/add',async (req,res)=>{
    const course = await Course.getById(req.body.id);

    await Basket.add(course);
    res.redirect('/basket')
})

router.get('/',async (req,res)=>{
    const basket = await Basket.fetch()
    res.render('basket',{
        title : 'Корзина',
        isBasket : true,
        courses : basket.courses,
        price : basket.price
    })
})

router.delete('/remove/:id',async (req,res)=>{
    const basket =  await Basket.remove(req.params.id)

    res.status(200).json(basket)
    res.redirect('/basket'  );
})

module.exports = router;
