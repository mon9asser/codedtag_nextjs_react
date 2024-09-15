"use strict";(()=>{var t={};t.id=239,t.ids=[239,660],t.modules={9316:(t,e,s)=>{s.a(t,async(t,a)=>{try{s.r(e),s.d(e,{config:()=>h,default:()=>c,getServerSideProps:()=>_,getStaticPaths:()=>g,getStaticProps:()=>m,reportWebVitals:()=>x,routeModule:()=>$,unstable_getServerProps:()=>v,unstable_getServerSideProps:()=>y,unstable_getStaticParams:()=>j,unstable_getStaticPaths:()=>b,unstable_getStaticProps:()=>f});var i=s(7093),r=s(5244),o=s(1323),l=s(1682),n=s.n(l),p=s(8269),u=s(3031),d=t([u]);u=(d.then?(await d)():d)[0];let c=(0,o.l)(u,"default"),m=(0,o.l)(u,"getStaticProps"),g=(0,o.l)(u,"getStaticPaths"),_=(0,o.l)(u,"getServerSideProps"),h=(0,o.l)(u,"config"),x=(0,o.l)(u,"reportWebVitals"),f=(0,o.l)(u,"unstable_getStaticProps"),b=(0,o.l)(u,"unstable_getStaticPaths"),j=(0,o.l)(u,"unstable_getStaticParams"),v=(0,o.l)(u,"unstable_getServerProps"),y=(0,o.l)(u,"unstable_getServerSideProps"),$=new i.PagesRouteModule({definition:{kind:r.x.PAGES,page:"/tutorials/[tutorial]/[post]",pathname:"/tutorials/[tutorial]/[post]",bundlePath:"",filename:""},components:{App:p.default,Document:n()},userland:u});a()}catch(t){a(t)}})},3031:(t,e,s)=>{s.a(t,async(t,a)=>{try{s.r(e),s.d(e,{default:()=>h,getServerSideProps:()=>x});var i=s(997),r=s(9465),o=s(2299),l=s(7790),n=s(4352),p=s(5152),u=s.n(p),d=s(4800),c=s(2905),m=s(968),g=s.n(m),_=t([r,l,n,d,c]);[r,l,n,d,c]=_.then?(await _)():_;let f=u()(()=>s.e(548).then(s.bind(s,548)),{loadableGenerated:{modules:["pages\\tutorials\\[tutorial]\\[post].js -> ./../../../services/ad_campaign"]},ssr:!1});function h({upcoming:t}){if(!t)return i.jsx(d.z5,{});var e="";t&&(e=t?.post?.blocks?.filter(t=>"image"==t.type),e=0==e.length?"":e[0].data.file.url);var s=`
                        {
                            "@context": "https://schema.org",
                            "@type": "Article",
                            "headline": "${t?.post?.post_title}",   
                            "author": {
                                "@type": "Organization",
                                "name": "${t?.settings?.site_name}"  
                            },
                            "datePublished": "${t?.post?.created_date}",   
                            "dateModified": "${t?.post?.updated_date}",   
                            "description": "${t?.post?.meta_description}",   
                            "publisher": {
                                "@type": "Organization",
                                "name": "${t?.settings?.site_name}",  
                                "logo": {
                                "@type": "ImageObject",
                                "url": "${t?.settings?.site_logo}"  
                                }
                            },
                            "mainEntityOfPage": {
                                "@type": "WebPage",
                                "@id": "${t?.site_url}tutorials/${t?.tutorial?.slug}/${t?.post?.slug}/"   
                            },
                            "url": "${t?.site_url}tutorials/${t?.tutorial?.slug}/${t?.post?.slug}/",  
                            "articleSection": "${t?.tutorial?.tag}",   
                            "keywords": "${t?.post?.keyphrase}",  
                            "image": "${e}",  
                            "breadcrumb": {
                                "@context": "https://schema.org",
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    {
                                        "@type": "ListItem",
                                        "position": 1,
                                        "name": "Home",
                                        "item": "${t?.site_url}"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 2,
                                        "name": "Tutorials",
                                        "item": "${t?.site_url}tutorials/"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 3,
                                        "name": "${t?.tutorial?.tutorial_title}",
                                        "item": "${t?.site_url}tutorials/${t?.tutorial?.slug}/"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 4,
                                        "name": "${t?.post?.post_title}",
                                        "item": "${t?.site_url}tutorials/${t?.tutorial?.slug}/${t?.post?.slug}/"
                                    }
                                ]
                            }
                            }
                `,a=t?t.settings.header:"",p=t?t.settings.footer:"";let u=(0,c.default)(a),m=(0,c.default)(p);return t?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(g(),{children:[i.jsx("title",{children:t?.post?.meta_title}),i.jsx("meta",{name:"description",content:t?.post?.meta_description}),t?.post?.allow_search_engine==!1?i.jsx("meta",{name:"robots",content:"noindex, nofollow, noarchive, nosnippet, noodp, notranslate, noimageindex"}):"",i.jsx("link",{rel:"canonical",href:`${t?.site_url}tutorials/${t?.tutorial?.slug}/${t?.post?.slug}/`}),i.jsx("meta",{property:"og:locale",content:"en_US"}),i.jsx("meta",{property:"og:type",content:"article"}),i.jsx("meta",{property:"og:title",content:t?.post?.meta_title}),i.jsx("meta",{property:"og:description",content:t?.post?.meta_description}),i.jsx("meta",{property:"og:url",content:`${t?.site_url}tutorials/${t?.tutorial?.slug}/${t?.post?.slug}/`}),i.jsx("meta",{property:"og:site_name",content:t?.settings.site_name}),i.jsx("meta",{property:"og:image",content:t?.post?.article_thumbnail_url}),i.jsx("meta",{name:"twitter:card",content:"summary_large_image"}),i.jsx("meta",{name:"twitter:image",content:t?.post?.article_thumbnail_url}),i.jsx("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:s}}),u]}),i.jsx(l.Z,{settings:t?.settings,menus:{nav_left:t?.nav_left,nav_right:t?.nav_right}}),i.jsx(()=>i.jsx("main",{className:"wrapper max-1150 offset-left offset-right ptb-50",children:(0,i.jsxs)("div",{className:"row mlr--20",children:[t?.tutorial.options.sidebar_content!="none"?i.jsx("div",{className:"md-4 md-1-half plr-20 main-sidebar flex-order-2-md",children:(0,i.jsxs)(r.default,{offsetTop:85,offsetBottom:20,children:[i.jsx(f,{settings:t.settings,data:t?.ads,position:"before_sidebar"}),t?.tutorial.options.sidebar_content=="chapters"&&t?.chapters.length!=0?i.jsx(d.Ap,{helper:{ads:t?.ads,settings:t?.settings},site_url:t?.site_url,tutorial_slug:t?.tutorial.slug,type:"chapters",data:t?.chapters,current_post_slug:t?.post.slug}):i.jsx(d.Ap,{helper:{ads:t?.ads,settings:t?.settings},site_url:t?.site_url,tutorial_slug:t?.tutorial.slug,type:"posts",data:t?.posts,current_post_slug:t?.post.slug})]})}):"",(0,i.jsxs)("div",{className:`plr-20 md-2-content main-content flex-order-1-md ${t?.tutorial.options.sidebar_content=="none"?"md-9 auto-sides":"md-8"}`,children:[(0,i.jsxs)("div",{className:"max-1150 offset-left offset-right demove-ads",children:[i.jsx(f,{settings:t.settings,data:t?.ads,position:"before_title"}),(0,i.jsxs)("header",{className:"flexbox content-center column-direction mb-30",children:[i.jsx("div",{className:"flexbox items-center",children:i.jsx(d.Oo,{data:[{title:t?.tutorial.selected_category.name,url:t?.site_url+"tutorials/"},{title:t?.tutorial.tutorial_title,url:t?.site_url+"tutorials/"+t?.tutorial.slug+"/"}]})}),i.jsx("h1",{className:"tutorial-headline mt-h",children:o.W.decodeHtmlEntities(t?.post.post_title)}),(0,i.jsxs)("i",{className:"modified-date",children:["Last updated on ",i.jsx("time",{dateTime:o.W.formated_published_date(t?.post.updated_date).value,children:o.W.formated_published_date(t?.post.updated_date).text})]})]}),i.jsx(f,{settings:t.settings,data:t?.ads,position:"after_title"}),i.jsx("div",{className:"lg-2-content tutorial-content content-section",children:i.jsx(d.Zw,{helper:{ads:t?.ads,settings:t?.settings},blocks:t?.post.blocks})})]}),t?.posts?.length>1?(0,i.jsxs)(i.Fragment,{children:[i.jsx("div",{className:"separator-div"}),t?.tutorial.options.sidebar_content=="chapters"&&t?.chapters.length!=0?i.jsx(d.cm,{site_url:t?.site_url,tutorial_slug:t?.tutorial.slug,type:"chapters",data:t?.chapters,current_post_slug:t?.post.slug}):i.jsx(d.cm,{site_url:t?.site_url,tutorial_slug:t?.tutorial.slug,type:"posts",data:t?.posts,current_post_slug:t?.post.slug}),i.jsx("div",{className:"separator-div"})]}):"",i.jsx("div",{className:"wrapper max-800 text-center chapter-block-hlght box-vote-block",children:t?.settings.share_social_buttons==""?"":(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("span",{children:["Share ",i.jsx("b",{className:"share-txt-on",children:t?.post.post_title})," on:"]}),i.jsx("div",{className:"flexbox gap-15 share-box",children:i.jsx(d.Du,{platforms:t?.settings.share_social_buttons,url:`${t?.site_url}tutorials/${t?.tutorial.slug}/${t?.post.slug}/`,title:t?.post.meta_title,size:32,height:"32px",width:"32px",radius:!t?.settings.circle_buttons})})]})}),i.jsx(f,{settings:t.settings,data:t?.ads,position:"after_contents"}),i.jsx(d.VH,{data_id:t?.post._id,data_title:t?.post.post_title})]})]})}),{}),i.jsx(n.Z,{settings:t?.settings,menus:{company_links:t?.company_links,follow_links:t?.follow_links,nav_links:t?.nav_links}}),m]}):""}async function x(t){try{var{tutorial:e,post:s}=t.params,a=await o.W.sendRequest({api:`post-page/get?tut_name=${e}&post_slug=${s}&tab=root`,method:"get",data:{}});if(!a.ok)throw Error("Server is offline");var i={};if(200==a.status){var r=await a.json();if(r.is_error||void 0==r.data.post||null==r.data.post)return{notFound:!0};var l=r.data.settings.site_address;if(l){var n=l.split("/");""!=n[n.length-1]&&(l+="/")}r.data.settings.site_address=l,r.data.settings?.beside_post_title!=""&&r.data.post.enable_beside_title&&(r.data.post.meta_title=r.data.post.meta_title+" "+r.data.settings?.beside_post_title);var p=r.data.menus?.filter(t=>"main_menu"===t.menu_name),u=r.data.menus?.filter(t=>"main_nav_right"===t.menu_name),d=r.data.menus?.filter(t=>"company_nav_links"===t.menu_name),c=r.data.menus?.filter(t=>"follow_nav_links"===t.menu_name),m=r.data.menus?.filter(t=>"tags_nav_links"===t.menu_name);i={nav_right:u,nav_left:p,company_links:d,follow_links:c,nav_links:m,site_url:l,ads:r.data.ads,menus:r.data.menus,post:r.data.post,settings:r.data.settings,chapters:r.data.chapters,tutorial:r.data.tutorial,posts:r.data.posts,is_redirect:r.redirect}}return{props:{upcoming:i}}}catch(e){return t.res.statusCode=500,{props:{error:"Server is offline, please try again later."}}}}a()}catch(t){a(t)}})},1604:t=>{t.exports=require("he")},2785:t=>{t.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},968:t=>{t.exports=require("next/head")},6689:t=>{t.exports=require("react")},6405:t=>{t.exports=require("react-dom")},2368:t=>{t.exports=require("react-highlight")},997:t=>{t.exports=require("react/jsx-runtime")},2905:t=>{t.exports=import("html-react-parser")},2017:t=>{t.exports=import("react-share")},9465:t=>{t.exports=import("react-sticky-box")},7147:t=>{t.exports=require("fs")},1017:t=>{t.exports=require("path")},2781:t=>{t.exports=require("stream")},9796:t=>{t.exports=require("zlib")}};var e=require("../../../webpack-runtime.js");e.C(t);var s=t=>e(e.s=t),a=e.X(0,[682,201,770,821],()=>s(9316));module.exports=a})();