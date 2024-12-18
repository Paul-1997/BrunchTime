import{K as d,G as n,H as r,S as o,M as c}from"./index-C3VS7dNT.js";const h={BASE_URL:"/BrunchTime/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_APP_API_NAME:"paul7426",VITE_APP_API_URL:"https://vue3-course-api.hexschool.io"},{VITE_APP_API_NAME:e}=h,p=d("articles",{state(){return{articleList:[],pagination:{},onLoading:!1}},actions:{async getArticles(a){try{const i=`v2/api/${e}/${a==="admin"?"admin/":""}articles`;this.onLoading=!0;const{data:t}=await n(i,"get",a==="admin");this.articleList=t.articles,this.pagination=t.pagination}catch{r()}finally{this.onLoading=!1}},async getSingleArticle(a){try{const i=`v2/api/${e}/article/${a}`;this.onLoading=!0;const{data:t}=await n(i,"get");return t.article}catch{return r(),!1}finally{this.onLoading=!1}},async deleteArticle(a){var i;try{const t=`v2/api/${e}/admin/article/${a}`;this.onLoading=!0;const{data:s}=await n(t,"delete",!0);s.success&&(o("文章已刪除"),this.getArticles("admin"))}catch(t){c.isAxiosError(t)&&r(((i=t.response)==null?void 0:i.data.message)||"錯誤!")}finally{this.onLoading=!1}},async updateArticle(a){var i;try{const t=a.id?`v2/api/${e}/admin/article/${a.id}`:`v2/api/${e}/admin/article`,s=a.id?"put":"post";this.onLoading=!0;const{data:l}=await n(t,s,!0,{data:{...a}});l.success&&(o(s==="put"?"文章已更新":"文章已建立"),this.getArticles("admin"))}catch(t){c.isAxiosError(t)&&r(((i=t.response)==null?void 0:i.data.message)||"錯誤!")}finally{this.onLoading=!1}}}}),u=p;export{u as N};
