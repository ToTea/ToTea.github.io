function hello() {
    var name = $("#name").val()
    var age = $("#age").val()
    var like = "";
    if ($("#orange").prop("checked")) {
        like += " " + $("#orange").val();
    }
    if ($("#apple").prop("checked")) {
        like += " " + $("#apple").val();
    }

    alert("Hello, " + age + " 歲的 " + name + " 你好。原來你喜歡" + like)
    $("#name").val("");
    $("#age").val("");
    $("#orange").prop("checked", false);
    $("#apple").prop("checked", false);
}

$("#hello").on("click", hello);