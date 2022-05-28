/*
SEMbright DLA v0.1.0
Copyright (c) 2022, Arcanus 55 Privacy Paranoid Vault | Forged by Scott C. Krause
*/

//  SEMbright Options Custom Config Begin  //
let sembOpt = {
  CONSOLE_LOG_VER: true,
  SEMB_DEBUG_lOG: false
}

if( typeof sembOptCustom != "undefined" ){
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
        this.sToken = ""
        this.baseUrl = "https://api.sembright.com";//"http://52.201.217.116";//
    }
    preInit (){
      //  TODO Might want to point to the CDN at some point
      sembUtils.fAsyncJS( document, "SEMbright_DLA_v0_1_0.css", false, function(){  //  Request CSS (gh-pages?)
        if( typeof neodigmOpt != "undefined" ){  //  If N55 else request N55
          if( neodigmSodaPop ) neodigmSodaPop.autoOpen("semb--wdla__id")
        }else{
          sembUtils.fAsyncJS( document, "https://arcanus55.github.io/neodigm55/dist/neodigm55_v2_1.js", true, function(){
            sembUtils.fAsyncJS( document, "https://arcanus55.github.io/neodigm55/dist/neodigm55_v2_1.css", false, function(){
              if( doDOMContentLoaded ){
                doDOMContentLoaded()
                if( neodigmSodaPop ) neodigmSodaPop.autoOpen("semb--wdla__id")
              }
            })
          })
        }
      })
    }
    init () {
        this.bIsInit = true
        return this
    }
    doCreateUser (){
      var _that = this
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "first_name": document.getElementById("create_user_first_name").value,
        "last_name": document.getElementById("create_user_last_name").value,
        "email": document.getElementById("create_user_email").value,
        "password": document.getElementById("create_user_password").value,
        "primary_domain": document.getElementById("create_user_primary_domain").value,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch( _that.baseUrl + "/dla/v010/users", requestOptions)
        .then(response => response.text())
        .then( function(result){
          result = JSON.parse( result )
          if( result.errors ){
            for(  const errMsg in result.errors ){
              neodigmEnchantedCTA.flashTheme("danger")
              result.errors[errMsg].forEach( ( errMsgTxt ) => { neodigmToast.q( errMsgTxt, "danger" ) })
            }
          }else{
            neodigmToast.q( "Account Created", "success" )
          }
        })
        .catch(error => neodigmToast.q( JSON.stringify( error ), "danger"));
    }
    doCreateBrand (){

    }
    doSignin ( sEmail, sPw ){
      var _that = this
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        "email": this._d.getElementById("signin__email").value,
        "password": this._d.getElementById("signin__password").value
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch( _that.baseUrl + "/dla/v010/users/signin", requestOptions)
        .then(response => response.text())
        .then( function( result ){
          if( neodigmToast ) neodigmToast.q("You are now|Signed In", "success")
          return _that.sToken = JSON.parse(result).token;  //  local storage
        } )
        .catch(error => neodigmToast.q( JSON.stringify( error ), "danger"));
    }
    doSignout(){
      if( this.sToken ){
        var _that = this
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + this.sToken );
        myHeaders.append("Content-Type", "application/json");
        //  neodigmToast.q( "token " + this.sToken, "primary");
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: null,
          redirect: 'follow'
        };
        fetch( _that.baseUrl + "/dla/v010/users/signout", requestOptions)
          .then(response => response.text())
          .then(result => _that.sToken = "")
          .catch(error => neodigmToast.q( JSON.stringify( error ), "danger"));
        if( neodigmToast ) neodigmToast.q("You are now|Signed Out", "success")
      }else{
        if( neodigmToast ) neodigmToast.q("You are not|Signed in", "danger")
      }
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

<form autocomplete="off" novalidate="" onsubmit="return false">
  <input id="create_user_first_name" class="semb-input" type="text" placeholder="* First Name">
  <input id="create_user_last_name" class="semb-input" type="text" placeholder="Last Name">
  <input id="create_user_email" class="semb-input" type="email" placeholder="* Work Email Address">
  <input id="create_user_password" class="semb-input" type="password" placeholder="* Password">
  <input id="create_user_primary_domain" class="semb-input" type="text" placeholder="* Primary Domain">
</form>
<div class="h-center">
  <br>
  <a id="cta__create-user--id" data-n55-enchanted-cta data-n55-enchanted-cta-size="medium"
  onclick="sembright.doCreateUser()" data-n55-theme="brand">
  <span data-n55-wired4sound-mouseover="3">Create New Account</span><span>Submit</span></a>
</div>

<hr>
<form autocomplete="off" novalidate="" onsubmit="return false">
      <input id="signin__email" name="signin__email" class="semb-input" type="email" placeholder="Email Address" value="dduck@pocketlint3.com">
      <input id="signin__password" name="signin__password" class="semb-input" type="password" placeholder="password">
</form>

<div class="h-center">
  <br>
  <a id="cta__signin--id" data-n55-enchanted-cta data-n55-enchanted-cta-size="small"
  onclick="sembright.doSignin()" data-n55-theme="primary">
  <span data-n55-wired4sound-mouseover="3">Sign In</span><span>Login</span></a>
  <br>
  <a id="cta__signout--id" data-n55-enchanted-cta data-n55-enchanted-cta-size="small"
  onclick="sembright.doSignout()" data-n55-theme="info">
  <span data-n55-wired4sound-mouseover="3">Sign Out</span><span>Logout</span></a>
</div>

<hr>

<form autocomplete="off" novalidate="" onsubmit="return false">
  <input id="create_brand_logo" class="semb-input" type="text" placeholder="Logo">
  <input id="create_brand_logo_thumb" class="semb-input" type="text" placeholder="Logo_thumb">
  <input id="create_brand_color_primary" class="semb-input" type="text" placeholder="Color primary">
  <input id="create_brand_color_secondary" class="semb-input" type="text" placeholder="Color secondary">
  <input id="create_brand_color_success" class="semb-input" type="text" placeholder="Color success">
  <input id="create_brand_color_danger" class="semb-input" type="text" placeholder="Color danger">
  <input id="create_brand_color_warning" class="semb-input" type="text" placeholder="Color warning">
  <input id="create_brand_color_info" class="semb-input" type="text" placeholder="Color info">
  <input id="create_brand_verbiage_markup" class="semb-input" type="text" placeholder="Verbiage markup">
  <input id="create_brand_contact_markup" class="semb-input" type="text" placeholder="Contact markup">
</form>

<div class="h-center">
  <br>
  <a id="cta__create-user--id" data-n55-enchanted-cta data-n55-enchanted-cta-size="medium"
  onclick="sembright.doCreateBrand()" data-n55-theme="brand">
  <span data-n55-wired4sound-mouseover="3">Create New Brand</span><span>Submit</span></a>
</div>

<hr>

<section class="h-center">
  <a id="cta__close--id" data-n55-enchanted-cta data-n55-enchanted-cta-size="small"
  onclick="neodigmSodaPop.close()" data-n55-theme="secondary" data-n55-wired4sound-click="8">
  <span data-n55-wired4sound-mouseover="3">Close</span><span>Exit</span></a>
</section>

</template>`;
  let eMU = document.createElement("output");
  eMU.innerHTML = neodigmMU;
  document.body.appendChild(eMU);
  setTimeout( ()=>{
    sembright.preInit()
    if( sembOpt.CONSOLE_LOG_VER ) console.log("%c SEMbright White-label Digital Landscape Audit ✨ v" + sembUtils.ver, "background: #000; color: #F5DF4D; font-size: 20px");
  }, 2e3)
});
