(this.webpackJsonpbike_checker=this.webpackJsonpbike_checker||[]).push([[0],{17:function(e,t,n){e.exports=n(45)},22:function(e,t,n){},23:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var a,r=n(0),c=n.n(r),l=n(15),u=n.n(l),s=(n(22),n(3)),o=(n(23),n(1)),i=n.n(o),E=n(4),m={BIKE_API_URI:"./api",LOGIN_API_URI:"https://safe-retreat-57854.herokuapp.com"},b=n(5),p=n.n(b),f=function(){return{headers:{Authorization:a}}},d=function(e){a=e?"bearer ".concat(e):null},I="".concat(m.BIKE_API_URI,"/v1/bikeData"),S=0,v={getBikeData:function(){var e=Object(E.a)(i.a.mark((function e(){var t,n,a,r,c,l;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=(new Date).valueOf(),6e4,!(S>t-6e4)){e.next=4;break}return e.abrupt("return",null);case 4:return e.prev=4,n=f(),e.next=8,p.a.get(I,n);case 8:if(200===(a=e.sent).status&&a.data&&a.data.bikeData){e.next=12;break}return console.log("BIKEDATA: FETCH FAILED",a.status),e.abrupt("return",null);case 12:return r=a.data.bikeData,c=r.lastFetchTime,l=r.stations,S=c,e.abrupt("return",{lastFetchTime:c,stations:l});case 17:return e.prev=17,e.t0=e.catch(4),e.t0.response?console.log("BIKEDATA: FETCH FAILED",e.t0.response.statusText):console.log("BIKEDATA: FETCH FAILED",e.t0.status),e.abrupt("return",null);case 21:case"end":return e.stop()}}),e,null,[[4,17]])})));return function(){return e.apply(this,arguments)}}(),resetLastFetchTime:function(){return S=0}},O=n(16),A=(n(42),function(e){var t=e.station,n=e.selectCenter,a=e.isCenter,r=t.name,l=t.bikesAvailable,u=l+t.spacesAvailable,s="".concat(l," / ").concat(u),o=a?"station-list-item center":"station-list-item",i="bad";return l>3?i="good":l>0&&(i="neutral"),c.a.createElement("tr",{className:o,onDoubleClick:function(){return n(t)}},c.a.createElement("td",null,r),c.a.createElement("td",null,s),c.a.createElement("td",null,c.a.createElement("div",{className:"status-marker ".concat(i)})))}),h=function(e){var t=e.centerId,n=e.setCenter,a=e.stations,l=e.lastFetchTime,u=Object(r.useState)(""),o=Object(s.a)(u,2),i=o[0],E=o[1];if(0===a.length)return c.a.createElement("div",null,c.a.createElement("br",null),"FETCHING DATA - WAIT A MOMENT");var m=function(e){var t=Object(O.a)({lastFetchTime:l},e);window.localStorage.setItem("centerStation",JSON.stringify(t)),n(t)},b=i.toLowerCase(),p=a.filter((function(e){return e.name.toLowerCase().includes(b)})).map((function(e){return c.a.createElement(A,{key:e.stationId,station:e,selectCenter:m,isCenter:e.stationId===t})}));return c.a.createElement("div",null,c.a.createElement("br",null),"FILTER STATIONS: ",c.a.createElement("input",{onChange:function(e){return E(e.target.value)},list:"nameData",value:i,type:"search"}),c.a.createElement("br",null),"Double Click to select",c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement("table",{id:"station-list-table"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",null,"NAME"),c.a.createElement("th",null,"BIKES/SPACE"))),c.a.createElement("tbody",null,p)),c.a.createElement("datalist",{id:"nameData"},a.map((function(e){return c.a.createElement("option",{key:e.stationId,value:e.name})}))))},g=(n(43),function(){var e=Object(E.a)(i.a.mark((function e(t){var n,a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.getBikeData();case 2:if((n=e.sent)&&0!==n.lastFetchTime&&0!==n.stations.length){e.next=5;break}return e.abrupt("return");case 5:a=n.lastFetchTime,r=n.stations,t({lastFetchTime:a,stations:r});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),N=function(e){var t=e.center,n=t.name,a=t.bikesAvailable,r=a+t.spacesAvailable,l="".concat(a," / ").concat(r),u="bad";return a>3?u="good":a>0&&(u="neutral"),c.a.createElement("table",{id:"center-table",className:u},c.a.createElement("thead",null,c.a.createElement("tr",{key:1},c.a.createElement("th",null,"NAME"),c.a.createElement("th",null,"BIKES/SPACE"))),c.a.createElement("tbody",null,c.a.createElement("tr",null,c.a.createElement("td",null,n),c.a.createElement("td",null,l))))},T=function(){var e=Object(r.useState)({lastFetchTime:0,stations:[]}),t=Object(s.a)(e,2),n=t[0],a=t[1],l=Object(r.useState)((function(){return function(){var e={name:"NO CENTER SELECTED",bikesAvailable:0,spacesAvailable:0,stationId:null};try{var t=window.localStorage.getItem("centerStation");return t?JSON.parse(t):e}catch(n){return e}}()})),u=Object(s.a)(l,2),o=u[0],i=u[1],E=Object(r.useState)(!o.stationId),m=Object(s.a)(E,2),b=m[0],p=m[1],f=n.lastFetchTime,d=n.stations;Object(r.useEffect)((function(){g(a);var e=setInterval((function(){g(a)}),1e4);return function(){v.resetLastFetchTime(),clearTimeout(e)}}),[]);var I=d.find((function(e){return e.stationId===o.stationId}))||o,S=new Date(f||o.lastFetchTime).toLocaleString(),O=b?"HIDE LIST":"CHANGE STATION";return c.a.createElement("div",{id:"station-screen"},c.a.createElement("div",{id:"center-screen"},c.a.createElement("h2",null,"YOUR STATION"),c.a.createElement(N,{center:I}),c.a.createElement("br",null),S),c.a.createElement("br",null),c.a.createElement("button",{onClick:function(){return p((function(e){return!e}))}},O),c.a.createElement("br",null),b&&c.a.createElement(h,{centerId:o.stationId,setCenter:i,stations:d,lastFetchTime:f}))},k="".concat(m.LOGIN_API_URI,"/api/users"),w="".concat(m.LOGIN_API_URI,"/api/login"),D={login:function(){var e=Object(E.a)(i.a.mark((function e(t,n){var a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.a.post(w,{username:t,password:n});case 3:if(201===(a=e.sent).status&&a.data){e.next=7;break}return console.log("LOGIN: FAILED",a.status),e.abrupt("return",!1);case 7:return console.log("LOGIN DONE"),(r=a.data.token)&&d(r),""!==a.data.token&&window.localStorage.setItem("userToken",a.data.token),e.abrupt("return",!0);case 14:return e.prev=14,e.t0=e.catch(0),console.error("LOGIN: FAILED",e.t0.status),e.abrupt("return",!1);case 18:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(t,n){return e.apply(this,arguments)}}(),createUser:function(){var e=Object(E.a)(i.a.mark((function e(t,n){var a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t&&n){e.next=2;break}return e.abrupt("return",{bCreated:!1,message:"MISSING USERNAME OR PASSWORD"});case 2:return e.prev=2,e.next=5,p.a.post(k,{username:t,password:n});case 5:if(201===(a=e.sent).status&&a.data){e.next=9;break}return console.log("LOGIN: FAILED",a.status),e.abrupt("return",{bCreated:!1,message:"USERNAME IN USE EXISTS"});case 9:return console.log("CREATED USER AND LOGGED IN DONE"),(r=a.data.token)&&d(r),""!==a.data.token&&window.localStorage.setItem("userToken",a.data.token),e.abrupt("return",{bCreated:!0,message:"USER CREATED"});case 16:return e.prev=16,e.t0=e.catch(2),console.error(e.t0),e.abrupt("return",{bCreated:!1,message:"USERNAME IN USE"});case 20:case"end":return e.stop()}}),e,null,[[2,16]])})));return function(t,n){return e.apply(this,arguments)}}()},R=(n(44),function(e){var t=e.setUser,n=Object(r.useState)(""),a=Object(s.a)(n,2),l=a[0],u=a[1],o=Object(r.useState)(""),m=Object(s.a)(o,2),b=m[0],p=m[1],f=Object(r.useState)(""),d=Object(s.a)(f,2),I=d[0],S=d[1],v=function(){var e=Object(E.a)(i.a.mark((function e(n){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),""!==l&&""!==b){e.next=6;break}return console.log("MISSIN USERNAME OR PASSWORD"),S("MISSIN USERNAME OR PASSWORD"),setTimeout((function(){S("")}),5e3),e.abrupt("return");case 6:return e.next=8,D.login(l,b);case 8:e.sent?(window.localStorage.setItem("storedUser",l),t(l)):(console.log("LOGIN FAILED"),S("INVALID USER INFORMATION"),setTimeout((function(){S("")}),5e3));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),O=function(){var e=Object(E.a)(i.a.mark((function e(n){var a,r,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),""!==l&&""!==b){e.next=6;break}return console.log("MISSIN USERNAME OR PASSWORD"),S("MISSIN USERNAME OR PASSWORD"),setTimeout((function(){S("")}),5e3),e.abrupt("return");case 6:return e.next=8,D.createUser(l,b);case 8:a=e.sent,r=a.bCreated,c=a.message,r?(window.localStorage.setItem("storedUser",l),t(l)):(console.log("LOGIN FAILED"),S(c),setTimeout((function(){S("")}),5e3));case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return c.a.createElement("div",{id:"login-screen"},c.a.createElement("form",{onSubmit:v},"USERNAME: ",c.a.createElement("input",{onChange:function(e){return u(e.target.value)},value:l,name:"username"}),c.a.createElement("br",null),"PASSWORD: ",c.a.createElement("input",{type:"password",onChange:function(e){return p(e.target.value)},name:"password",value:b}),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement("button",{type:"submit"},"LOGIN USER"),c.a.createElement("button",{type:"button",onClick:O},"CREATE USER"),c.a.createElement("br",null),c.a.createElement("br",null),I,c.a.createElement("br",null)))}),C=function(){var e=Object(r.useState)(function(){try{var e=window.localStorage.getItem("storedUser"),t=window.localStorage.getItem("userToken");return e&&t?(d(t),e):(window.localStorage.clear(),null)}catch(n){return null}}()),t=Object(s.a)(e,2),n=t[0],a=t[1],l=n?"USER: ".concat(n):"Login or Create New User";return c.a.createElement("div",{className:"App"},c.a.createElement("h1",null,"HSL CITYBIKE CHECKER"),c.a.createElement("h3",null,l),n?c.a.createElement(T,null):c.a.createElement(R,{setUser:a}),c.a.createElement("br",null),n&&c.a.createElement("button",{onClick:function(){window.localStorage.clear(),a(null)}},"LOGOUT"))};u.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(C,null)),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.5b8756c9.chunk.js.map