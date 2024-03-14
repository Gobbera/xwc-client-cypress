/* eslint-disable no-undef */
window.languages = [{
    language:'Portugues',
    baseLanguage:true,
    isoCode:'pt-br'
},{
    language:'English',
    isoCode:'en-en'
},{
    language:'English',
    baseLanguage:true,
    isoCode:'en-us'
},{
    language:'Espanõl',
    baseLanguage:true,
    isoCode:'es-es'
}];

window.findBaseLanguage = function (baseLanguageCode) {
    let baseLanguage = window.languages.find(lang => lang.isoCode.split('-')[0] == baseLanguageCode && lang.baseLanguage == true);
    return baseLanguage ?baseLanguage.isoCode : window.g_defaultLanguage;
};

window.findLanguage = function () {
    let language = window.languages.find(lang => lang.isoCode == window.g_Language);
    return language ? language.isoCode : window.findBaseLanguage(window.g_LanguageBase);
};

window.g_defaultLanguage = 'pt-br';
window.g_Language = (navigator.language || navigator.userLanguage).toLowerCase();
window.g_LanguageBase = window.g_Language.split('-');
window.g_ActiveLanguage = window.findLanguage();

if (window.g_LanguageBase && window.g_LanguageBase.length) {
    window.g_LanguageBase = window.g_LanguageBase[0];
}


(function () {
    const uiTextBkp = JSON.parse(JSON.stringify(window.UITEXT));

    window.UITEXT = {};
    window.MSGTEXT = {};
    window.g_language = window.g_ActiveLanguage.toUpperCase().replace('-', '');
    Object.keys(uiTextBkp).forEach(textVar => {
        window.UITEXT[textVar] = uiTextBkp[textVar][window.g_language];
      });
})();