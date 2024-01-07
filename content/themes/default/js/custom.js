$(document).ready(function(){$('.AutoSuggest').focus(function(){let slug=$(this).val();if(slug.length>=2){let elem=$(this).closest('form').find('.autoSuggest_cont');elem.show();performSuggestion(elem,slug)}})
$('.AutoSuggest').blur(function(){console.log('triggering blur./')
setTimeout(function(){$('.autoSuggest_cont').hide();},200)})
$('.AutoSuggest').keyup(function(){let slug=$(this).val();if(slug.length>=2){let elem=$(this).closest('form').find('.autoSuggest_cont');performSuggestion(elem,slug);}else{$(this).closest('form').find('.autoSuggest_cont').hide();}});$('.copyShareLink').click(function(){copyToClipboard($('#shareLinktoCopy').text());$('.Copied').show();setTimeout(()=>{$('.Copied').hide()},1000);})
const themeLink=$('#toggleTheme');const currentTheme=localStorage.getItem('theme');if(currentTheme==null){localStorage.setItem('theme','');}
if(currentTheme){themeLink.attr('href',currentTheme);}
if(currentTheme==''||currentTheme==null){themeLink.attr('href','');$('#toggle-button i').removeClass('fa-sun-o').addClass('fa-moon-o').attr('title','Dark Mode');}else{themeLink.attr('href',DARKTHEME_LINK);$('#toggle-button i').removeClass('fa-moon-o').addClass('fa-sun-o').attr('title','Light Mode');}
$('#toggle-button').click(function(){console.log('clicking...')
if(themeLink.attr('href')===''){themeLink.attr('href',DARKTHEME_LINK);localStorage.setItem('theme',DARKTHEME_LINK);$('#toggle-button i').removeClass('fa-moon-o').addClass('fa-sun-o').attr('title','Light Mode');}else{themeLink.attr('href','');localStorage.setItem('theme','');$('#toggle-button i').removeClass('fa-sun-o').addClass('fa-moon-o').attr('title','Dark Mode');}});})
const copyToClipboard=(text)=>{navigator.clipboard.writeText(text);};function performSuggestion(elem,slug){elem.show();elem.html('Loading...')
$.get('/includes/autosuggest.php?slug='+slug,function(d){let hti='';if(d.length>0){for(var i in d){let dg=d[i];hti+=`<div class="gamecont">
						<a class="suggest_link" href="`+dg.url+`">
							<div class="game_image" style="background-image: url('`+dg.thumb+`')">
							</div>
							<div class="game_txt">
								<div class="game_txt_link">
									`+dg.title+`
								</div>
							</div>
						</a>
						<div style="clear: both;"></div>
					</div>`;}
hti+=`<div><a class="suggest_link" href="/search/`+slug+`">Search All</a></div>`}else{hti=`No results found..`}
elem.html(hti);},'json');}