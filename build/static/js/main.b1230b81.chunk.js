(this.webpackJsonphokm1=this.webpackJsonphokm1||[]).push([[0],{4:function(e,n,t){e.exports=t.p+"static/media/backside.83256767.png"},44:function(e,n,t){e.exports=t(88)},54:function(e,n,t){},83:function(e,n){},86:function(e,n,t){var a={"./10del.png":[89,3],"./10khaj.png":[90,4],"./10khesht.png":[91,5],"./10pik.png":[92,6],"./11del.png":[93,7],"./11khaj.png":[94,8],"./11khesht.png":[95,9],"./11pik.png":[96,10],"./12del.png":[97,11],"./12khaj.png":[98,12],"./12khesht.png":[99,13],"./12pik.png":[100,14],"./13del.png":[101,15],"./13khaj.png":[102,16],"./13khesht.png":[103,17],"./13pik.png":[104,18],"./1del.png":[105,19],"./1khaj.png":[106,20],"./1khesht.png":[107,21],"./1pik.png":[108,22],"./2del.png":[109,23],"./2khaj.png":[110,24],"./2khesht.png":[111,25],"./2pik.png":[112,26],"./3del.png":[113,27],"./3khaj.png":[114,28],"./3khesht.png":[115,29],"./3pik.png":[116,30],"./4del.png":[117,31],"./4khaj.png":[118,32],"./4khesht.png":[119,33],"./4pik.png":[120,34],"./5del.png":[121,35],"./5khaj.png":[122,36],"./5khesht.png":[123,37],"./5pik.png":[124,38],"./6del.png":[125,39],"./6khaj.png":[126,40],"./6khesht.png":[127,41],"./6pik.png":[128,42],"./7del.png":[129,43],"./7khaj.png":[130,44],"./7khesht.png":[131,45],"./7pik.png":[132,46],"./8del.png":[133,47],"./8khaj.png":[134,48],"./8khesht.png":[135,49],"./8pik.png":[136,50],"./9del.png":[137,51],"./9khaj.png":[138,52],"./9khesht.png":[139,53],"./9pik.png":[140,54],"./backside.png":[4],"./del.png":[141,55],"./khaj.png":[142,56],"./khesht.png":[143,57],"./pik.png":[144,58]};function r(e){if(!t.o(a,e))return Promise.resolve().then((function(){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}));var n=a[e],r=n[0];return Promise.all(n.slice(1).map(t.e)).then((function(){return t.t(r,7)}))}r.keys=function(){return Object.keys(a)},r.id=86,e.exports=r},87:function(e,n,t){},88:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(7),u=t.n(c),o=t(2),l=t(6),i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"ADD_GAME":return n.game;case"REMOVE_GAME":return null;default:return e}},m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"ADD_NAME":return n.name;default:return e}},s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"ADD_TEAMS":return n.teams;case"SET_WINNER":var t=e.map((function(e){return e.players.includes(n.name)?Object.assign({},e,{won_bazi:e.won_bazi+1}):e}));return t;default:return e}},f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"SET_HOKM":return n.name;default:return e}},p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"SET_HAKEM":return n.name;default:return e}},g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"SORT_PLAYERS":return[n.teams[0].players[0],n.teams[1].players[0],n.teams[0].players[1],n.teams[1].players[1]];default:return e}},h=function(e){return function(n){return function(t){console.log("dispatching",t);var a=n(t);return console.log("next state",e.getState()),a}}},d=Object(l.c)({game:i,name:m,teams:s,hokm:f,hakem:p,players:g});t(54);var E=t(1);var v=function(e,n){var t=Object(o.b)(),a=Object(o.c)((function(n){return n[e]})),r=localStorage.getItem(e);return r&&a!==r&&t(n(r)),[a=Object(o.c)((function(n){return n[e]})),function(a){localStorage.setItem(e,a),t(n(a))}]};var b=function(e){return{type:"ADD_NAME",name:e}},j=t(43),O=t.n(j)()("http://localhost:3000"),k=function(){var e=Object(a.useState)(),n=Object(E.a)(e,2),t=n[0],c=n[1];return r.a.createElement("form",{onSubmit:function(e){O.emit("create-room",t),e.preventDefault()}},r.a.createElement("input",{className:"roomInput",name:"roomInput",onChange:function(e){return c(e.currentTarget.value)}}),r.a.createElement("input",{type:"submit",value:"\u0627\u0641\u0632\u0648\u062f\u0646 \u0627\u062a\u0627\u0642 \u062c\u062f\u06cc\u062f"}))},y=t(3);var N=function(e){return{type:"ADD_GAME",game:e}},S=function(e){var n=e.room,t=Object(o.b)();return r.a.createElement("li",{onClick:function(){t(N(n))}},r.a.createElement("div",{className:"roomname"},n))},w=function(){var e=Object(a.useState)([]),n=Object(E.a)(e,2),t=n[0],c=n[1];return Object(a.useEffect)((function(){O.emit("reqListOfGames"),O.on("new-game",(function(e){c((function(n){return[].concat(Object(y.a)(n),[e])}))})),O.on("listOfGames",(function(e){c(e),console.log(e)}))}),[]),t.length?r.a.createElement("div",{className:"rooms"},r.a.createElement("ul",null,t.map((function(e,n){return r.a.createElement(S,{room:e,key:n})})))):r.a.createElement("div",{className:"empty"},"\u0627\u062a\u0627\u0642\u06cc \u0628\u0631\u0627\u06cc \u0628\u0627\u0632\u06cc \u0648\u062c\u0648\u062f \u0646\u062f\u0627\u0631\u062f . \u0627\u0628\u062a\u062f\u0627 \u062f\u0631 \u0642\u0633\u0645\u062a \u067e\u0627\u06cc\u06cc\u0646 \u06cc\u06a9 \u0627\u062a\u0627\u0642 \u0628\u0647 \u0648\u062c\u0648\u062f \u0622\u0648\u0631\u06cc\u062f.")},_=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(w,null),r.a.createElement(k,null))};var A=function(e,n,r){var c=Object(a.useState)(r),u=Object(E.a)(c,2),o=u[0],l=u[1],i=new Image;return i.onload=function(){l(i.src)},t(86)("./".concat(e,".").concat(n)).then((function(e){i.src=e.default})),o},D=t(4),M=t.n(D),T=Object(a.memo)((function(e){var n=e.card,t=n[0]+n[1],a=A(t,"png",M.a);return r.a.createElement("img",{height:"100",draggable:"false",className:"img-card",src:a,alt:"card"})})),x=function(e,n,t){var a=t.indexOf(n),r=t.indexOf(e);return a===r?"me":(a+r)%2===0?"teamate":a<r?r-a===1?"second":"first":r-a===-1?"first":"second"};var I=function(e){var n=Object(o.c)((function(e){return e.name})),t=Object(o.c)((function(e){return e.players}));return x(e,n,t)},R=function(e){var n=e.card,t=e.name,a=I(t);return r.a.createElement("li",{className:"Card ".concat(a)},r.a.createElement(T,{card:n}))},G=function(){var e=Object(a.useState)([]),n=Object(E.a)(e,2),t=n[0],c=n[1];return 4===t.length&&setTimeout((function(){c([])}),2e3),Object(a.useEffect)((function(){O.on("card-played",(function(e,n){c((function(t){return[].concat(Object(y.a)(t),[{card:e,name:n}])}))}))}),[]),r.a.createElement("div",null,r.a.createElement("ul",{className:"deck"},t.map((function(e,n){return r.a.createElement(R,{card:e.card,name:e.name,key:n})}))))};var z=function(e,n){var t=Object(o.c)((function(e){return e.game})),r=Object(o.c)((function(e){return e.name})),c=Object(a.useState)(0),u=Object(E.a)(c,2),l=u[0],i=u[1];return[l,function(a,c){c.lastY<-110&&(O.emit.apply(O,[e].concat(Object(y.a)(n),[r,t])),i(c.lastY))}]},C=t(14),H=t.n(C),K=Object(a.memo)((function(e){var n=e.card,t=z("sendcard",n),a=Object(E.a)(t,2),c=a[0],u=a[1];return console.log("render playable"),r.a.createElement(H.a,{axis:"y",position:{x:0,y:c},onStop:u},r.a.createElement("li",{className:"card"},r.a.createElement(T,{card:n})))}));var L=function(e,n){var t=e.sort((function(e,n){return n[0]-e[0]}));if(n){t=[],["del","khaj","khesht","pik"].forEach((function(n){var a,r=e.filter((function(e){return e[1]===n})).sort((function(e,n){return n[0]-e[0]}));(a=t).push.apply(a,Object(y.a)(r))}))}return t},P=function(){var e=Object(a.useState)([]),n=Object(E.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(!1),o=Object(E.a)(u,2),l=o[0],i=o[1],m=Object(a.useState)(!1),s=Object(E.a)(m,2),f=s[0],p=s[1];return Object(a.useEffect)((function(){O.on("cards",(function(e){c(e)})),O.on("your_turn",(function(e){p(e)})),O.on("hokm",(function(){c((function(e){return Object(y.a)(L(e,!0))})),i(!l)})),O.on("remove-card",(function(e){console.log(e),c((function(n){return n.filter((function(n){return n[0]!==e[0]||n[1]!==e[1]}))}))}))}),[]),t.length?r.a.createElement("div",null,r.a.createElement("ul",{className:"\n      cards \n      ".concat(l?"cards showall":"cards","\n      ").concat(f?"myturn":"notmyturn","\n      ")},t.map((function(e,n){return r.a.createElement(K,{card:e,key:JSON.stringify(e)})})))):r.a.createElement("div",{className:"empty"},"Shuffling")},W=function(e){var n=e.suit,t=A(n,"png",M.a);return r.a.createElement("img",{height:"50",draggable:"false",className:"suit",src:t,alt:"card"})},Y=function(){var e=Object(a.useState)(),n=Object(E.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(),l=Object(E.a)(u,2),i=(l[0],l[1]),m=Object(o.c)((function(e){return e.teams}));return Object(a.useEffect)((function(){O.on("taeen-hakem",(function(e){i(e)})),O.on("hokm",(function(e){c(e)}))}),[]),r.a.createElement("div",null,r.a.createElement("div",null,t?r.a.createElement(W,{suit:t}):"\u062d\u06a9\u0645 \u062a\u0639\u06cc\u06cc\u0646 \u0646\u0634\u062f\u0647"),r.a.createElement("ul",{className:"winnings"},m.map((function(e,n){return r.a.createElement("li",null,r.a.createElement("ul",null,r.a.createElement("li",null,e.won_bazi,0===n?":":null),r.a.createElement("li",null,e.won_dast,0===n?":":null)))}))))},F=function(e){var n=e.key;return r.a.createElement("li",{key:n,className:"playerCard"},r.a.createElement("img",{className:"img-palyercard",src:M.a,alt:"playercard"}))},J=Object(a.memo)((function(e){var n=e.name,t=I(n),c=Object(a.useState)(!1),u=Object(E.a)(c,2),o=u[0],l=u[1],i=Object(a.useState)(!1),m=Object(E.a)(i,2),s=m[0],f=m[1];return Object(a.useEffect)((function(){O.on("cards",(function(){l(!o)})),O.on("hokm",(function(){f(!s)}))}),[]),r.a.createElement("div",{className:t},r.a.createElement("div",{className:"playername"},n),r.a.createElement("ul",{className:s?"playercards showall":"playercards"},o?Object(y.a)(Array(13)).map((function(e,n){return r.a.createElement(F,{key:n})})):""))})),B=function(){var e=Object(o.c)((function(e){return e.teams})),n=Object(o.c)((function(e){return e.name}));return r.a.createElement("div",null,r.a.createElement("ul",{className:"players"},e.map((function(e){return e.players.map((function(e){return e!==n?r.a.createElement(J,{name:e}):null}))}))))},U=function(e){var n=e.suit,t=z("hokm",[n]),a=Object(E.a)(t,2),c=a[0],u=a[1];return r.a.createElement(H.a,{axis:"y",position:{x:0,y:c},onStop:u},r.a.createElement("li",null,r.a.createElement(W,{suit:n})))},V=function(e){return e.suits.map((function(e){return r.a.createElement(U,{suit:e})}))},q=function(){var e=Object(o.c)((function(e){return e.hakem})),n=Object(o.c)((function(e){return e.hokm})),t=Object(o.c)((function(e){return e.name}));return r.a.createElement("ul",{className:"suits"},e!==t||n?null:r.a.createElement(V,{suits:["del","khaj","khesht","pik"]}),n||e===t?null:"\u0645\u0646\u062a\u0638\u0631 \u062d\u06a9\u0645 \u0628\u0645\u0627\u0646\u06cc\u062f")},$=function(e){var n=e.gameName,t=e.name,a=Object(o.b)();return O.emit("join-game",n,t),O.on("err",(function(e){"Game is full"===e&&a({type:"REMOVE_GAME"})})),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"gameInfo"},r.a.createElement("div",null,n,": \u0646\u0627\u0645 \u0627\u062a\u0627\u0642 "),r.a.createElement(Y,null)),r.a.createElement(q,null),r.a.createElement(B,null),r.a.createElement(G,null),r.a.createElement(P,null))};var Q=function(e){return{type:"ADD_TEAMS",teams:e}};var X=function(e){return{type:"SET_HOKM",name:e}};var Z=function(e){return{type:"SET_HAKEM",name:e}};var ee=function(e){return{type:"SORT_PLAYERS",teams:e}},ne=function(){var e=Object(o.b)();Object(a.useEffect)((function(){O.on("teams",(function(n){e(Q(n)),e(ee(n))})),O.on("winner-bazi",(function(n){e(function(e){return{type:"SET_WINNER",name:e}}(n))})),O.on("hokm",(function(n){e(X(n))})),O.on("taeen-hakem",(function(n){e(Z(n))}))}),[])};var te=function(e,n){var t=Object(a.useState)(e),r=Object(E.a)(t,2),c=r[0],u=r[1];return[c,function(e){u((function(n){return[].concat(Object(y.a)(n),[e])})),setTimeout((function(){return u((function(e){var n=Object(y.a)(e);return n.shift(),n}))}),n)}]},ae=function(){var e=te([],5e3),n=Object(E.a)(e,2),t=n[0],c=n[1];return Object(a.useEffect)((function(){O.on("err",(function(e){c(["\u062e\u0637\u0627",e])}))}),[]),r.a.createElement("div",null,r.a.createElement("ul",{className:"errors"},t.map((function(e){return r.a.createElement("li",{className:"event"},e[1]+e[0])}))))},re=function(){var e=te([],5e3),n=Object(E.a)(e,2),t=n[0],c=n[1];return Object(a.useEffect)((function(){O.on("new-user",(function(e){c(["\u0648\u0627\u0631\u062f \u0628\u0627\u0632\u06cc \u0634\u062f",e])})),O.on("taeen-hakem",(function(e){c(["\u062d\u0627\u06a9\u0645 \u0634\u062f",e])})),O.on("hokm",(function(e){c(["\u062d\u06a9\u0645\u0647",e])})),O.on("winner-bazi",(function(e){c(["\u0628\u0631\u0646\u062f\u0647 \u0634\u062f",e])})),O.on("prev-players",(function(e){c(["\u062f\u0631 \u0628\u0627\u0632\u06cc \u062d\u0636\u0648\u0631 \u062f\u0627\u0631\u062f",e],1e4)})),O.on("new-user",(function(e){c(["\u0648\u0627\u0631\u062f \u0628\u0627\u0632\u06cc \u0634\u062f",e],1e4)}))}),[]),r.a.createElement("div",null,r.a.createElement("ul",{className:"events"},t.map((function(e){return r.a.createElement("li",{className:"event"},e[1]+e[0])}))))};t(87);(function(e){for(var n=0,t=e.length;n<t;n+=1)(new Image).src=e[n]})([M.a]);var ce=function(){var e=v("name",b),n=Object(E.a)(e,2),t=n[0],c=n[1],u=Object(o.c)((function(e){return e.game}));return ne(),Object(a.useEffect)((function(){var e=t||prompt("\u0644\u0637\u0641\u0627 \u0646\u0627\u0645 \u062e\u0648\u062f \u0631\u0627 \u0648\u0627\u0631\u062f \u06a9\u0646\u06cc\u062f");!function n(){O.emit("sendName",e,(function(t,a){if("ok"===a)return c(e);"name taken"===t&&(e=prompt("\u0627\u06cc\u0646 \u0646\u0627\u0645 \u0648\u062c\u0648\u062f \u062f\u0627\u0631\u062f \u0644\u0637\u0641\u0627 \u0646\u0627\u0645 \u062f\u06cc\u06af\u0631\u06cc \u0648\u0627\u0631\u062f \u06a9\u0646\u06cc\u062f"),n())}))}()}),[]),r.a.createElement("div",{className:"App"},r.a.createElement(ae,null),r.a.createElement(re,null),u?r.a.createElement($,{gameName:u,name:t}):r.a.createElement(_,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ue=function(){var e=[h];return Object(l.d)(d,l.a.apply(void 0,e))}();u.a.render(r.a.createElement(o.a,{store:ue},r.a.createElement(ce,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[44,1,2]]]);
//# sourceMappingURL=main.b1230b81.chunk.js.map