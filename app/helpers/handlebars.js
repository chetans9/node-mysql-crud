var url = require('url');
let stringHelper = require('./string');
var hbsHelpers  = function (req,hbs) {

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

        let html = '';

        if(data.pageCount > 1 ){
            html = '<ul class="pagination">';

            if(formData.page){
               delete formData.page;
            }

            var queryString =  Object.keys(formData).map(key => key + '=' + formData[key]).join('&');
            queryString = stringHelper.escapeHtml(queryString);
            
            if(data.page==1){
             html += '<li class="page-item disabled"><a class="page-link">First</a></li>';
            }else{
                html += '<li class="page-item"><a class="page-link" href="' + baseUrl +  '?page=1' + queryString+ '">First</a></li>';
            }
            var i = (Number(data.page) > 5 ? Number(data.page) - 4 : 1);
          
            for(; i<=(Number(data.page) + 4) && i<=data.pageCount; i++){
                if(i == data.page){
                    html = html + ' <li class="page-item active"><a class="page-link">' + i +'</a></li>';
                }else{
                   
                    if(queryString){
                        queryString = '&' + queryString;
                    }
                    html = html + '<li class="page-item"><a class="page-link"  href="' +baseUrl + '?page='+ i + queryString+ '">' + i  + '</a></li>';
                }
                if(i ==Number(data.page) + 4 && i < data.pageCount){
                    html = html + '<li class="disabled"><a>...</a></li>';
                }
            }
            if(data.page == data.pageCount){
                html += '<li class="disabled"><a class="page-link">Last</a></li>';
                
            }else{
                html += '<li><a class="page-link" href="' + baseUrl +  '?page='+data.pageCount + queryString+ '">Last</a></li>';
            }


            html += '</ul>';
        }
       
        return html;
    });
}

module.exports = hbsHelpers;