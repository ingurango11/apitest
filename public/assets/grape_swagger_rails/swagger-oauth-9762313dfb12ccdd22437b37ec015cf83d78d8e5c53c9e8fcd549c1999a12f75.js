function handleLogin(){var e=[],o=window.swaggerUi.api.authSchemes||window.swaggerUi.api.securityDefinitions;if(o){var i,a=o;for(i in a){var p=a[i];if("oauth2"===p.type&&p.scopes){oauth2KeyName=i;var n;if(Array.isArray(p.scopes)){var t;for(t=0;t<p.scopes.length;t++)e.push(p.scopes[t])}else for(n in p.scopes)e.push({scope:n,description:p.scopes[n]})}}}for(window.swaggerUi.api&&window.swaggerUi.api.info&&(appName=window.swaggerUi.api.info.title),$(".api-popup-dialog").remove(),popupDialog=$(['<div class="api-popup-dialog">','<div class="api-popup-title">Select OAuth2.0 Scopes</div>','<div class="api-popup-content">',"<p>Scopes are used to grant an application different levels of access to data on behalf of the end user. Each API may declare one or more scopes.",'<a href="#">Learn how to use</a>',"</p>","<p><strong>"+appName+"</strong> API requires the following scopes. Select which ones you want to grant to Swagger UI.</p>",'<ul class="api-popup-scopes">',"</ul>",'<p class="error-msg"></p>','<div class="api-popup-actions"><button class="api-popup-authbtn api-button green" type="button">Authorize</button><button class="api-popup-cancel api-button gray" type="button">Cancel</button></div>',"</div>","</div>"].join("")),$(document.body).append(popupDialog),popup=popupDialog.find("ul.api-popup-scopes").empty(),t=0;t<e.length;t++)n=e[t],str='<li><input type="checkbox" id="scope_'+t+'" scope="'+n.scope+'"/><label for="scope_'+t+'">'+n.scope,n.description&&(str+='<br/><span class="api-scope-desc">'+n.description+"</span>"),str+="</label></li>",popup.append(str);var r=$(window),s=r.width(),c=r.height(),l=r.scrollTop(),d=popupDialog.outerWidth(),u=popupDialog.outerHeight(),h=(c-u)/2+l,g=(s-d)/2;popupDialog.css({top:(0>h?0:h)+"px",left:(0>g?0:g)+"px"}),popupDialog.find("button.api-popup-cancel").click(function(){popupMask.hide(),popupDialog.hide(),popupDialog.empty(),popupDialog=[]}),$("button.api-popup-authbtn").unbind(),popupDialog.find("button.api-popup-authbtn").click(function(){popupMask.hide(),popupDialog.hide();var e=window.swaggerUi.api.authSchemes,o=window.location,i=location.pathname.substring(0,location.pathname.lastIndexOf("/")),a=o.protocol+"//"+o.host+i+"/o2c.html",p=window.oAuthRedirectUrl||a,n=null;for(var t in e)if(e.hasOwnProperty(t)){var r=e[t].flow;if("oauth2"!==e[t].type||!r||"implicit"!==r&&"accessCode"!==r){if(e[t].grantTypes){var s=e[t].grantTypes;for(var c in s)if(s.hasOwnProperty(c)&&"implicit"===c){var l=s[c];l.loginEndpoint.url;n=l.loginEndpoint.url+"?response_type=token",window.swaggerUi.tokenName=l.tokenName}else if(s.hasOwnProperty(c)&&"accessCode"===c){var l=s[c];l.tokenRequestEndpoint.url;n=l.tokenRequestEndpoint.url+"?response_type=code",window.swaggerUi.tokenName=l.tokenName}}}else{var l=e[t];n=l.authorizationUrl+"?response_type="+("implicit"===r?"token":"code"),window.swaggerUi.tokenName=l.tokenName||"access_token",window.swaggerUi.tokenUrl="accessCode"===r?l.tokenUrl:null}}var d=[],s=$(".api-popup-scopes").find("input:checked");for(k=0;k<s.length;k++){var u=$(s[k]).attr("scope");-1===d.indexOf(u)&&d.push(u)}var h=Math.random();window.enabledScopes=d,redirect_uri=p,n+="&redirect_uri="+encodeURIComponent(p),n+="&realm="+encodeURIComponent(realm),n+="&client_id="+encodeURIComponent(clientId),n+="&scope="+encodeURIComponent(d.join(scopeSeparator)),n+="&state="+encodeURIComponent(h),window.open(n)}),popupMask.show(),popupDialog.show()}function handleLogout(){for(key in window.authorizations.authz)window.authorizations.remove(key);window.enabledScopes=null,$(".api-ic.ic-on").addClass("ic-off"),$(".api-ic.ic-on").removeClass("ic-on"),$(".api-ic.ic-warning").addClass("ic-error"),$(".api-ic.ic-warning").removeClass("ic-warning")}function initOAuth(e){var o=e||{},i=[];return appName=o.appName||i.push("missing appName"),popupMask=o.popupMask||$("#api-common-mask"),popupDialog=o.popupDialog||$(".api-popup-dialog"),clientId=o.clientId||i.push("missing client id"),clientSecret=o.clientSecret||i.push("missing client secret"),realm=o.realm||i.push("missing realm"),scopeSeparator=o.scopeSeparator||" ",i.length>0?void log("auth unable initialize oauth: "+i):($("pre code").each(function(e,o){hljs.highlightBlock(o)}),$(".api-ic").unbind(),void $(".api-ic").click(function(e){$(e.target).hasClass("ic-off")?handleLogin():handleLogout()}))}var appName,popupMask,popupDialog,clientId,realm,oauth2KeyName,redirect_uri,clientSecret,scopeSeparator;window.processOAuthCode=function(e){var o={client_id:clientId,client_secret:clientSecret,code:e.code,grant_type:"authorization_code",redirect_uri:redirect_uri};$.ajax({url:window.swaggerUi.tokenUrl,type:"POST",data:o,success:function(e){onOAuthComplete(e)},error:function(){onOAuthComplete("")}})},window.onOAuthComplete=function(e){if(e)if(e.error){var o=$("input[type=checkbox],.secured");o.each(function(e){o[e].checked=!1}),alert(e.error)}else{var i=e[window.swaggerUi.tokenName];if(i){var a=null;$.each($(".auth .api-ic .api_information_panel"),function(e,o){var i=o;if(i&&i.childNodes){var p=[];$.each(i.childNodes,function(e,o){var i=o.innerHTML;i&&p.push(i)});for(var n=[],t=0;t<p.length;t++){var r=p[t];window.enabledScopes&&-1==window.enabledScopes.indexOf(r)&&n.push(r)}n.length>0?(a=o.parentNode.parentNode,$(a.parentNode).find(".api-ic.ic-on").addClass("ic-off"),$(a.parentNode).find(".api-ic.ic-on").removeClass("ic-on"),$(a).find(".api-ic").addClass("ic-warning"),$(a).find(".api-ic").removeClass("ic-error")):(a=o.parentNode.parentNode,$(a.parentNode).find(".api-ic.ic-off").addClass("ic-on"),$(a.parentNode).find(".api-ic.ic-off").removeClass("ic-off"),$(a).find(".api-ic").addClass("ic-info"),$(a).find(".api-ic").removeClass("ic-warning"),$(a).find(".api-ic").removeClass("ic-error"))}}),window.swaggerUi.api.clientAuthorizations.add(oauth2KeyName,new SwaggerClient.ApiKeyAuthorization("Authorization","Bearer "+i,"header"))}}};