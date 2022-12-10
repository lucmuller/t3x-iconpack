/*
 * This file is part of the "iconpack" Extension for TYPO3 CMS.
 *
 * Conceived and written by Stephan Kellermayr
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 */
define(['require','exports','jquery','TYPO3/CMS/Backend/Modal','TYPO3/CMS/Core/Ajax/AjaxRequest','TYPO3/CMS/Backend/Icons'],(function(i,e,n,t,l,o){'use strict';let c;return c||(c=new class{constructor(){this.$imodal=null,this.fieldType=null,this.iconfig=null,this.iconfigBackup=null,this.styleSheets=null,this.editor=null,this.sel={palette:'.t3js-formengine-palette-field',formengineInput:'formengine-input-name',iconField:'.t3js-icon',modalFooter:'.modal-footer',styles:'#iconpack-style',options:'#iconpack-options',icons:'#iconpack-icons',iconSelection:'#iconpack-selected > div',search:'#iconpack-search',optionsSection:'.form-section'},this.el={$palette:null,$formengineInput:null,$iconField:null,$modalFooter:null,$styles:null,$options:null,$icons:null,$iconSelection:null,$search:null,$optionsSection:null}}showFieldIconModal(i){let e=n('link[title^=iconpack]');e.length?(this.styleSheets=[],n.each(e,(function(i,e){c.styleSheets.push(n(e).attr('href'))}))):this.styleSheets=null,this.fieldType='native',this.el.$palette=i.closest(this.sel.palette),this.el.$formengineInput=this.el.$palette.find('input[name="'+i.data(this.sel.formengineInput)+'"]'),this.el.$iconField=i.find(c.sel.iconField);let l=this.el.$formengineInput.val();this.iconfig=this.convertIconfigToObject(l),this.iconfigBackup=this.iconfig,this.createModal(TYPO3.settings.ajaxUrls.iconpack_modal+'&fieldType='+this.fieldType+'&iconfig='+l,TYPO3.lang['js.label.iconNative']).on('button.clicked',(function(i){c.$imodal.find('.modal-body').css('display','none'),'ok'===i.target.name?c.ajaxRequest(TYPO3.settings.ajaxUrls.iconpack_icon,c.addIconToField,c.convertIconfigToString(c.iconfig)):'clear'===i.target.name&&c.addIconToField(null,''),t.dismiss(c.unlinkCSS())}))}showCkeditorModal(i){this.editor=i,this.fieldType='rte',this.styleSheets=i.config.modalCss,this.iconfig=null,this.iconfigBackup=this.iconfig,this.createModal(TYPO3.settings.ajaxUrls.iconpack_modal+'&fieldType='+this.fieldType,TYPO3.lang['js.label.iconRte']).on('button.clicked',(function(i){'ok'===i.target.name&&c.ajaxRequest(TYPO3.settings.ajaxUrls.iconpack_icon,c.addIconToRte,c.convertIconfigToString(c.iconfig)),t.dismiss(c.unlinkCSS())}))}createModal(i,e){this.injectCSS();let l=[{text:n(this).data('button-cancel-text')||TYPO3.lang['js.button.cancel']||'Cancel',active:!0,name:'cancel'},{text:n(this).data('button-ok-text')||TYPO3.lang['js.button.ok']||'OK',btnClass:'btn-success',name:'ok'}];return this.iconfig&&l.unshift({text:n(this).data('button-clear-text')||TYPO3.lang['js.button.clear']||'Clear',btnClass:'btn-warning',name:'clear'}),t.advanced({type:t.types.ajax,title:e,content:i,buttons:l,size:t.sizes.large,callback:function(i){i.find('.t3js-modal-content').addClass('modal-iconpack'),c.$imodal=i},ajaxCallback:function(){c.initializeContent()}})}ajaxRequest(i,e,n){new l(i).withQueryArguments({fieldType:c.fieldType,iconfig:n}).get().then((async function(i){const t=await i.resolve();t&&e(t,n)}))}addIconToField(i,e){let n='';i&&i.icon&&(n=i.icon?c.convertIcon(i.icon,e):''),c.el.$formengineInput.val(e),c.el.$palette.addClass('has-change'),c.el.$iconField.html(n)}addIconToRte(i,e){i&&i.icon&&c.editor.insertElement(CKEDITOR.dom.element.createFromHtml(c.convertIcon(i.icon,e)+'&nbsp'))}updateContent(i,e){c.el.$search.find('input').val(''),null!==i.iconpackOptions&&c.el.$options.html(i.iconpackOptions),null!==i.iconpackIcons&&c.el.$icons.html(i.iconpackIcons),c.initializeOptionFields(),c.initializeIconWall()}initializeContent(){c.el.$modalFooter=c.$imodal.find(c.sel.modalFooter),c.el.$styles=c.$imodal.find(c.sel.styles),c.el.$options=c.$imodal.find(c.sel.options),c.el.$icons=c.$imodal.find(c.sel.icons),c.el.$iconSelection=c.$imodal.find(c.sel.iconSelection),c.el.$search=c.$imodal.find(c.sel.search),c.el.$styles&&0!==c.el.$styles.length?(c.initializeStyleField(),c.initializeOptionFields(),c.initializeIconWall(),c.initializeSearchField()):(c.el.$modalFooter.find('.btn-success').css('display','none'),c.el.$modalFooter.find('.btn-warning').css('display','none'))}initializeStyleField(){c.el.$styles.on('change',(function(){o.getIcon('spinner-circle',o.sizes.default,null,null,o.markupIdentifiers.inline).then(i=>{c.el.$icons.html('<div class="icons-loading">'+i+'</div>')}),c.iconfig=c.convertIconfigToObject(n(this).val()),c.iconfigBackup&&c.iconfigBackup.iconpack&&(c.iconfigBackup.iconpackStyle===c.iconfig.iconpackStyle?c.iconfig=c.iconfigBackup:c.iconfigBackup.iconpack===c.iconfig.iconpack&&(c.iconfig.options=c.iconfigBackup.options)),c.ajaxRequest(TYPO3.settings.ajaxUrls.iconpack_modal_update,c.updateContent,n(this).val())}))}initializeOptionFields(){c.el.$options.find('.iconpack-option').each((function(){let i=n(this),e=i.data('key');c.iconfig&&c.iconfig.options[e]&&c.setFieldValue(i,c.iconfig.options[e]),i.on('change',(function(){let i=c.iconfig.icon;if(i){let e=c.el.$icons.find('[name="'+i+'"]').html();c.el.$iconSelection.html(e)}c.applyOptions()}))}))}getFieldAttributes(i){if(i)if(i.is(':checkbox')){if(i.is(':checked'))return i.data('attributes')}else if(i.is('select')){let e=i.val();if(e)return i.find('[value='+e+']').data('attributes')}}getFieldValue(i){if(i){if(i.is(':checkbox'))return!!i.is(':checked');if(i.is('select'))return i.val()}return null}setFieldValue(i,e){i&&(i.is(':checkbox')?e&&i.prop('checked',e):i.is('select')&&i.val(e))}initializeSearchField(){let i=c.el.$search.find('input'),e=c.el.$search.find('button.close');c.el.$search.detach().prependTo(c.el.$modalFooter),e.click((function(){i.val('').trigger('input')})),i.on('input',(function(){let n=i.val();''!==n?e.css('visibility','visible'):e.css('visibility','hidden'),c.searchIcon(n)}))}initializeIconWall(){c.el.$icons.find('li').each((function(){let i=n(this),e=i.attr('name');c.iconfig&&c.iconfig.icon&&c.iconfig.icon===e&&n(this).addClass('active'),i.click((function(){n(this).closest('section').parent().find('li').removeClass('active'),n(this).addClass('active'),c.selectIcon(e)}))}))}selectIcon(i){let e=c.el.$styles.val(),n=c.el.$icons.find('[name="'+i+'"]').html();c.el.$iconSelection.html(n),c.iconfig=c.convertIconfigToObject(e+','+i),c.applyOptions()}applyOptions(){let i=[],e={options:{}};c.el.$options.find('.iconpack-option').each((function(){let t=n(this),l=t.data('key'),o=c.getFieldAttributes(t);o&&i.push(o);let s=c.getFieldValue(t);s&&(e.options[l]=s)})),c.mergeIconfig(e),c.mergeAttributesIntoIconSelection(i)}mergeAttributesIntoIconSelection(i){let e=c.el.$iconSelection.children().first();n.each(i,(function(i,t){n.each(t,(function(i,n){switch(i){case'class':e.addClass(n);break;case'style':e.css(n);break;default:e.attr(i,n)}}))}))}searchIcon(i){c.el.$icons.find('section').each((function(){let e=n(this),t=!1;e.find('li').each((function(){let e=n(this),l=e.attr('name');l&&l.indexOf(i)>=0?(e.css('display','inline-flex'),t=!0):e.css('display','none')})),t?e.css('display','block'):e.css('display','none')}))}convertIcon(i,e){let t=null;if(i)if(i.attributes['data-iconfig']=e,t=n('<'+i.elementName+'>',i.attributes),''===i.innerHtml)t.html(' ');else{if('svgInline'===i.type){let i=n.parseXML(t.prop('outerHTML'));t=n(i).find('svg')}t.html(i.innerHtml)}return t?t.prop('outerHTML'):''}injectCSS(){n.each(this.styleSheets,(function(i,e){if(!window.parent.$('link[href="'+e+'"]').length){let t=n('<link />',{rel:'stylesheet',type:'text/css',href:e,name:'iconpack['+i+']'});window.parent.$('head').append(t)}}))}unlinkCSS(){let i=window.parent.$('link[name^=iconpack]');i.length&&n.each(i,(function(i,e){e.remove()}))}convertIconfigToObject(i){let e=null;if(i){let n=(i=i.split(','))[0].split(':');e={iconpackStyle:i[0]||null,iconpack:n[0]||null,style:n[1]||null,icon:i[1]||null,options:{}};for(let n=2;n<i.length;n++){let t=i[n].split(':');e.options[t[0]]=t[1]}}return e}convertIconfigToString(i){let e='';if(i&&(e=i.iconpackStyle+','+i.icon,i.options))for(var n in i.options)e+=','+n+':'+i.options[n];return e}mergeIconfig(i){c.iconfig={...c.iconfig,...i},c.iconfigBackup=c.iconfig}}),c}));