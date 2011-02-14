function ban_forum(deny_users){
    if(!$('threadlist')) return ;
    var elems=$$('#threadlist > div.bm_c > form > table > tbody');
    elems.each(function(el){
        if(/^[a-z]+thread_\d+$/.test(el.get('id'))){
            var nick=el.getElements('td.by > cite > a ')[0].get('text');
            if(deny_users.indexOf(nick)>-1){
                el.destroy();
            }
        }
    });
}
function ban_thread(deny_users){
    if(!$('postlist')) return ;
    var elems=$$('#postlist > div');
    elems.each(function(el){
        if(/^post_\d+$/.test(el.get('id'))){
            var nick=el.getElements('a.xw1')[0].get('text');
            if(deny_users.indexOf(nick)>-1){
                el.destroy();
            }
        }
    });
    

}


chrome.extension.sendRequest({list_data:'deny_users'}, function(response) {
    var deny_users=response.deny_users;
    deny_users=JSON.parse(deny_users);
    ban_forum(deny_users);
    ban_thread(deny_users);
});


