const toCurrency = price => {
    return new Intl.NumberFormat('ua',{
        currency : 'uah',
        style: 'currency'
    }).format(price)
}

document.querySelectorAll('.price').forEach(node=>{
    node.textContent = toCurrency(node.textContent);
})

const $card = document.querySelector('#card');

if($card){
    $card.addEventListener('click',event=>{
        if(event.target.classList.contains('js-remove')){
            const id = event.target.dataset.id;


            fetch('/basket/remove/' + id,{
                method : 'delete'
            }).then(res=>res.json())
                .then(basket =>{
                    if(basket.courses.length){
                        const html = basket.courses.map(c=>{
                            return `
                               <tr>
                            <td>${c.title}</td>
                            <td>${c.count}</td>
                            <td><button class="btn btn-small js-remove" data-id="${c.id}">Удалить из корзины</button></td>
                             </tr>
                            `
                        }).join('')
                        $card.querySelector('tbody').innerHTML = html;
                        $card.querySelector('.price').textContent = toCurrency(basket.price);
                    }
                    else{
                        $card.innerHTML = '<p>Корзина пуста</p>'
                    }
                })
        }
    })
}

