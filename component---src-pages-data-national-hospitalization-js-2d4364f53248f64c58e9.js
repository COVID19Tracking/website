(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{"+Jka":function(e,a,t){"use strict";t.r(a);var r=t("q1tI"),o=t.n(r),l=t("Wbzz"),n=t("Xjed"),c=t("AOlr"),i=t("I/Ru");a.default=function(e){var a=e.data;return o.a.createElement(i.a,{title:"National Data: Hospitalization",returnLinkTitle:"Our Data",returnLink:"/data",path:"/data/national/hospitalization",description:"Currently hospitalized, ICU, and ventilator numbers in the US for each day from January 2020 to the present.",returnLinks:[{link:"/data"},{link:"/data/national",title:"Totals for the US"}]},o.a.createElement(c.a,{definitions:a.allContentfulDataDefinition.nodes,order:["hospitalizedCurrently","inIcuCurrently","onVentilatorCurrently"]}),o.a.createElement("h2",null,"Hospitalization History"),o.a.createElement("p",null,"We have"," ",o.a.createElement(l.Link,{to:"/about-data/faq#why-have-you-stopped-reporting-national-cumulative-hospitalizations-icu-and-ventilation-numbers-on-your-website"},"removed cumulative hospitalization data for the US. Here's why"),"."),o.a.createElement(n.a,{labels:[{field:"date"},{field:"hospitalizedCurrently",isNumeric:!0},{field:"inIcuCurrently",isNumeric:!0},{field:"onVentilatorCurrently",isNumeric:!0}],data:a.allCovidUsDaily.nodes}))}},"3CiM":function(e,a,t){"use strict";t.d(a,"a",(function(){return c}));var r=t("q1tI"),o=t.n(r),l=t("Wbzz"),n={date:"Date",negativeIncrease:"Negative (increase)"},c=function(e){var a=e.field,t=Object(l.useStaticQuery)("939128774");return o.a.createElement(o.a.Fragment,null,function(e,a){var t=a.find((function(a){return a.fieldName===e}));return t?t.name:void 0!==n[e]?n[e]:null}(a,t.allContentfulDataDefinition.nodes))}},"4SwH":function(e,a,t){"use strict";t.d(a,"a",(function(){return f})),t.d(a,"b",(function(){return s})),t.d(a,"c",(function(){return b}));var r=t("q1tI"),o=t.n(r),l=t("evZC"),n=t("iUFP");function c(e,a){if(null==e)return{};var t,r,o={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],a.indexOf(t)>=0||(o[t]=e[t]);return o}var i,u=Object(l.b)("DisclosureContext",{}),d=function(){return Object(r.useContext)(u)};!function(e){e.Open="open",e.Collapsed="collapsed"}(i||(i={}));var f=function(e){var a=e.children,t=e.defaultOpen,i=void 0!==t&&t,d=e.onChange,f=e.open,s=c(e,["children","defaultOpen","onChange","open"]),b=null!=f,m=Object(r.useRef)(b).current,p=Object(n.a)(null!=s.id?String(s.id):void 0)||"disclosure",v=Object(l.h)("panel",p),y=Object(r.useState)(m?f:i),h=y[0],S=y[1];var w={disclosureId:p,onSelect:function(){d&&d(),m||S(!h)},open:h,panelId:v};return m&&f!==h&&S(f),o.a.createElement(u.Provider,{value:w},a)};var s=Object(l.c)((function(e,a){var t=e.as,n=void 0===t?"button":t,u=e.children,f=e.onClick,s=(e.onMouseDown,e.onPointerDown,c(e,["as","children","onClick","onMouseDown","onPointerDown"])),b=d(),m=b.onSelect,p=b.open,v=b.panelId,y=Object(r.useRef)(null),h=Object(l.j)(a,y);return o.a.createElement(n,Object.assign({"aria-controls":v,"aria-expanded":p},s,{"data-reach-disclosure-button":"","data-state":p?i.Open:i.Collapsed,ref:h,onClick:Object(l.m)(f,(function(e){e.preventDefault(),y.current&&y.current.focus(),m()}))}),u)}));var b=Object(r.forwardRef)((function(e,a){var t=e.children,r=c(e,["children"]),l=d(),n=l.panelId,u=l.open;return o.a.createElement("div",Object.assign({ref:a,hidden:!u},r,{"data-reach-disclosure-panel":"","data-state":u?i.Open:i.Collapsed,id:n,tabIndex:-1}),t)}))},"779a":function(e,a,t){"use strict";t.d(a,"a",(function(){return c})),t.d(a,"d",(function(){return i})),t.d(a,"e",(function(){return n})),t.d(a,"b",(function(){return d})),t.d(a,"c",(function(){return f}));t("E9XD");var r=t("q1tI"),o=t.n(r),l=t("ExVU");function n(e,a){return void 0===a&&(a="ccc LLL d yyyy h:mm a"),void 0===e?null:l.DateTime.fromISO(e).setZone("America/New_York").toFormat(a).replace("AM","am").replace("PM","pm")}var c=function(e){var a=e.date,t=e.format,r=void 0===t?"ccc LLL d yyyy h:mm a":t,c=e.timezone,i=void 0===c||c;return o.a.createElement(o.a.Fragment,null,i?n(a,r):l.DateTime.fromISO(a).toFormat(r))},i=function(e){var a,t=e.number,r=e.nullValue,l=void 0!==r&&r,n=e.precision,c=void 0===n?0:n,i=l||"N/A";if(0===c)a=t;else{var u=Math.pow(10,c);a=Math.round(parseFloat(t)*u)/u}return o.a.createElement(o.a.Fragment,null,null!==a?a.toLocaleString():i)},u=function(e,a,t){void 0===t&&(t=!0);var r=t?"&":"and";return 0===e&&2===a?" "+r+" ":e===a-2?", "+r+" ":e===a-1?"":", "},d=function(e){var a=e.items,t=e.keys,l=e.useAmpersand,n=void 0===l||l,c=a.length;return o.a.createElement(o.a.Fragment,null,a.map((function(e,a){var l=u(a,c,n);return o.a.createElement(r.Fragment,{key:t[a]},e,""===l?void 0:l)})))},f=function(e){var a=e.items,t=e.keys,l=a.length;return o.a.createElement(o.a.Fragment,null,a.map((function(e,a){var n=function(e,a){return 0===e&&2===a?" or ":e===a-2?", or ":e===a-1?"":", "}(a,l);return o.a.createElement(r.Fragment,{key:t[a]},e,""===n?void 0:n)})))}},AOlr:function(e,a,t){"use strict";var r=t("q1tI"),o=t.n(r),l=t("4SwH"),n=t("fy0c"),c=t.n(n);a.a=function(e){var a=e.definitions,t=e.order,r=[];return t.forEach((function(e){r.push(a.find((function(a){return a.fieldName===e})))})),o.a.createElement(o.a.Fragment,null,o.a.createElement("h2",null,"Definitions"),r.map((function(e){return o.a.createElement(l.a,{key:e.name},o.a.createElement(l.b,{type:"button",className:c.a.definitionButton},e.name," ",o.a.createElement("span",{className:c.a.arrowDown,"aria-hidden":!0},"↓")," ",o.a.createElement("span",{className:c.a.arrowUp,"aria-hidden":!0},"↑")),o.a.createElement(l.c,null,o.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.childContentfulDataDefinitionDefinitionTextNode.childMarkdownRemark.html}})))})))}},"I/Ru":function(e,a,t){"use strict";var r=t("q1tI"),o=t.n(r),l=t("Wbzz"),n=t("JI7f"),c=t("F5At"),i=t("cmL/"),u=t("SJqI"),d=t("aTGQ"),f=t("+Bwl");t("fmqH");a.a=function(e){var a=e.title,t=e.displayTitle,r=e.titleLink,s=e.path,b=e.returnLinks,m=e.returnLinksContent,p=e.description,v=e.children,y=e.noMargin,h=e.hasHero,S=e.centered,w=e.socialCard,E=e.hero,P=e.centerTitle,H=e.hidewarning,g=void 0!==H&&H,x=e.flipColors,L=void 0!==x&&x,k=e.noContainer,C=void 0!==k&&k,N=e.forceSubNavigationKey,q=void 0!==N&&N,T=Object(l.useStaticQuery)("3649515864");return o.a.createElement(o.a.Fragment,null,o.a.createElement(u.a,{title:a,description:p,socialCard:w}),o.a.createElement(f.a,null),o.a.createElement(c.a,{siteTitle:T.site.siteMetadata.title,title:t||a,titleLink:r,path:s,noMargin:y,hasHero:h,returnLinks:b,returnLinksContent:m,hero:E,centerTitle:P,forceSubNavigationKey:q,flipColors:L,hidewarning:g}),o.a.createElement("main",{id:"main"},o.a.createElement(n.a,null),C?o.a.createElement(o.a.Fragment,null,v):o.a.createElement(d.a,{centered:S},v)),o.a.createElement(i.a,{flipColors:L}))}},Xjed:function(e,a,t){"use strict";var r=t("q1tI"),o=t.n(r),l=t("TSYQ"),n=t.n(l),c=t("4SwH"),i=t("3CiM"),u=t("779a"),d=t("cryO"),f=t.n(d),s=t("eMu6"),b=t.n(s),m=function(e){var a=e.labels,t=e.row;return o.a.createElement("tr",null,a.map((function(e){var a=e.field,r=e.label,l=e.format,c=e.isNumeric,d=e.noWrap,s=e.alignLeft,m=e.style;return o.a.createElement("td",{className:n()(d&&b.a.noWrap,s&&f.a.alignLeft,m)},o.a.createElement("span",{className:b.a.cellLabel,"aria-hidden":!0},r||o.a.createElement(i.a,{field:a})),o.a.createElement("span",{className:b.a.value},c?o.a.createElement(u.d,{number:t[a]}):o.a.createElement(o.a.Fragment,null,l?l(t[a]):t[a]||"N/A")))})))};a.a=function(e){var a=e.labels,t=e.data,r=e.header,l=e.mobileShowNRows,u=void 0===l?t.length:l;return o.a.createElement("table",{className:n()(f.a.table,b.a.table)},r&&o.a.createElement("thead",{className:b.a.customHeader},r),o.a.createElement("thead",null,o.a.createElement("tr",null,a.map((function(e){var a=e.label,t=e.field,r=e.alignLeft,l=e.headerStyle;return o.a.createElement("th",{scope:"col",className:n()(r&&f.a.alignLeft,l)},a||o.a.createElement(i.a,{field:t}))})))),o.a.createElement("tbody",null,o.a.createElement(o.a.Fragment,null,t.slice(0,u).map((function(e){return o.a.createElement(m,{labels:a,row:e})})),u!==t.length&&o.a.createElement(c.a,null,o.a.createElement("tr",{className:b.a.disclosureButton},o.a.createElement("td",{colSpan:a.length},o.a.createElement(c.b,null,o.a.createElement("span",{className:b.a.closed},"Show"),o.a.createElement("span",{className:b.a.expanded},"Hide")," ","all rows"))),o.a.createElement(c.c,{className:b.a.disclosurePanel},t.slice(u,t.length).map((function(e){return o.a.createElement(m,{labels:a,row:e})})))))))}},cryO:function(e,a,t){e.exports={viewportSm:"480px",viewportMs:"640px",viewportMd:"768px",viewportLg:"1080px",viewportXl:"1200px",text:"#303030",link:"#000",linkActive:"#8b8dc7",colorPlum100:"#f2f2ff",colorPlum200:"#d1d1e8",colorPlum300:"#b6b7db",colorPlum400:"#8b8dc7",colorPlum500:"#6164ba",colorPlum600:"#575aad",colorPlum700:"#31347a",colorPlum800:"#111354",colorHoney100:"#fcf9eb",colorHoney200:"#fbe8a9",colorHoney300:"#f6ce7a",colorHoney400:"#ffad4a",colorHoney500:"#e2894e",colorHoney600:"#c66b3e",colorHoney700:"#924f34",colorHoney800:"#6e2f1f",colorBlueberry100:"#e2f1fc",colorBlueberry200:"#8cc7f4",colorBlueberry300:"#0091ea",colorBlueberry400:"#004399",colorBlueberry500:"#012656",colorSlate100:"#edf1f2",colorSlate200:"#d2d6d7",colorSlate300:"#b7bcbd",colorSlate400:"#9ca1a2",colorSlate500:"#828688",colorSlate600:"#676b6d",colorSlate700:"#4c5153",colorSlate800:"#313638",colorStrawberry100:"#fbbcb2",colorStrawberry200:"#dc472e",qualitativeColorPalette100:"#b5e3db",qualiTativecolorPalette200:"#cc0",qualiTativecolorPalette300:"#a19bca",qualiTativecolorPalette400:"#f4a071",qualiTativecolorPalette500:"#2f6488",qualiTativecolorPalette600:"#527740",crdtAsian:"#E35942",crdtWhite:"#cc0",crdtBlack:"#a19bca",crdtLatinx:"#f4a071",crdtNonHispanic:"#111354",crdtNhpi:"#2f6488",crdtAian:"#527740",alignLeft:"_972ec",borderLeft:"_4c21d",headerLabel:"_48594",headerLabel3:"_87c8d",headerLabel4:"_8bd24",headerLabel5:"_1ee0f",headerLabelHidden:"a0e2a",table:"e1fd0",sort:"_903bc",sortButton:"c8fff",wide:"_588d8"}},eMu6:function(e,a,t){e.exports={viewportSm:"480px",viewportMs:"640px",viewportMd:"768px",viewportLg:"1080px",viewportXl:"1200px",text:"#303030",link:"#000",linkActive:"#8b8dc7",colorPlum100:"#f2f2ff",colorPlum200:"#d1d1e8",colorPlum300:"#b6b7db",colorPlum400:"#8b8dc7",colorPlum500:"#6164ba",colorPlum600:"#575aad",colorPlum700:"#31347a",colorPlum800:"#111354",colorHoney100:"#fcf9eb",colorHoney200:"#fbe8a9",colorHoney300:"#f6ce7a",colorHoney400:"#ffad4a",colorHoney500:"#e2894e",colorHoney600:"#c66b3e",colorHoney700:"#924f34",colorHoney800:"#6e2f1f",colorBlueberry100:"#e2f1fc",colorBlueberry200:"#8cc7f4",colorBlueberry300:"#0091ea",colorBlueberry400:"#004399",colorBlueberry500:"#012656",colorSlate100:"#edf1f2",colorSlate200:"#d2d6d7",colorSlate300:"#b7bcbd",colorSlate400:"#9ca1a2",colorSlate500:"#828688",colorSlate600:"#676b6d",colorSlate700:"#4c5153",colorSlate800:"#313638",colorStrawberry100:"#fbbcb2",colorStrawberry200:"#dc472e",qualitativeColorPalette100:"#b5e3db",qualiTativecolorPalette200:"#cc0",qualiTativecolorPalette300:"#a19bca",qualiTativecolorPalette400:"#f4a071",qualiTativecolorPalette500:"#2f6488",qualiTativecolorPalette600:"#527740",crdtAsian:"#E35942",crdtWhite:"#cc0",crdtBlack:"#a19bca",crdtLatinx:"#f4a071",crdtNonHispanic:"#111354",crdtNhpi:"#2f6488",crdtAian:"#527740",table:"_4545b",noWrap:"b6f76",cellLabel:"_0d5cc",annotation:"_07822",dateCell:"_4c288",value:"e0025",customHeader:"_8bb7b",disclosureButton:"_14c53",closed:"_30bfa",expanded:"_61282",disclosurePanel:"_8c30c"}},fmqH:function(e,a,t){e.exports={viewportSm:"480px",viewportMs:"640px",viewportMd:"768px",viewportLg:"1080px",viewportXl:"1200px",text:"#303030",link:"#000",linkActive:"#8b8dc7",colorPlum100:"#f2f2ff",colorPlum200:"#d1d1e8",colorPlum300:"#b6b7db",colorPlum400:"#8b8dc7",colorPlum500:"#6164ba",colorPlum600:"#575aad",colorPlum700:"#31347a",colorPlum800:"#111354",colorHoney100:"#fcf9eb",colorHoney200:"#fbe8a9",colorHoney300:"#f6ce7a",colorHoney400:"#ffad4a",colorHoney500:"#e2894e",colorHoney600:"#c66b3e",colorHoney700:"#924f34",colorHoney800:"#6e2f1f",colorBlueberry100:"#e2f1fc",colorBlueberry200:"#8cc7f4",colorBlueberry300:"#0091ea",colorBlueberry400:"#004399",colorBlueberry500:"#012656",colorSlate100:"#edf1f2",colorSlate200:"#d2d6d7",colorSlate300:"#b7bcbd",colorSlate400:"#9ca1a2",colorSlate500:"#828688",colorSlate600:"#676b6d",colorSlate700:"#4c5153",colorSlate800:"#313638",colorStrawberry100:"#fbbcb2",colorStrawberry200:"#dc472e",qualitativeColorPalette100:"#b5e3db",qualiTativecolorPalette200:"#cc0",qualiTativecolorPalette300:"#a19bca",qualiTativecolorPalette400:"#f4a071",qualiTativecolorPalette500:"#2f6488",qualiTativecolorPalette600:"#527740",crdtAsian:"#E35942",crdtWhite:"#cc0",crdtBlack:"#a19bca",crdtLatinx:"#f4a071",crdtNonHispanic:"#111354",crdtNhpi:"#2f6488",crdtAian:"#527740"}},fy0c:function(e,a,t){e.exports={viewportSm:"480px",viewportMs:"640px",viewportMd:"768px",viewportLg:"1080px",viewportXl:"1200px",text:"#303030",link:"#000",linkActive:"#8b8dc7",colorPlum100:"#f2f2ff",colorPlum200:"#d1d1e8",colorPlum300:"#b6b7db",colorPlum400:"#8b8dc7",colorPlum500:"#6164ba",colorPlum600:"#575aad",colorPlum700:"#31347a",colorPlum800:"#111354",colorHoney100:"#fcf9eb",colorHoney200:"#fbe8a9",colorHoney300:"#f6ce7a",colorHoney400:"#ffad4a",colorHoney500:"#e2894e",colorHoney600:"#c66b3e",colorHoney700:"#924f34",colorHoney800:"#6e2f1f",colorBlueberry100:"#e2f1fc",colorBlueberry200:"#8cc7f4",colorBlueberry300:"#0091ea",colorBlueberry400:"#004399",colorBlueberry500:"#012656",colorSlate100:"#edf1f2",colorSlate200:"#d2d6d7",colorSlate300:"#b7bcbd",colorSlate400:"#9ca1a2",colorSlate500:"#828688",colorSlate600:"#676b6d",colorSlate700:"#4c5153",colorSlate800:"#313638",colorStrawberry100:"#fbbcb2",colorStrawberry200:"#dc472e",qualitativeColorPalette100:"#b5e3db",qualiTativecolorPalette200:"#cc0",qualiTativecolorPalette300:"#a19bca",qualiTativecolorPalette400:"#f4a071",qualiTativecolorPalette500:"#2f6488",qualiTativecolorPalette600:"#527740",crdtAsian:"#E35942",crdtWhite:"#cc0",crdtBlack:"#a19bca",crdtLatinx:"#f4a071",crdtNonHispanic:"#111354",crdtNhpi:"#2f6488",crdtAian:"#527740",definitionButton:"d714d",arrowDown:"_941e8",arrowUp:"_15b4b"}}}]);
//# sourceMappingURL=component---src-pages-data-national-hospitalization-js-2d4364f53248f64c58e9.js.map