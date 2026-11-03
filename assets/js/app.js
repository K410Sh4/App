
(function(){
"use strict";
const flavors=["Abacaxi","Açaí com Guaraná","Amora","Azedinha","Banana Caramelizada","Baunilha","Beijinho","Brigadeiro","Café","Cappuccino","Caramelo","Caramelo Toffe","Cassis","Cereja","Chocolate","Chocolate Branco","Choc. Meio Amargo","Chocolate Suíço","Chocomenta","Churros","Coco","Doce de Leite","Floresta Negra","Framboesa","Frutas Vermelhas","Graviola","Groselha","Groselha Azul","Kiwi","Leite Condensado","Limão Galego","Limonada Suíça","Maçã Verde","Maracujá","Maracujá c/ chocolate","Melancia","Menta","Milho Verde","Morango","Pistache","Prestígio","Sensação","Tutti Frutti","Unicórnio","Uva"];
const specials=["Ovomaltine","Nutella","Pistache de Dubai","Doce de Leite Viçosa","Bombom","Paçoquinha","Creme de Pistache","Negresco","Leite Ninho","7 Belo","Butter Toffe","Brigadeiro","Açaí","Açaí c/ creme"];
const fini=["Bananinha","Beijos","Dentadura"];
const sauces=["Nutella","Doce de Leite","Pistache"];
const products=[
{id:"casquinha",name:"Casquinha ou Copinho",cat:"sorvetes",price:400,icon:"🍦",tag:"Clássico",description:"Sorvete na casquinha ou no copinho.",type:"recipiente"},
{id:"acai-peq",name:"Açaí Casquinha / Copinho",cat:"sorvetes",price:500,icon:"🫐",tag:"Açaí",description:"Açaí na casquinha ou no copinho.",type:"recipiente"},
{id:"casquinha-trufada",name:"Casquinha Trufada",cat:"sorvetes",price:800,icon:"🍦",tag:"Trufado",description:"Escolha o recheio: Nutella, doce de leite ou pistache.",type:"trufado-peq"},
{id:"casquinha-trufada-acai",name:"Casquinha Trufada Açaí",cat:"sorvetes",price:900,icon:"🍧",tag:"Trufado",description:"Açaí com opção de recheio trufado.",type:"trufado-peq"},
{id:"cascao",name:"Cascão ou Copão 300 ml",cat:"sorvetes",price:800,icon:"🍨",tag:"300 ml",description:"Sorvete servido no cascão ou copão.",type:"grande"},
{id:"acai-grande",name:"Açaí Cascão / Copão",cat:"sorvetes",price:1000,icon:"🫐",tag:"Açaí",description:"Açaí no cascão ou no copão.",type:"grande"},
{id:"cascao-trufado",name:"Cascão Trufado",cat:"sorvetes",price:1200,icon:"🍨",tag:"Trufado",description:"Cascão com recheio à escolha.",type:"trufado-grande"},
{id:"cascao-trufado-acai",name:"Cascão Trufado Açaí",cat:"sorvetes",price:1400,icon:"🍧",tag:"Trufado",description:"Açaí trufado com recheio à escolha.",type:"trufado-grande"},
{id:"sundae",name:"Sundae",cat:"sorvetes",price:1200,icon:"🍨",tag:"Favorito",description:"Sundae tradicional.",type:"simples"},
{id:"mini-sundae",name:"Mini Sundae",cat:"sorvetes",price:900,icon:"🍨",tag:"Mini",description:"Uma opção menor para adoçar o dia.",type:"simples"},
{id:"brownie",name:"Brownie com sorvete",cat:"sorvetes",price:1450,icon:"🍫",tag:"Especial",description:"Brownie acompanhado de sorvete.",type:"simples"},
{id:"milk",name:"Milk Shake",cat:"milkshakes",price:1200,icon:"🥤",tag:"45 sabores",description:"Escolha entre os sabores do cardápio.",type:"milk",flavors:flavors},
{id:"milk-special",name:"Milk Shake Especial",cat:"milkshakes",price:1450,icon:"🥤",tag:"14 sabores",description:"Sabores especiais como Ovomaltine e pistache.",type:"milk",flavors:specials},
{id:"milk-fini",name:"Milk Shake Fini",cat:"milkshakes",price:1600,icon:"🍬",tag:"3 sabores",description:"Bananinha, Beijos ou Dentadura.",type:"milk",flavors:fini},
{id:"cobertura",name:"Cobertura",cat:"extras",price:100,icon:"🍯",tag:"Adicional",description:"Cobertura extra.",type:"simples"},
{id:"canudo",name:"Canudinho Recheado",cat:"extras",price:100,icon:"🍫",tag:"Adicional",description:"Canudinho recheado.",type:"simples"},
{id:"agua",name:"Água",cat:"extras",price:300,icon:"💧",tag:"Bebida",description:"Água.",type:"simples"},
{id:"copo-peq",name:"Copinho ou casquinha adicional",cat:"extras",price:50,icon:"🍦",tag:"Adicional",description:"Escolha copinho ou casquinha.",type:"recipiente"},
{id:"copo-grande",name:"Cascão ou copão adicional",cat:"extras",price:50,icon:"🍨",tag:"Adicional",description:"Escolha cascão ou copão.",type:"grande"},
{id:"especial-extra",name:"Adicional Especial",cat:"extras",price:250,icon:"✨",tag:"Adicional",description:"Adicional especial para combinar com seu pedido.",type:"simples"}
];
const $=id=>document.getElementById(id);
const brl=c=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(c/100);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let category="todos",active=null,qty=1,cart=[];
try{const saved=JSON.parse(localStorage.getItem("porto_cart_v1")||"[]");if(Array.isArray(saved)){cart=saved.filter(x=>products.some(p=>p.id===x.id)&&Number.isInteger(x.qty)&&x.qty>0&&x.qty<=99&&typeof x.choice==="string"&&typeof x.note==="string").slice(0,60).map(x=>{const p=products.find(p=>p.id===x.id);return {id:p.id,choice:x.choice.slice(0,140),note:x.note.slice(0,220),extra:Boolean(x.extra)&&p.type==="milk",unit:p.price+((Boolean(x.extra)&&p.type==="milk")?250:0),qty:x.qty}})}}catch(e){cart=[]}
const save=()=>{try{localStorage.setItem("porto_cart_v1",JSON.stringify(cart))}catch(e){}};
let lastFocus=null;
const toast=t=>{const e=$("toast");e.textContent=t;e.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>e.classList.remove("show"),3500)};
function renderProducts(){const q=$("search").value.toLocaleLowerCase("pt-BR").trim();const items=products.filter(p=>(category==="todos"||p.cat===category)&&[p.name,p.description,p.tag,...(p.flavors||[])].join(" ").toLocaleLowerCase("pt-BR").includes(q));$("productGrid").innerHTML=items.map(p=>'<article class="product"><div class="product-art art-'+p.cat+'"><img class="product-photo" src="assets/products/'+p.id+'.svg" alt="Ilustração de '+esc(p.name)+'" width="480" height="360" loading="lazy" decoding="async"></div><div class="product-body"><span class="pill">'+esc(p.tag)+'</span><h3>'+esc(p.name)+'</h3><p>'+esc(p.description)+'</p><div class="product-bottom"><span class="price">'+brl(p.price)+'</span><button type="button" class="add" aria-label="Escolher '+esc(p.name)+'" data-product="'+p.id+'">+</button></div></div></article>').join("");$("empty").hidden=items.length>0}
function refresh(){const count=cart.reduce((a,x)=>a+x.qty,0);const total=cart.reduce((a,x)=>a+x.qty*x.unit,0);$("cartCount").textContent=count;$("mobileCount").textContent=count;$("mobileTotal").textContent=brl(total)+" →";renderCart()}
function show(which){lastFocus=document.activeElement;$("overlay").classList.add("open");$("productDialog").classList.toggle("open",which==="product");$("cartDrawer").classList.toggle("open",which==="cart");$("productDialog").setAttribute("aria-hidden",String(which!=="product"));$("cartDrawer").setAttribute("aria-hidden",String(which!=="cart"));document.body.style.overflow="hidden";(which==="product"?$("productClose"):$("cartClose")).focus()}
function hide(){const had=$("overlay").classList.contains("open");$("overlay").classList.remove("open");$("productDialog").classList.remove("open");$("cartDrawer").classList.remove("open");$("productDialog").setAttribute("aria-hidden","true");$("cartDrawer").setAttribute("aria-hidden","true");document.body.style.overflow="";if(had&&lastFocus&&lastFocus.isConnected)lastFocus.focus()}
function makeSelect(title,opts,key){return '<label class="field required">'+esc(title)+'<select id="'+key+'" required><option value="">Selecione uma opção</option>'+opts.map(v=>'<option value="'+esc(v)+'">'+esc(v)+'</option>').join("")+'</select></label>'}
function openProduct(id){active=products.find(p=>p.id===id);if(!active)return;qty=1;$("productTitle").textContent=active.name;$("productPrice").textContent=brl(active.price);$("productNote").value="";let fields="";
if(active.type==="recipiente")fields+=makeSelect("Escolha o recipiente",["Casquinha","Copinho"],"optRec");
if(active.type==="grande")fields+=makeSelect("Escolha o recipiente",["Cascão","Copão"],"optRec");
if(active.type==="trufado-peq"){fields+=makeSelect("Recheio trufado",sauces,"optSauce");fields+='<p class="option-note">Recheios conforme as opções da tabela.</p>'}
if(active.type==="trufado-grande"){fields+=makeSelect("Recheio trufado",sauces,"optSauce");fields+='<p class="option-note">Se preferir copão, informe nas observações para consultar.</p>'}
if(active.type==="milk"){fields+=makeSelect("Sabor do milk-shake",active.flavors,"optFlavor");fields+='<label class="checkrow"><input type="checkbox" id="extraSpecial">Adicionar especial (+ '+brl(250)+')</label>'}
if(active.cat==="sorvetes"&&active.type!=="milk"){fields+='<p class="option-note">O cardápio fotografado não informa os sabores de sorvete de massa. Você pode pedir uma preferência nas observações; a loja confirmará a disponibilidade.</p>'}
$("productOptions").innerHTML=fields;updateModal();show("product")}
function updateModal(){$("modalQty").textContent=qty;const extra=$("extraSpecial")&&$("extraSpecial").checked?250:0;$("addCart").textContent="Adicionar · "+brl((active?active.price+extra:0)*qty)}
function renderCart(){if(!cart.length){$("cartItems").innerHTML='<div class="cart-empty"><div>🛒</div><strong>Seu carrinho está vazio</strong><p>Escolha suas delícias para começar.</p><button type="button" class="btn secondary" id="goMenu">Voltar ao cardápio</button></div>';$("checkoutArea").hidden=true;return}
$("checkoutArea").hidden=false;$("cartItems").innerHTML=cart.map((x,i)=>{const p=products.find(p=>p.id===x.id);return '<article class="cart-item"><div class="cart-item-icon" aria-hidden="true">'+p.icon+'</div><div><strong>'+esc(p.name)+'</strong><small>'+esc([x.choice,x.extra?"Com adicional especial":null,x.note].filter(Boolean).join(" · "))+'</small><div class="qty small"><button type="button" data-dec="'+i+'" aria-label="Diminuir '+esc(p.name)+'">−</button><b>'+x.qty+'</b><button type="button" data-inc="'+i+'" aria-label="Aumentar '+esc(p.name)+'">+</button></div><button type="button" class="remove" data-remove="'+i+'">Remover</button></div><span class="cart-item-price">'+brl(x.unit*x.qty)+'</span></article>'}).join("");$("cartTotal").textContent=brl(cart.reduce((a,x)=>a+x.unit*x.qty,0))}
function orderMessage(){const name=$("clientName").value.trim(),delivery=$("fulfillment").value==="entrega";if(!name){$("clientName").reportValidity();$("clientName").focus();return null}if(delivery&&!$("address").value.trim()){toast("Preencha o endereço para consultar a entrega.");$("address").focus();return null}
let msg="*PEDIDO — PORTO SORVETES*\n\n*Cliente:* "+name+"\n*Modalidade:* "+(delivery?"Entrega — disponibilidade e taxa a confirmar":"Retirada — a confirmar");
if(delivery)msg+="\n*Endereço:* "+$("address").value.trim();
msg+="\n\n*ITENS*\n";cart.forEach(x=>{const p=products.find(p=>p.id===x.id);msg+="\n• "+x.qty+"x "+p.name+" — "+brl(x.unit*x.qty);if(x.choice)msg+="\n  Opção: "+x.choice;if(x.extra)msg+="\n  Com adicional especial";if(x.note)msg+="\n  Obs.: "+x.note;});
msg+="\n\n*Subtotal dos produtos:* "+brl(cart.reduce((a,x)=>a+x.unit*x.qty,0));if(delivery)msg+="\n*Taxa de entrega:* a confirmar";const note=$("orderNote").value.trim();if(note)msg+="\n*Observações gerais:* "+note;msg+="\n\nPor favor, confirmem a disponibilidade, o valor final e a forma de pagamento.";return msg}
$("productGrid").addEventListener("click",e=>{const b=e.target.closest("[data-product]");if(b)openProduct(b.dataset.product)});
$("categories").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;category=b.dataset.category;document.querySelectorAll(".chip").forEach(n=>{const on=n===b;n.classList.toggle("active",on);n.setAttribute("aria-pressed",String(on))});renderProducts()});
$("search").addEventListener("input",renderProducts);
["cartOpen","cartOpen2","cartMobile"].forEach(id=>$(id).addEventListener("click",()=>show("cart")));
$("productClose").addEventListener("click",hide);$("cartClose").addEventListener("click",hide);$("overlay").addEventListener("click",hide);document.addEventListener("keydown",e=>{if(e.key==="Escape")hide();if(e.key==="Tab"&&$("overlay").classList.contains("open")){const pane=$("productDialog").classList.contains("open")?$("productDialog"):$("cartDrawer");const focus=Array.from(pane.querySelectorAll("button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled)")).filter(n=>n.getClientRects().length);if(focus.length){if(e.shiftKey&&document.activeElement===focus[0]){e.preventDefault();focus[focus.length-1].focus()}else if(!e.shiftKey&&document.activeElement===focus[focus.length-1]){e.preventDefault();focus[0].focus()}}}});
$("minus").addEventListener("click",()=>{qty=Math.max(1,qty-1);updateModal()});$("plus").addEventListener("click",()=>{qty=Math.min(99,qty+1);updateModal()});$("productOptions").addEventListener("change",updateModal);
$("productForm").addEventListener("submit",e=>{e.preventDefault();if(!active||!e.target.reportValidity())return;const opt=["optRec","optSauce","optFlavor"].map(k=>$(k)&&$(k).value).filter(Boolean).join(" / ");const extra=!!($("extraSpecial")&&$("extraSpecial").checked);cart.push({id:active.id,choice:opt,note:$("productNote").value.trim(),extra:extra,unit:active.price+(extra?250:0),qty:qty});save();refresh();hide();toast("Adicionado ao carrinho!")});
$("cartItems").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;if(b.id==="goMenu"){hide();$("cardapio").scrollIntoView({behavior:"smooth"});return}for(const key of ["inc","dec","remove"]){if(b.hasAttribute("data-"+key)){const i=Number(b.getAttribute("data-"+key));if(!cart[i])return;if(key==="remove")cart.splice(i,1);else if(key==="inc")cart[i].qty=Math.min(99,cart[i].qty+1);else{cart[i].qty--;if(cart[i].qty<=0)cart.splice(i,1)}save();refresh();const target=$("cartItems").querySelector('[data-'+key+'="'+Math.min(i,cart.length-1)+'"]')||$("cartItems").querySelector("button")||$("cartClose");target.focus();return}}});
$("fulfillment").addEventListener("change",()=>{$("addressField").hidden=$("fulfillment").value!=="entrega";$("address").required=$("fulfillment").value==="entrega"});
function whats(){return String((window.PORTO_CONFIG||{}).whatsapp||"").replace(/\D/g,"")}
const validWhats=()=>/^55\d{10,11}$/.test(whats());
if(!validWhats()){$("whatsNotice").hidden=false;$("sendWhats").disabled=true;$("sendWhats").title="WhatsApp da loja não configurado"}
$("checkoutForm").addEventListener("submit",e=>{e.preventDefault();if(!cart.length)return;const msg=orderMessage();if(!msg)return;if(!validWhats()){toast("Configure o WhatsApp da loja no arquivo config.js");return}window.location.href="https://wa.me/"+whats()+"?text="+encodeURIComponent(msg)});
$("copyOrder").addEventListener("click",async()=>{if(!cart.length)return;const msg=orderMessage();if(!msg)return;try{await navigator.clipboard.writeText(msg);toast("Pedido copiado!")}catch(e){toast("Não foi possível copiar automaticamente neste navegador.")}});
renderProducts();refresh();
})();
