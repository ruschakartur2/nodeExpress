const path = require('path');
const fs = require('fs');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'basket.json'
)

class Basket {

    static async add(course){
        const basket = await Basket.fetch();

        const index = basket.courses.findIndex(c => c.id === course.id)
        const candidate = basket.courses[index];

        if(candidate) {
            // Курс уже существует
            candidate.count++;
            basket.courses[index] = candidate;
        }
        else {
            // нужно добавить
            course.count = 1;
            basket.courses.push(course);
        }

        basket.price += +course.price;

        return new Promise(((resolve, reject) => {
            fs.writeFile(p,JSON.stringify(basket),err=>{
                if(err){
                    reject(err)
                }else{
                    resolve()
                }
            })
        }))
    }


    static async remove(id) {
        const basket = await Basket.fetch()

        const index = basket.courses.findIndex(c=>c.id === id)
        const course = basket.courses[index]
        if(course.count === 1){
            // Удалить
            basket.courses = basket.courses.filter(c=>c.id !== id);
        }
        else {
            // уменшить на 1
            basket.courses[index].count--;
        }

        basket.price -= course.price;

        return new Promise(((resolve, reject) => {
            fs.writeFile(p,JSON.stringify(basket),err=>{
                if(err){
                    reject(err)
                }else{
                    resolve(basket)
                }
            })
        }))
    }

    static async fetch() {
        return new Promise((resolve,reject)=>{
            fs.readFile(p,'utf-8',(err,content)=>{
                if(err){ reject(err) }
                else {resolve(JSON.parse(content))}
            })
        })
    }
}

module.exports = Basket;
