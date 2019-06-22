var url = require('url');
console.log("In handlebars ");
var hbsHelpers  = function (hbs) {
    
    hbs.registerHelper("inc", function (value, options) {
        return parseInt(value) + 1;
    });

    hbs.registerHelper('getUrl', function (value, options) {
        return req.getUrl + value;
    });

    hbs.registerHelper('assetsUrl', function (value, options) {
        return req.getUrl+'/assets' + value;
    });


    hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
       
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    hbs.registerHelper('isSelected', function (arg1, arg2, options) {
        
        return (arg1 == arg2) ? 'selected' : '';
    });

    hbs.registerHelper('isChecked', function (arg1, arg2, options) {
        return (arg1 == arg2) ? 'checked' : '';
    });



    hbs.registerHelper('paginationLinks', function (data,formData,baseUrl) {

        var html = '';

        if(data.pageCount > 1 ){
            var html = '<div class="pagination">';

            if(formData.page){
               delete formData.page;
            }

            var queryString =  Object.keys(formData).map(key => key + '=' + formData[key]).join('&');
            
            if(data.page==1){
             html += '<li class="disabled"><a>First</a></li>';
            }else{
                html += '<li><a href="' + baseUrl +  '?page=1' + queryString+ '">First</a></li>';
            }
            var i = (Number(data.page) > 5 ? Number(data.page) - 4 : 1);
          
            for(; i<=(Number(data.page) + 4) && i<=data.pageCount; i++){
                if(i == data.page){
                    html = html + ' <li class="active"><a>' + i +'</a></li>';
                }else{
                   
                    if(queryString){
                        queryString = '&' + queryString;
                    }
                    html = html + '<li><a href="' +baseUrl + '?page='+ i + queryString+ '">' + i  + '</a></li>';
                }
                if(i ==Number(data.page) + 4 && i < data.pageCount){
                    html = html + '<li class="disabled"><a>...</a></li>';
                }
            }
            if(data.page == data.pageCount){
                html += '<li class="disabled"><a>Last</a></li>';
                
            }else{
                html += '<li><a href="' + baseUrl +  '?page='+data.pageCount + queryString+ '">Last</a></li>';
            }


            html += '</div>';
        }
       
        return html;
    });
}

module.exports = hbsHelpers;