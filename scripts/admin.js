$(() => {
    var products = getProducts();
    console.log(products);
    showProducts(products);
    $("#drop").on("dragenter", (evt) => {
      evt.preventDefault();
    });
    $("#drop").on("dragover", (evt) => {
      evt.preventDefault();
    });
    $("#drop").on("drop", (evt) => {
      var files = evt.originalEvent.dataTransfer.files;
      console.log(files[0]);
      if (files.length > 0) {
        var xlfile = files[0];
        var extension = xlfile.name
          .substring(xlfile.name.lastIndexOf("."))
          .toUpperCase();
        if (extension == ".XLS" || extension == ".XLSX") {
          excelFileToJSON(xlfile);
        } else {
          //$("#drop").html("Please drop a valid excel file.");
          SnackBar({
              status: "error",
              position: 'bc',
              message: "Please drop a valid excel file."
          });
        }
      }
      evt.preventDefault();
    });
  });
  function getProducts(){
    return localStorage.getItem("product-list") ? JSON.parse(localStorage.getItem("product-list")):[];
  }
  function showProducts(products){
    $("#tbody").empty();
    products.forEach(p=>{
        $("#tbody").append(`<tr>
                <td><img src="image/${p.picture}" style="width:40px;border:solid 1px lightgray;border-radius:50%" /></td>
                <td>${p.name}</td>
                <td>${p.price}</td>
                <td>${p.description}</td>
            </tr>`);
    });
  }
  function excelFileToJSON(file) {
    try {
      var reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = function (e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {
          type: "binary",
        });
        var result = {};
        workbook.SheetNames.forEach(function (sheetName) {
          var roa = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheetName]
          );
          if (roa.length > 0) {
            result[sheetName] = roa;
          }
        });
        //displaying the json result
        let sheet = Object.keys(result)[0];
        let newproducts= result[sheet];
        localStorage.setItem("product-list", JSON.stringify(newproducts));
        
        products=getProducts();
        showProducts(products);
        SnackBar({
              status: "success",
              position: 'bc',
              message: "Data saved to storage."
          });
      };
    } catch (e) {
      console.error(e);
    }
  }