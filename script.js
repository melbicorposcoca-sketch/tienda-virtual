// Puedes cambiar los precios y las imágenes dentro de esta lista.
const WHATSAPP_NUMBER = "59168462435"; // Bolivia: +591 + tu número
const products = [
  {id:1,name:"Blusa",price:85,size:"S, M, L",color:"Negro",image:"imagenes/blusa_negra.png"},
  {id:2,name:"Vestido",price:390  ,size:"S, M, L",color:"Rojo",image:"imagenes/Adice de gala.png"},
  {id:3,name:"Pantalón",price:140,size:"S, M, L",color:"Azul",image:"imagenes/Escote en V cruzada y pantaleta.jpg"},
  {id:4,name:"Vestido",price:280,size:"S, M, L",color:"Celeste",image:"imagenes/Vestido sirena elegante con dobladillo cruzado.png"},
  {id:5,name:"Polera",price:55,size:"S, M, L",color:"Beige",image:"imagenes/Polera crop se adidas.png"},
  {id:6,name:"Vestido",price:300,size:"S, M, L",color:"Negro",image:"imagenes/Vestido de noche.jpg"},
  {id:7,name:"Vestido",price:450,size:"S, M, L",color:"Lila suave",image:"imagenes/tezza clothing.png"},
  {id:8,name:"Pantaleta y manga larga",price:110,size:"S, M, L",color:"Cafe",image:"imagenes/Blusa de encaje mangalarga y pantalon palazzo de tiro alto.png"},
  {id:9,name:"top",price:70,size:"S, M, L",color:"celeste ",image:"imagenes/Camiseta corta.png"},
  {id:10,name:"pantaleta y su top",price:150,size:"S, M, L",color:"esmeralda y blaco  ",image:"imagenes/Conjunto de top halter y pantalon palazzo.png"},
  {id:11,name:"top",price:90,size:"S, M, L",color:"palo de rosa ",image:"imagenes/Escote Drapeado.jpg"},
  {id:12,name:"Playera y minifalda jean",price:110,size:"S, M, L",color:"azul ",image:"imagenes/Playera y minifalda jean.png"},
  {id:13,name:"Playera Gucci",price:80,size:"S, M, L",color:"Negro",image:"imagenes/Playera.png"},
  {id:14,name:"Playera ",price:70,size:"S, M, L",color:"Plomo",image:"imagenes/Polera cropped.png"},
  {id:15,name:"Vestido largo",price:380,size:"S, M, L",color:"Rosado suave",image:"imagenes/Vestido de fiesta corte sirena con corcet de encaje y avertura lateral.png"},
  {id:16,name:"Vestido largo",price:450,size:"S, M, L",color:"Lila suave",image:"imagenes/tezza clothing.png"}
];
let cart = [];

const productGrid = document.getElementById("productGrid");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");

function renderProducts(){
  productGrid.innerHTML = products.map(p => `
    <article class="product-card">
      <img src="${p.image}" alt="${p.name} de mujer" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80'">
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="price">Bs. ${p.price}</p>
        <p class="details">Tallas: ${p.size} | Color: ${p.color}</p>
        <button class="add-btn" onclick="addToCart(${p.id})">🛒 Agregar al carrito</button>
      </div>
    </article>`).join("");
}
function addToCart(id){
  const found = cart.find(item => item.id === id);
  if(found) found.quantity++;
  else cart.push({...products.find(p => p.id === id),quantity:1});
  updateCart();
}
function updateCart(){
  document.getElementById("cartCount").textContent = cart.reduce((sum,item)=>sum+item.quantity,0);
  const total = cart.reduce((sum,item)=>sum+item.price*item.quantity,0);
  document.getElementById("cartTotal").textContent = `Bs. ${total}`;
  if(!cart.length){cartItems.innerHTML='<p class="empty-cart">Tu carrito está vacío. Agrega los productos que te gusten.</p>';return;}
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-row">
      <div><strong>${item.name}</strong><small>Bs. ${item.price} · ${item.color}</small></div>
      <div class="quantity-controls">
        <button aria-label="Quitar uno" onclick="changeQuantity(${item.id},-1)">−</button><span>${item.quantity}</span>
        <button aria-label="Agregar uno" onclick="changeQuantity(${item.id},1)">+</button>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${item.id})">Quitar</button>
    </div>`).join("");
}
function changeQuantity(id,amount){
  const item=cart.find(p=>p.id===id); if(!item)return;
  item.quantity+=amount; if(item.quantity<=0) cart=cart.filter(p=>p.id!==id);
  updateCart();
}
function removeFromCart(id){cart=cart.filter(p=>p.id!==id);updateCart();}
function openCart(){cartModal.classList.add("show");cartModal.setAttribute("aria-hidden","false");}
function closeCart(){cartModal.classList.remove("show");cartModal.setAttribute("aria-hidden","true");}
function sendWhatsApp(message){
  const number=WHATSAPP_NUMBER.replace(/\D/g,"");
  if(!/^\d{8,15}$/.test(number)){alert("Revisa el número de WhatsApp en script.js.");return;}
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`,"_blank","noopener");
}
document.getElementById("openCart").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
cartModal.addEventListener("click",e=>{if(e.target===cartModal)closeCart();});
document.getElementById("checkout").addEventListener("click",()=>{
  if(!cart.length){alert("Tu carrito está vacío. Agrega al menos un producto.");return;}
  const lines=cart.map(item=>`• ${item.name} (${item.color}), cantidad: ${item.quantity} — Bs. ${item.price*item.quantity}`);
  const total=cart.reduce((sum,item)=>sum+item.price*item.quantity,0);
  sendWhatsApp(`Hola, quiero hacer un pedido en CONFECCIÓN Y VENTA DE ROPAS MARY:\n\n${lines.join("\n")}\n\nTotal: Bs. ${total}\n\nMi nombre es:`);
});
document.getElementById("whatsappContact").addEventListener("click",()=>sendWhatsApp("Hola, quisiera información sobre los productos de CONFECCIÓN Y VENTA DE ROPAS MARY."));
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();updateCart();
