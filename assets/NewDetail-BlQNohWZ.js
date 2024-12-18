import{N as f}from"./newsStore-BGhjGuq_.js";import{m as k,x as L,_ as y,c as o,a as e,e as u,f as p,t as l,C as c,d as m,g as d,F as v,z as x,r as _,o as r,D as C}from"./index-C3VS7dNT.js";import{f as B}from"./useHelper-DjwVwIQF.js";import{L as N}from"./LoadingComp-036xVdR_.js";import{B as A}from"./BreadcrumbComp-Bim5LVZX.js";const F={components:{Loading:N,Breadcrumb:A},data(){return{article:{}}},methods:{formatDate:B,newsLinkOption(s){const t=this.articleList.findIndex(h=>h.id===this.article.id);return this.articleList[t+s]},isCurrentNews(s){const t=this.$route.path.split("/").pop();return s===t},...k(f,["getArticles","getSingleArticle"])},computed:{...L(f,["articleList","pagination","onLoading"])},async mounted(){await this.getArticles("custom"),this.article=await this.getSingleArticle(this.$route.path.split("/").pop())},watch:{"$route.path":{async handler(s){this.article=await this.getSingleArticle(s.split("/").pop())}}}},D={class:"container"},O={class:"row justify-content-center py-8"},E={class:"col-md-9"},S={key:0,class:"news__detail mx-auto d-flex flex-column"},V={class:"news__detail__title fw-bold text-secondary fs-xl fs-md-3xl"},I={class:"ps-1 mb-2 text-neutral"},M=["datetime"],T={class:"news__detail__photoWrapper"},j=["src","alt"],z=["innerHTML"],H={key:0,class:"d-flex justify-content-between py-4"},W={class:"col-md-3 d-none d-md-block"},$={class:"position-sticky",style:{top:"70px"}},q={class:"newsListNav"},G=["onClick"];function J(s,t,h,K,i,n){const w=_("router-link"),b=_("Breadcrumb"),g=_("Loading");return r(),o("div",D,[e("div",O,[u(b,{class:"position-absolute top-0 start-0"},{"breadcrumb-item-1":p(()=>[u(w,{to:"/news"},{default:p(()=>t[2]||(t[2]=[d("最新消息")])),_:1})]),"breadcrumb-item-2":p(()=>[d(l(i.article.title),1)]),_:1}),e("div",E,[u(g,{active:s.onLoading,"is-full-page":!1,loader:"spinner",style:{display:"grid","place-content":"center","min-height":"60vh"}},null,8,["active"]),s.onLoading?c("",!0):(r(),o("div",S,[e("h3",V,l(i.article.title),1),e("p",I,[i.article.id?(r(),o("time",{key:0,datetime:new Date(i.article.create_at).toISOString(),class:"fs-sm text-neutral text-end"},"發布日期:"+l(n.formatDate(i.article.create_at/1e3)),9,M)):c("",!0)]),e("div",T,[e("img",{src:i.article.image,alt:`${i.article.title} photo`,class:"news__detail__photo mb-4 w-100"},null,8,j)]),e("p",{innerHTML:i.article.content,class:"news__detail__content py-6 py-md-8 border-bottom border-neutral-light"},null,8,z),s.articleList.length?(r(),o("div",H,[n.newsLinkOption(-1)?(r(),o("a",{key:0,href:"#",onClick:t[0]||(t[0]=m(a=>s.$router.push(`/news/${n.newsLinkOption(-1).id}`),["prevent"])),class:"me-auto"},[t[3]||(t[3]=e("p",null,"上一篇：",-1)),d(" "+l(n.newsLinkOption(-1).title),1)])):c("",!0),n.newsLinkOption(1)?(r(),o("a",{key:1,href:"#",onClick:t[1]||(t[1]=m(a=>s.$router.push(`/news/${n.newsLinkOption(1).id}`),["prevent"])),class:"ms-auto"},[t[4]||(t[4]=e("p",null,"下一篇：",-1)),d(" "+l(n.newsLinkOption(1).title),1)])):c("",!0)])):c("",!0)]))]),e("div",W,[e("nav",$,[t[5]||(t[5]=e("h3",{class:"fw-bold fs-xl text-secondary p-4 ps-0 pb-0 mb-1 border-bottom border-accent border-4"},"最新消息",-1)),e("ul",q,[(r(!0),o(v,null,x(s.articleList,a=>(r(),o("li",{key:a.id,class:C(["border",{"bg-accent text-white":n.isCurrentNews(a.id)}])},[e("a",{href:"#",onClick:m(P=>s.$router.push(`/news/${a.id}`),["prevent"]),class:"p-3 d-block fw-semibold"},l(a.title),9,G)],2))),128))])])])])])}const Z=y(F,[["render",J],["__scopeId","data-v-11f7b0a4"]]);export{Z as default};