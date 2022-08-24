const form = document.querySelector('#searchForm');
const res = document.querySelector('#resTable');
const cont = document.getElementById("allContaint");
var upd;

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(upd){
        clearTimeout(upd);
    }
    const ctype = form.elements.coinType.value;  
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
    <td>${price}</td>
</tr>
<tr>
    <td>Volume</td>
    <td>${vol}</td>
</tr>
<tr>
    <td>Change in a day</td>
    <td>${change}</td>
</tr>`
    upd = setTimeout(()=>fetchPrice(ctype),10000);
};
