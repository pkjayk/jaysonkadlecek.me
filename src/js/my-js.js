  $("#the-form").submit(function(){
    $(".error-success").removeClass("text-error");
    var data = { "success": "n" };
    data = $(this).serialize();
    $.ajax({
      type: "POST",
      dataType: "JSON",
      url: "/form-handler.php", 
      data: data,
      success: function(data) {
          var obj = data;
          if(obj.success == "y"){
              // ga('send', 'pageview', '/goals/small-biz-informal/');
              $(".inner-form").hide();
              $("#thank-you").fadeIn("10000");
              $("#thank-you").html(obj.finalMessage)
          } 
      },
      error: function(data) {
        var obj = data.responseJSON;
        function updateInputClass()
    {
        $(this).toggleClass('invalid', $.trim(this.value) == '');
    }

    $(".validate")
      .blur(updateInputClass)
      .each(updateInputClass)

    if(obj.errorCode == "P1"){
      $("#phone").addClass("invalid");
    }
        $(".error-success").show();
        $(".error-success").addClass("text-error");
        $(".error-success").html(obj.finalMessage);
      }
  });
    return false;
  });
