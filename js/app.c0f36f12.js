(function(){"use strict";var e={2462:function(e,t,o){var s=o(5130),n=o(6768);const r={id:"app"};function a(e,t,o,s,a,i){const l=(0,n.g2)("AppHeader"),c=(0,n.g2)("router-view"),u=(0,n.g2)("AppFooter"),p=(0,n.g2)("SideBarL"),d=(0,n.g2)("SideBarR");return(0,n.uX)(),(0,n.CE)("div",r,[(0,n.bF)(l),(0,n.bF)(c),(0,n.bF)(u),(0,n.bF)(p),(0,n.bF)(d)])}var i=o.p+"img/user-interface.647ba6c9.png";const l={class:"top-bar"},c={key:0,id:"dropdown-menu",class:"dropdown-content"};function u(e,t,o,s,r,a){const u=(0,n.g2)("router-link");return(0,n.uX)(),(0,n.CE)("header",l,[(0,n.Lk)("h1",null,[(0,n.bF)(u,{to:"/",class:"text"},{default:(0,n.k6)((()=>t[1]||(t[1]=[(0,n.eW)("Home")]))),_:1})]),(0,n.Lk)("h1",null,[(0,n.bF)(u,{to:"/addPost",class:"text"},{default:(0,n.k6)((()=>t[2]||(t[2]=[(0,n.eW)("Add Post")]))),_:1})]),(0,n.Lk)("a",null,[(0,n.Lk)("img",{id:"profile-picture",src:i,alt:"login",class:"login",onClick:t[0]||(t[0]=(...e)=>a.toggleDropdown&&a.toggleDropdown(...e))})]),r.isDropdownVisible?((0,n.uX)(),(0,n.CE)("div",c,[t[4]||(t[4]=(0,n.Lk)("p",null,"John Doe",-1)),t[5]||(t[5]=(0,n.Lk)("p",null,"johndoe@ut.ee",-1)),(0,n.bF)(u,{to:"/login",onClick:a.closeDropdown},{default:(0,n.k6)((()=>t[3]||(t[3]=[(0,n.eW)("Log out")]))),_:1},8,["onClick"])])):(0,n.Q3)("",!0)])}var p={name:"AppHeader",data(){return{isDropdownVisible:!1}},methods:{toggleDropdown(){this.isDropdownVisible=!this.isDropdownVisible},closeDropdown(){this.isDropdownVisible=!1}}},d=o(1241);const h=(0,d.A)(p,[["render",u],["__scopeId","data-v-044b6f44"]]);var f=h;const m={class:"bottom-bar"};function k(e,t,o,s,r,a){return(0,n.uX)(),(0,n.CE)("footer",m,t[0]||(t[0]=[(0,n.Lk)("div",{class:"footer-content"},[(0,n.Lk)("p",null,"© 2024 PostIt. All rights reserved."),(0,n.Lk)("p",null,[(0,n.Lk)("a",{href:"/privacy-policy",class:"footer-link"},"Privacy Policy"),(0,n.eW)(" | "),(0,n.Lk)("a",{href:"/terms-of-service",class:"footer-link"},"Terms of Service")]),(0,n.Lk)("p",null,[(0,n.eW)("Contact us: "),(0,n.Lk)("a",{href:"mailto:help@needed.com"},"help@needed.com")])],-1)]))}var g={name:"AppFooter"};const v=(0,d.A)(g,[["render",k],["__scopeId","data-v-5515a869"]]);var b=v;const L={class:"side-bar-l"};function w(e,t,o,s,r,a){return(0,n.uX)(),(0,n.CE)("footer",L)}var P={name:"SideBarL"};const y=(0,d.A)(P,[["render",w],["__scopeId","data-v-e57c71be"]]);var A=y;const C={class:"side-bar-r"};function _(e,t,o,s,r,a){return(0,n.uX)(),(0,n.CE)("footer",C)}var E={name:"SideBarR"};const F=(0,d.A)(E,[["render",_],["__scopeId","data-v-7ccccd3e"]]);var S=F,X={name:"App",components:{AppHeader:f,AppFooter:b,SideBarL:A,SideBarR:S},created(){this.$store.dispatch("fetchPosts")}};const D=(0,d.A)(X,[["render",a]]);var j=D,O=o(1387);const U={class:"posts-container"},V={class:"reset-container"};function $(e,t,o,s,r,a){const i=(0,n.g2)("Post");return(0,n.uX)(),(0,n.CE)("div",null,[(0,n.Lk)("div",U,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(a.posts,(e=>((0,n.uX)(),(0,n.CE)("div",{key:e.id},[(0,n.bF)(i,{post:e},null,8,["post"])])))),128))]),(0,n.Lk)("div",V,[(0,n.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>a.resetLikes&&a.resetLikes(...e))},"Reset All Likes")])])}var x=o(4232);const B={class:"post"},I={class:"post-header"},W=["src"],H={class:"post-date"},J=["src"],M={class:"post-footer"};function q(e,t,o,s,r,a){return(0,n.uX)(),(0,n.CE)("div",B,[(0,n.Lk)("div",I,[(0,n.Lk)("img",{src:o.post.profile_picture,alt:"User",class:"user-icon"},null,8,W),(0,n.Lk)("span",H,(0,x.v_)(o.post.date),1)]),(0,n.Lk)("h3",null,(0,x.v_)(o.post.title),1),o.post.image?((0,n.uX)(),(0,n.CE)("img",{key:0,src:o.post.image,alt:"Post Image",class:"post-image"},null,8,J)):(0,n.Q3)("",!0),(0,n.Lk)("div",M,[(0,n.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>a.likePost&&a.likePost(...e))},"❤️ Like"),(0,n.Lk)("span",null,(0,x.v_)(o.post.likes)+" Likes",1)])])}var R={props:{post:Object},methods:{likePost(){console.log(this.post.id),this.$store.dispatch("incrementLike",this.post.id)}}};const T=(0,d.A)(R,[["render",q],["__scopeId","data-v-5ebf4238"]]);var Q=T,z={name:"HomeView",components:{Post:Q},computed:{posts(){return this.$store.getters.allPosts}},methods:{resetLikes(){this.$store.dispatch("resetLikes")}}};const Z=(0,d.A)(z,[["render",$],["__scopeId","data-v-6ade714c"]]);var K=Z;const N={class:"form-container"},G={class:"form-row"},Y={class:"form-row"};function ee(e,t,o,r,a,i){return(0,n.uX)(),(0,n.CE)("section",null,[(0,n.Lk)("div",N,[(0,n.Lk)("form",{onSubmit:t[2]||(t[2]=(0,s.D$)(((...e)=>i.submitPost&&i.submitPost(...e)),["prevent"]))},[(0,n.Lk)("div",G,[t[3]||(t[3]=(0,n.Lk)("label",{for:"post-body"},"Post body",-1)),(0,n.bo)((0,n.Lk)("textarea",{id:"post-body",name:"post-body",placeholder:"textarea","onUpdate:modelValue":t[0]||(t[0]=e=>a.postBody=e),required:""},null,512),[[s.Jo,a.postBody]])]),(0,n.Lk)("div",Y,[t[4]||(t[4]=(0,n.Lk)("label",{for:"file-upload"},"Select file",-1)),(0,n.Lk)("input",{type:"file",id:"file-upload",onChange:t[1]||(t[1]=(...e)=>i.handleFileUpload&&i.handleFileUpload(...e))},null,32)]),t[5]||(t[5]=(0,n.Lk)("button",{type:"submit"},"Create post",-1))],32)])])}o(4114);var te={name:"AddPost",data(){return{postBody:"",file:null}},methods:{handleFileUpload(e){this.file=e.target.files[0]},submitPost(){console.log("Post created:",this.postBody,this.file),this.$router.push("/")}}};const oe=(0,d.A)(te,[["render",ee]]);var se=oe;const ne={class:"container"},re={class:"login-box"};function ae(e,t,o,r,a,i){const l=(0,n.g2)("router-link");return(0,n.uX)(),(0,n.CE)("div",ne,[(0,n.Lk)("div",re,[t[5]||(t[5]=(0,n.Lk)("h2",null,"Welcome to PostIt",-1)),(0,n.bF)(l,{to:"/signup"},{default:(0,n.k6)((()=>t[3]||(t[3]=[(0,n.eW)("Create an account")]))),_:1}),t[6]||(t[6]=(0,n.Lk)("p",null,"or",-1)),t[7]||(t[7]=(0,n.Lk)("p",null,"Please login",-1)),(0,n.Lk)("form",{onSubmit:t[2]||(t[2]=(0,s.D$)(((...e)=>i.login&&i.login(...e)),["prevent"]))},[(0,n.bo)((0,n.Lk)("input",{class:"input-field",type:"email",placeholder:"Email","onUpdate:modelValue":t[0]||(t[0]=e=>a.email=e),required:""},null,512),[[s.Jo,a.email]]),(0,n.bo)((0,n.Lk)("input",{class:"input-field",type:"password",placeholder:"Password","onUpdate:modelValue":t[1]||(t[1]=e=>a.password=e),required:""},null,512),[[s.Jo,a.password]]),t[4]||(t[4]=(0,n.Lk)("button",{class:"login-btn",type:"submit"},"Log in",-1))],32),t[8]||(t[8]=(0,n.Lk)("a",{href:"#"},"Forget password",-1))])])}var ie={name:"LoginView",data(){return{email:"",password:""}},methods:{login(){console.log("Logging in with",this.email,this.password),this.$router.push("/")}}};const le=(0,d.A)(ie,[["render",ae]]);var ce=le;const ue={class:"container"},pe={class:"signup-box"},de={key:0,class:"error-message"};function he(e,t,o,r,a,i){const l=(0,n.g2)("router-link");return(0,n.uX)(),(0,n.CE)("div",ue,[(0,n.Lk)("div",pe,[t[5]||(t[5]=(0,n.Lk)("h2",null,"Create an Account",-1)),(0,n.Lk)("form",{onSubmit:t[2]||(t[2]=(0,s.D$)(((...e)=>i.validateSignup&&i.validateSignup(...e)),["prevent"]))},[(0,n.bo)((0,n.Lk)("input",{class:"input-field",type:"email",placeholder:"Email","onUpdate:modelValue":t[0]||(t[0]=e=>a.email=e),required:""},null,512),[[s.Jo,a.email]]),(0,n.bo)((0,n.Lk)("input",{class:"input-field",type:"password",placeholder:"Password","onUpdate:modelValue":t[1]||(t[1]=e=>a.password=e),required:""},null,512),[[s.Jo,a.password]]),a.errorMessage?((0,n.uX)(),(0,n.CE)("p",de,(0,x.v_)(a.errorMessage),1)):(0,n.Q3)("",!0),t[3]||(t[3]=(0,n.Lk)("button",{class:"signup-btn",type:"submit"},"Sign Up",-1))],32),(0,n.bF)(l,{to:"/login"},{default:(0,n.k6)((()=>t[4]||(t[4]=[(0,n.eW)("Already have an account? Log in")]))),_:1})])])}var fe={name:"SignUp",data(){return{email:"",password:"",errorMessage:""}},methods:{validateSignup(){console.log("Sign up submitted"),this.errorMessage="";const e=[];(this.password.length<8||this.password.length>=15)&&e.push("Password must be 8-14 characters long."),/[A-Z]/.test(this.password)||e.push("Password must include at least one uppercase character."),/[a-z].*[a-z]/.test(this.password)||e.push("Password must include at least two lowercase characters."),/[0-9]/.test(this.password)||e.push("Password must include at least one numeric value."),/^([A-Z])/.test(this.password)||e.push("Password must start with an uppercase character."),/_/.test(this.password)||e.push("Password must include the character '_'."),e.length>0?this.errorMessage=`The password is not valid - ${e.join(" ")}`:(console.log("Signing up with",this.email,this.password),this.$router.push("/"))}}};const me=(0,d.A)(fe,[["render",he]]);var ke=me;const ge=[{path:"/",name:"Home",component:K},{path:"/addPost",name:"AddPost",component:se},{path:"/login",name:"Login",component:ce},{path:"/signup",name:"SignUp",component:ke}],ve=(0,O.aE)({history:(0,O.LA)(),routes:ge});var be=ve,Le=(o(8992),o(2577),o(3949),o(782)),we=(0,Le.y$)({state:{posts:[]},mutations:{setPosts(e,t){e.posts=t},incrementLike(e,t){const o=e.posts.find((e=>e.id===t));o&&(o.likes+=1)},resetLikes(e){e.posts.forEach((e=>e.likes=0))}},actions:{fetchPosts({commit:e}){const t="/WebApp/json.json";fetch(t).then((e=>{if(!e.ok)throw new Error("Network response was not ok");return e.json()})).then((t=>{e("setPosts",t)})).catch((e=>{console.error("Error fetching posts:",e)}))},incrementLike({commit:e},t){e("incrementLike",t)},resetLikes({commit:e}){e("resetLikes")}},getters:{allPosts(e){return e.posts}}});const Pe=(0,s.Ef)(j);Pe.use(be),Pe.use(we),Pe.mount("#app")}},t={};function o(s){var n=t[s];if(void 0!==n)return n.exports;var r=t[s]={exports:{}};return e[s].call(r.exports,r,r.exports,o),r.exports}o.m=e,function(){var e=[];o.O=function(t,s,n,r){if(!s){var a=1/0;for(u=0;u<e.length;u++){s=e[u][0],n=e[u][1],r=e[u][2];for(var i=!0,l=0;l<s.length;l++)(!1&r||a>=r)&&Object.keys(o.O).every((function(e){return o.O[e](s[l])}))?s.splice(l--,1):(i=!1,r<a&&(a=r));if(i){e.splice(u--,1);var c=n();void 0!==c&&(t=c)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[s,n,r]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var s in t)o.o(t,s)&&!o.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.p="/WebApp/"}(),function(){var e={524:0};o.O.j=function(t){return 0===e[t]};var t=function(t,s){var n,r,a=s[0],i=s[1],l=s[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(n in i)o.o(i,n)&&(o.m[n]=i[n]);if(l)var u=l(o)}for(t&&t(s);c<a.length;c++)r=a[c],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(u)},s=self["webpackChunkwebapp"]=self["webpackChunkwebapp"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=o.O(void 0,[504],(function(){return o(2462)}));s=o.O(s)})();
//# sourceMappingURL=app.c0f36f12.js.map