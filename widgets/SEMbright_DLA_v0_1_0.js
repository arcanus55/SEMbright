/*
SEMbright DLA v0.1.0
Copyright (c) 2022, Arcanus 55 Privacy Paranoid Vault | Forged by Scott C. Krause
*/

//  SEMbright Options Custom Config Begin  //
let sembOpt = {
  CONSOLE_LOG_VER: true,
  SEMB_DEBUG_lOG: false
}

if( typeof sembOptCustom != 'undefined' ){
    for( cnfgProp in sembOptCustom ){  //  Import Custom Objects props if exists
      sembOpt[ cnfgProp ] = sembOptCustom[ cnfgProp ]
    }
}

//  SEMbright Utils Begin  //
const sembUtils = ( ( _d ) =>{
  return {
    ver: "0.1.0",
    isMobile: function(){ return (_d.body.clientWidth <= 768) ? true : false; },
    f1210: function(){ return (Math.floor(Math.random() * (10) + 1)); },  //  1 to 10
    f02x: function(x){ return (Math.floor(Math.random() * x)); },  //  0 to x
    fAsyncJS: function( _d, _uri, bJS, _cb ){  //  Load JS/CSS Async then callback
      //  let bJS = ( _uri.indexOf(".js") != -1)
      let el = _d.createElement( bJS ? "script" : "link" )
      if( bJS ){
        el.type = "text/javascript"
        el.async = true
        el.src = _uri        
      }else{
        el.rel = "stylesheet"
        el.href = _uri
      }

      if( _cb ) el.onload = function(){ _cb() }
      _d.getElementsByTagName( "head" )[0].appendChild( el )
    },
    data2prop: function( sDset ){  //  Convert HTML data attrib name to JS dataset name
      sDset = sDset.replace("data-", "").toLowerCase();
      let aDset = sDset.split(""), aDret = [], bUpper = false;
      aDset.forEach( (sVal, nIx) => {
          if( sVal == "-" ){
              bUpper = true;
          }else{
              aDret.push( ( bUpper ) ? sVal.toUpperCase() : sVal );
              bUpper = false;
          }
      });
      return aDret.join("");
    },
    capFirst: s => (s && s[0].toUpperCase() + s.slice(1)) || ""
  }
})( document );

//  SEMbright Begin  //
class SEMbright {
    constructor( _d, _aQ ) {
        this._d = _d; this._aQ = _aQ
        this.bIsInit = false; this.bIsPause = false
    }
    preInit (){
      //  Request CSS (gh-pages?)
      //  If N55 else request N55
      //  Might want to point to the CDN at some point
      sembUtils.fAsyncJS( document, "SEMbright_DLA_v0_1_0.css", false, function(){
        sembUtils.fAsyncJS( document, "https://arcanus55.github.io/neodigm55/dist/neodigm55_v1_9.js", true, function(){
        sembUtils.fAsyncJS( document, "https://arcanus55.github.io/neodigm55/dist/neodigm55_v1_9.css", false, function(){
          if( doDOMContentLoaded ){
            doDOMContentLoaded()
            if( neodigmSodaPop ) neodigmSodaPop.autoOpen("semb--wdla__id")

            var formdata = new FormData();
            formdata.append("first_name", "Moxy");
            formdata.append("email", "dduck@pocketlint2.com");
            formdata.append("password", "swordfish");
            formdata.append("primary_domain", "www.pocketlint2.com");
            formdata.append("last_name", "duck");
            
            var requestOptions = {
              method: 'POST',
              body: formdata,
              redirect: 'follow',
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Origin': '*'
              }
            };
            
            fetch("http://52.201.217.116/dla/v010/users", requestOptions)
              .then(response => response.text())
              .then(result => console.log(result))
              .catch(error => console.log('error', error));            


          }
        })
      })
    })
    }
    init () {
        this.bIsInit = true
        return this
    }
    pause (){ this.bIsPause = true; return this; }
    play (){ this.bIsPause = false; return this; }
    setTheme (){ if( this.bIsInit ){ return this; } }
}
let sembright = new SEMbright( document, ["neodigm-qqqq"] )


document.addEventListener("DOMContentLoaded", function(ev) {
  const neodigmMU = `
   <template id="semb--wdla__id" data-n55-sodapop-modal="true" 
  data-n55-sodapop-size="medium">
  
  YOUR CONTENT HERE
  
  </template>`;
  let eMU = document.createElement("output");
  eMU.innerHTML = neodigmMU;
  document.body.appendChild(eMU);
  setTimeout( ()=>{
    sembright.preInit()
    if( sembOpt.CONSOLE_LOG_VER ) console.log("%c SEMbright White-label Digital Landscape Audit ✨ v" + sembUtils.ver, "background: #000; color: #F5DF4D; font-size: 20px");
  }, 5600)
});