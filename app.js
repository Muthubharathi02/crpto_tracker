const form = document.querySelector('#searchForm');
const res = document.querySelector('#resTable');
const cont = document.getElementById("allContaint");

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(upd){
        clearTimeout(upd);
    }
    const ctype = form.elements.coinType.value;
    cont.classList.add('mainClick');
    cont.classList.remove('main');    
    fetchPrice(ctype);

});

const fetchPrice = async(ctype) =>{
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD`);
    showPrice(r.data.coin);
}


const showPrice = (coinData)=>{
    const price = coinData.price;
    const vol = coinData.volume;
    const change = coinData.priceChange1d;
    const coin = coinData.name;
    const curr = 'USD';
    res.innerHTML = `<tr class="bg-primary" style="color: white;">
    <td>
        Property
    </td>
    <td>
        Value
    </td>
</tr>
<tr>
    <td>${coin}</td>
    <td><span style="font-size: 1.3em;">${price}</span> ${curr}</td>
</tr>
<tr>
    <td>Volume</td>
    <td>${vol}</td>
</tr>
<tr>
    <td>Change in a day</td>
    <td>${change} ${curr}</td>
</tr>`
    upd = setTimeout(()=>fetchPrice(ctype),10000);
};
