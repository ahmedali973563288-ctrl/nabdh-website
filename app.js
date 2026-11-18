const trends = [
  {cat:'ذكاء اصطناعي', type:'ai', title:'من السؤال إلى سير العمل', text:'الأدوات لا تكتفي بالإجابة؛ تتعلم ترتيب خطوات العمل نيابةً عنك.', metric:'رصد', label:'قراءة تحريرية', bar:82},
  {cat:'إعلام وفيديو', type:'media', title:'الفيديو القصير، بعمق أطول', text:'المشاهدة السريعة تتجه إلى حلقات أكثر قيمة ووقت مشاهدة أطول.', metric:'رصد', label:'قراءة تحريرية', bar:68},
  {cat:'مجتمعات', type:'community', title:'المجتمع قبل المنصة', text:'الناس يبحثون عن إجابة من شخص، لا عن صفحة نتائج فقط.', metric:'رصد', label:'قراءة تحريرية', bar:57},
  {cat:'بحث', type:'ai', title:'البحث صار حوارًا', text:'الاستعلامات الأطول تعكس رغبة المستخدم في فهم السياق من أول محاولة.', metric:'رصد', label:'قراءة تحريرية', bar:64},
  {cat:'إعلام وفيديو', type:'media', title:'الهاتف هو غرفة الأخبار', text:'الخبر الذي يصل سريعًا، ويُروى بصريًا، يبقى حاضرًا في الذاكرة.', metric:'رصد', label:'قراءة تحريرية', bar:76},
  {cat:'مجتمعات', type:'community', title:'الثقة تُبنى في التعليقات', text:'النقاشات الصغيرة أصبحت إشارة مبكرة لما سيصبح موضوعًا كبيرًا.', metric:'رصد', label:'قراءة تحريرية', bar:49}
];
const grid=document.querySelector('#trendGrid'), empty=document.querySelector('#emptyState'), input=document.querySelector('#searchInput'), searchResults=document.querySelector('#searchResults');
let active='all';
const articleResults=[{title:'أحدث تقنيات الذكاء الاصطناعي لعام 2026',text:'الوكلاء والنماذج متعددة الوسائط واستخدام الكمبيوتر والروبوتات ووكلاء البرمجة',url:'/articles/latest-ai-technologies-2026.html',keywords:'ذكاء اصطناعي تقنية وكيل روبوت برمجة AI'}, {title:'أكثر المواقع زيارة في العالم لعام 2026',text:'تحليل Google وYouTube وChatGPT والزيارات الشهرية وحصة الهاتف',url:'/articles/most-visited-websites-2026.html',keywords:'مواقع زيارة Google YouTube ChatGPT'}];
articleResults.push({title:'الأمن السيبراني وحماية الحسابات الرقمية',text:'المصادقة متعددة العوامل والتصيد الإلكتروني ومفاتيح المرور واسترداد الحساب',url:'/articles/cybersecurity-account-protection.html',keywords:'أمن سيبراني حماية حسابات كلمة مرور تصيد MFA passkey'});
function render(){const q=input.value.trim().toLowerCase();const shown=trends.filter(t=>(active==='all'||t.type===active)&&(!q||`${t.title} ${t.text} ${t.cat}`.toLowerCase().includes(q)));grid.innerHTML=shown.map(t=>`<article class="trend-card"><div><div class="card-top"><span class="category">${t.cat}</span><span class="trend-index">0${trends.indexOf(t)+1}</span></div><h3>${t.title}</h3><p>${t.text}</p></div><div class="card-bottom"><div><div class="trend-metric">${t.metric} <small>${t.label}</small></div><div class="bar"><i style="width:${t.bar}%"></i></div></div><span class="trend-index">↗</span></div></article>`).join('');empty.hidden=shown.length>0;const matches=articleResults.filter(a=>q&&`${a.title} ${a.text} ${a.keywords}`.toLowerCase().includes(q));searchResults.innerHTML=matches.map(article=>`<a class="search-article-result" href="${article.url}"><span>تقرير</span><strong>${article.title}</strong><small>${article.text} ←</small></a>`).join('')+(q&&!shown.length&&!matches.length?'<p class="search-empty">لا توجد نتائج مطابقة. جرّب «ذكاء اصطناعي» أو «فيديو» أو «مواقع».</p>':'');}
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelector('.filter.active').classList.remove('active');btn.classList.add('active');active=btn.dataset.filter;render()}));input.addEventListener('input',render);render();
const initialQuery=new URLSearchParams(location.search).get('q');if(initialQuery){input.value=initialQuery;render();}
input.addEventListener('change',()=>{const url=new URL(location.href);if(input.value.trim())url.searchParams.set('q',input.value.trim());else url.searchParams.delete('q');history.replaceState({},'',url);});
document.querySelector('#scrollNewsletter').addEventListener('click',()=>document.querySelector('#newsletter').scrollIntoView({behavior:'smooth'}));
document.querySelector('#newsletterForm').addEventListener('submit',e=>{e.preventDefault();const email=document.querySelector('#email');const msg=document.querySelector('#formMessage');if(!email.validity.valid){msg.textContent='أدخل بريدًا إلكترونيًا صالحًا لنرسل لك النبض.';msg.style.color='#bd5c43';email.focus();return}msg.textContent='تم الاشتراك بنجاح. ستصلك أول إشارة هذا الأسبوع.';msg.style.color='#3d806c';e.target.reset();});

const rankingData=[
  {site:'Google',domain:'google.com',visits:'108.9B',mobile:'64.15%',change:'+3%'},
  {site:'YouTube',domain:'youtube.com',visits:'59.97B',mobile:'62.23%',change:'+9.18%'},
  {site:'Facebook',domain:'facebook.com',visits:'12.21B',mobile:'38.24%',change:'+14.49%'},
  {site:'ChatGPT',domain:'chatgpt.com',visits:'8.23B',mobile:'15.49%',change:'+25.15%'},
  {site:'Instagram',domain:'instagram.com',visits:'6.81B',mobile:'45.49%',change:'+3.93%'},
  {site:'Reddit',domain:'reddit.com',visits:'4.82B',mobile:'60.99%',change:'−8.2%'},
  {site:'WhatsApp',domain:'whatsapp.com',visits:'4.26B',mobile:'9.57%',change:'+28.26%'},
  {site:'X',domain:'x.com',visits:'4.17B',mobile:'49.73%',change:'+2.74%'},
  {site:'Wikipedia',domain:'wikipedia.org',visits:'3.80B',mobile:'70.01%',change:'−6.4%'}
];
document.querySelector('#rankingList').innerHTML=rankingData.map((item,index)=>`<article class="ranking-row"><div class="rank-site"><span class="rank-number">${String(index+1).padStart(2,'0')}</span><span>${item.site}<small class="rank-domain">${item.domain}</small></span></div><div class="rank-value">${item.visits}<small>زيارة شهرية</small></div><div class="rank-mobile">${item.mobile}</div><div class="rank-change">${item.change}</div></article>`).join('');
