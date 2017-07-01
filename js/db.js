var fdb = new ForerunnerDB();
var db = fdb.db("myDB");

var studentCollection = db.collection('students');

// for (var i = 0; i < 10; i++) {
// 	var newStudent = {
// 		name: "Orange" + i,
// 		age: 10 + i
// 	}
// 	studentCollection.insert(newStudent)
// }
// studentCollection.save()


studentCollection.load()

function createHTMLString(_id, name){
	return "<tr><td class='studentsId'>"+_id+"</td><td>"+name+"</td><td><button class='updateButton btn btn-warning' data-id='"+_id+"'>修改</button> <button class='deleteButton btn btn-danger' data-id='"+_id+"'>刪除</button></td></tr>";
}

function afterLoad() {
    var students = studentCollection.find();
    console.log(students)
    for (var i = 0; i < students.length; i++) {
    	console.log(students[i]._id);
    	$("#studentsTable").append(createHTMLString(students[i]._id, students[i].name));
    }
    $("#studentsTable").on("click", ".studentsId", function(){
    	var studentId = $(this).text();
    	console.log(studentId)

    	var query = {
    		_id: studentId
    	}
    	var student = studentCollection.find(query)[0];

    	$("#studentsName").text(student.name);
    	$("#studentsAge").text(student.age);
    	$("#studentsClass").text(student.class);
    	$("#studentsId").text(student._id);

    	$("#studentsInfo").modal('show');
    });
}

setTimeout(afterLoad, 500);


function addData(){
	var name = $("#newName").val();
	var age =  $("#newAge").val();
	var newClass =  $("#newClass").val();
	var newStudent = {
	    name: name,
	    age: age,
	    class: newClass
	};
	studentCollection.insert(newStudent);
	studentCollection.save();
	var student = studentCollection.find(newStudent)[0];
	console.log(student);

	$("#studentsTable").append(createHTMLString(student._id, student.name));
}
$("#addData").click(addData);

function deleteData(){
	var id = $(this).attr("data-id")
	console.log(id)
	studentCollection.remove({
	    _id: id
	});
	studentCollection.save()


	$(this).parents("tr").remove()
}
$("#studentsTable").on("click", ".deleteButton", deleteData)

function updateData(){
	var studentId = $(this).attr("data-id");
	console.log(studentId)

	var query = {
		_id: studentId
	}
	var student = studentCollection.find(query)[0];

	$("#updateName").val(student.name);
	$("#updateAge").val(student.age);
	$("#updateClass").val(student.class);
	$("#updateSave").attr("data-id", studentId);

	$("#updateModal").modal('show');
}

$("#studentsTable").on("click", ".updateButton", updateData)

function updateSave(){
	var studentId = $(this).attr("data-id");
	var name = $("#updateName").val();
	var age =  $("#updateAge").val();
	var newClass =  $("#updateClass").val();
	var newStudent = {
	    name: name,
	    age: age,
	    class: newClass
	};
	studentCollection.updateById(studentId, newStudent);
	studentCollection.save();
	$("#updateModal").modal('hide');
}

$("#updateSave").on("click", updateSave);


function search(){
	var gtAge = $("#gtAge").val();
	console.log(gtAge);

	var selectedClasses = [];

	if( $("#aClassCheckbox").prop("checked") ){
		selectedClasses.push("A班");
	}
	if( $("#bClassCheckbox").prop("checked") ){
		selectedClasses.push("B班");
	}


	var students = studentCollection.find({
    	age: {
	        $gt: gtAge/1
	    },
	    class: {
	    	$in: selectedClasses
	    }
	});
	$("#studentsTable").find("tr").remove();
	for (var i = 0; i < students.length; i++) {
    	console.log(students[i]._id);
    	$("#studentsTable").append(createHTMLString(students[i]._id, students[i].name));
    }

}
$("#search").on("click", search);