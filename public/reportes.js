function probar(){
    var reportes;
    $.ajax({
        type:"GET",
        contentType:"application/json; charset=utf8",
        url:"http://localhost:8080/ejecutarPrueba",
               success: function (response) {
                   reportes=response;
        },
        async: false,
    });

    return reportes;
}

function consultar(){
  var reportes;
    $.ajax({
        type:"GET",
        contentType:"application/json; charset=utf8",
        url:"http://localhost:8080/consultar",
               success: function (response) {
                 var parse_obj = JSON.parse(response);
                 //reportes = parse_obj;
                // var total = Object.keys(parse_obj);
                var num = 0 ;
                var html = [];
                html.push(
                  "<table style='width:100%'><tr><th>Fecha</th><th>Imagen</th><th>Imagen</th><th>ImagenComp</th></tr>");
                 $.each(parse_obj,function(i,item){
                   arreglo = item;
                   $(arreglo).each(function(index, element) {
                      html.push(
                      " <tr><th>"+element.fecha +"</th><th><img src='"+element.imagen1+"' width='250' height='150'></th><th><img src='"+element.imagen2+"' width='250' height='150'></th><th><img src='"+element.imagenComp+"' width='250' height='150'></th></tr>"
                      );

                      //alert('id: ' + element.fecha + ', name: ' + element.imagen1);
                  });
                  html.push("</table>");
                  html.join("");
                 })

                reportes = html;

        },
        async: false,
    });

        return $('#respuesta').html(reportes);
}
