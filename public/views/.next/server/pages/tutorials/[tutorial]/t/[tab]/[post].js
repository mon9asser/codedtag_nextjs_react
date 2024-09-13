"use strict";(()=>{var t={};t.id=62,t.ids=[62,660],t.modules={3676:(t,e,s)=>{s.a(t,async(t,a)=>{try{s.r(e),s.d(e,{config:()=>x,default:()=>c,getServerSideProps:()=>_,getStaticPaths:()=>g,getStaticProps:()=>m,reportWebVitals:()=>h,routeModule:()=>y,unstable_getServerProps:()=>v,unstable_getServerSideProps:()=>$,unstable_getStaticParams:()=>j,unstable_getStaticPaths:()=>f,unstable_getStaticProps:()=>b});var r=s(7093),i=s(5244),o=s(1323),n=s(1682),l=s.n(n),p=s(8269),u=s(7243),d=t([u]);u=(d.then?(await d)():d)[0];let c=(0,o.l)(u,"default"),m=(0,o.l)(u,"getStaticProps"),g=(0,o.l)(u,"getStaticPaths"),_=(0,o.l)(u,"getServerSideProps"),x=(0,o.l)(u,"config"),h=(0,o.l)(u,"reportWebVitals"),b=(0,o.l)(u,"unstable_getStaticProps"),f=(0,o.l)(u,"unstable_getStaticPaths"),j=(0,o.l)(u,"unstable_getStaticParams"),v=(0,o.l)(u,"unstable_getServerProps"),$=(0,o.l)(u,"unstable_getServerSideProps"),y=new r.PagesRouteModule({definition:{kind:i.x.PAGES,page:"/tutorials/[tutorial]/t/[tab]/[post]",pathname:"/tutorials/[tutorial]/t/[tab]/[post]",bundlePath:"",filename:""},components:{App:p.default,Document:l()},userland:u});a()}catch(t){a(t)}})},7243:(t,e,s)=>{s.a(t,async(t,a)=>{try{s.r(e),s.d(e,{default:()=>g,getServerSideProps:()=>_});var r=s(997);s(4542);var i=s(968),o=s.n(i);s(5675);var n=s(2905),l=s(2299),p=s(7790),u=s(4352),d=s(9465),c=s(4800);s(1163),s(1664),s(9332);var m=t([n,p,u,d,c]);function g({upcoming:t}){if(!t)return r.jsx(c.z5,{});var e="";t&&(e=t?.post?.blocks?.filter(t=>"image"==t.type),e=0==e.length?"":e[0].data.file.url);let s=(0,n.default)(t.settings.header),a=(0,n.default)(t.settings.footer);var i=`
                            {
                                "@context": "https://schema.org",
                                "@type": "Article",
                                "headline": "${t.post?.post_title}",   
                                "author": {
                                    "@type": "Organization",
                                    "name": "${t.settings?.site_name}"  
                                },
                                "datePublished": "${t.post?.created_date}",  
                                "dateModified": "${t.post?.updated_date}",   
                                "description": "${t.post?.meta_description}",   
                                "publisher": {
                                    "@type": "Organization",
                                    "name": "${t.settings?.site_name}",  
                                    "logo": {
                                    "@type": "ImageObject",
                                    "url": "${t.settings?.site_logo}"  
                                    }
                                },
                                "mainEntityOfPage": {
                                    "@type": "WebPage",
                                    "@id": "${t.site_url}tutorials/${t.tutorial?.slug}/t/${t.tab?.slug}/${t.post?.slug}/"   
                                },
                                "url": "${t.site_url}tutorials/${t.tutorial?.slug}/t/${t.tab?.slug}/${t.post?.slug}/",  
                                "articleSection": "${t.tutorial?.tag}",   
                                "keywords": "${t.post?.keyphrase}",  
                                "image": "${e}",  
                                "breadcrumb": {
                                    "@context": "https://schema.org",
                                    "@type": "BreadcrumbList",
                                    "itemListElement": [
                                        {
                                            "@type": "ListItem",
                                            "position": 1,
                                            "name": "Home",
                                            "item": "${t.site_url}"
                                        },
                                        {
                                            "@type": "ListItem",
                                            "position": 2,
                                            "name": "Tutorials",
                                            "item": "${t.site_url}tutorials/"
                                        },
                                        {
                                            "@type": "ListItem",
                                            "position": 3,
                                            "name": "${t.tutorial?.tutorial_title}",
                                            "item": "${t.site_url}tutorials/${t.tutorial?.slug}/"
                                        },
                                        {
                                            "@type": "ListItem",
                                            "position": 4,
                                            "name": "${t.tab?.title}",
                                            "item": "${t.site_url}tutorials/${t.tutorial?.slug}/t/${t.tab?.slug}/"
                                        },
                                        {
                                            "@type": "ListItem",
                                            "position": 5,
                                            "name": "${t.post?.post_title}",
                                            "item": "${t.site_url}tutorials/${t.tutorial?.slug}/t/${t.tab?.slug}/${t.post?.slug}/"
                                        }
                                    ]
                                }
                                }
                    `;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(o(),{children:[r.jsx("title",{children:t.post?.meta_title}),r.jsx("meta",{name:"description",content:t.post?.meta_description}),t.post?.allow_search_engine==!1?r.jsx("meta",{name:"robots",content:"noindex, nofollow, noarchive, nosnippet, noodp, notranslate, noimageindex"}):"",r.jsx("link",{rel:"canonical",href:`${t.site_url}tutorials/${t.tutorial?.slug}/t/${t.tab?.slug}/${t.post?.slug}/`}),r.jsx("meta",{property:"og:locale",content:"en_US"}),r.jsx("meta",{property:"og:type",content:"article"}),r.jsx("meta",{property:"og:title",content:t.post?.meta_title}),r.jsx("meta",{property:"og:description",content:t.post?.meta_description}),r.jsx("meta",{property:"og:url",content:`${t.site_url}tutorials/${t.tutorial?.slug}/t/${t.tab?.slug}/${t.post?.slug}/`}),r.jsx("meta",{property:"og:site_name",content:t.settings.site_name}),r.jsx("meta",{property:"og:image",content:t.post?.article_thumbnail_url}),r.jsx("meta",{name:"twitter:card",content:"summary_large_image"}),r.jsx("meta",{name:"twitter:image",content:t.post?.article_thumbnail_url}),r.jsx("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:i}}),s]}),r.jsx(p.Z,{settings:t.settings,menus:{nav_left:t.nav_left,nav_right:t.nav_right}}),r.jsx(()=>r.jsx("main",{className:"wrapper max-1150 offset-left offset-right ptb-50",children:(0,r.jsxs)("div",{className:"row mlr--20",children:["none"!=t.tab.sidebar_content?r.jsx("div",{className:"md-4 md-1-half plr-20 main-sidebar flex-order-2-md",children:(0,r.jsxs)(d.default,{offsetTop:85,offsetBottom:20,children:[r.jsx(c._H,{settings:t.settings,data:t.ads,position:"before_sidebar"}),"chapters"==t.tab.sidebar_content&&0!=t.chapters.length?r.jsx(c.Ap,{helper:{ads:t.ads,settings:t.settings},site_url:t.site_url,tutorial_slug:t.tutorial.slug,type:"chapters",data:t.chapters,current_post_slug:t.post.slug,tab_slug:t.tab.slug}):r.jsx(c.Ap,{helper:{ads:t.ads,settings:t.settings},site_url:t.site_url,tutorial_slug:t.tutorial.slug,type:"posts",data:t.posts,current_post_slug:t.post.slug,tab_slug:t.tab.slug})]})}):"",(0,r.jsxs)("div",{className:`plr-20 md-2-content main-content flex-order-1-md ${"none"==t.tutorial.options.sidebar_content?"md-9 auto-sides":"md-8"}`,children:[(0,r.jsxs)("div",{className:"max-1150 offset-left offset-right",children:[r.jsx(c._H,{settings:t.settings,data:t.ads,position:"before_title"}),(0,r.jsxs)("header",{className:"flexbox content-center column-direction mb-30",children:[r.jsx("h1",{className:"tutorial-headline mt-h",children:l.W.decodeHtmlEntities(t.post.post_title)}),(0,r.jsxs)("i",{className:"modified-date",children:["Last updated on ",r.jsx("time",{dateTime:l.W.formated_published_date(t.post.updated_date).value,children:l.W.formated_published_date(t.post.updated_date).text})]})]}),r.jsx(c._H,{settings:t.settings,data:t.ads,position:"after_title"}),r.jsx("div",{className:"lg-2-content tutorial-content content-section",children:r.jsx(c.Zw,{helper:{ads:t.ads,settings:t.settings},blocks:t.post.blocks})})]}),t.posts?.length>1?(0,r.jsxs)(r.Fragment,{children:[r.jsx("div",{className:"separator-div"}),"chapters"==t.tutorial.options.sidebar_content&&0!=t.chapters.length?r.jsx(c.cm,{site_url:t.site_url,tutorial_slug:t.tutorial.slug,type:"chapters",data:t.chapters,current_post_slug:t.post.slug}):r.jsx(c.cm,{site_url:t.site_url,tutorial_slug:t.tutorial.slug,type:"posts",data:t.posts,current_post_slug:t.post.slug}),r.jsx("div",{className:"separator-div"})]}):"",r.jsx("div",{className:"wrapper max-800 text-center chapter-block-hlght box-vote-block",children:""==t.settings.share_social_buttons?"":(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("span",{children:["Share ",r.jsx("b",{className:"share-txt-on",children:t.post.post_title})," on:"]}),r.jsx("div",{className:"flexbox gap-15 share-box",children:r.jsx(c.Du,{platforms:t.settings.share_social_buttons,url:`${t.site_url}tutorials/${t.tutorial?.slug}/t/${t.tab?.slug}/${t.post?.slug}/`,title:t.post.meta_title,size:32,height:"32px",width:"32px",radius:!t.settings.circle_buttons})})]})}),r.jsx(c._H,{settings:t.settings,data:t.ads,position:"after_contents"}),r.jsx(c.VH,{data_id:t.post._id,data_title:t.post.post_title})]})]})}),{}),r.jsx(u.Z,{settings:t.settings,menus:{company_links:t.company_links,follow_links:t.follow_links,nav_links:t.nav_links}}),a]})}async function _(t){try{var e=t.params,s=await l.W.sendRequest({api:`post-page/get?tut_name=${e.tutorial}&post_slug=${e.post}&tab=${e.tab}`,method:"get",data:{}});if(!s.ok)throw Error("Server is offline");var a={};if(200==s.status){var r=await s.json();if(r.is_error||void 0==r.data.post||null==r.data.post)return{notFound:!0};var i=r.data.settings.site_address;if(i){var o=i.split("/");""!=o[o.length-1]&&(i+="/")}r.data.settings.site_address=i;var n=null,p=r.data?.tutorial?.tabs?.filter(t=>t.slug==e.tab);if(p?.length&&(n=p[0]),null==n)return{notFound:!0};r.data.settings?.beside_post_title!=""&&r.data.post.enable_beside_title&&(r.data.post.meta_title=r.data.post.meta_title+" "+r.data.settings?.beside_post_title);var u=r.data.menus?.filter(t=>"main_menu"===t.menu_name),d=r.data.menus?.filter(t=>"main_nav_right"===t.menu_name),c=r.data.menus?.filter(t=>"company_nav_links"===t.menu_name),m=r.data.menus?.filter(t=>"follow_nav_links"===t.menu_name),g=r.data.menus?.filter(t=>"tags_nav_links"===t.menu_name);a={nav_right:d,nav_left:u,company_links:c,follow_links:m,nav_links:g,site_url:i,ads:r.data.ads,menus:r.data.menus,post:r.data.post,settings:r.data.settings,chapters:r.data.chapters,tutorial:r.data.tutorial,posts:r.data.posts,is_redirect:r.redirect,tab:n}}return{props:{upcoming:a}}}catch(e){return t.res.statusCode=500,{props:{error:"Server is offline, please try again later."}}}}[n,p,u,d,c]=m.then?(await m)():m,a()}catch(t){a(t)}})},1604:t=>{t.exports=require("he")},2934:t=>{t.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:t=>{t.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:t=>{t.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},2785:t=>{t.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},968:t=>{t.exports=require("next/head")},6689:t=>{t.exports=require("react")},6405:t=>{t.exports=require("react-dom")},2368:t=>{t.exports=require("react-highlight")},997:t=>{t.exports=require("react/jsx-runtime")},2905:t=>{t.exports=import("html-react-parser")},2017:t=>{t.exports=import("react-share")},9465:t=>{t.exports=import("react-sticky-box")},7147:t=>{t.exports=require("fs")},1017:t=>{t.exports=require("path")},2781:t=>{t.exports=require("stream")},9796:t=>{t.exports=require("zlib")}};var e=require("../../../../../webpack-runtime.js");e.C(t);var s=t=>e(e.s=t),a=e.X(0,[682,201,267,332,821],()=>s(3676));module.exports=a})();