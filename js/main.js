/*
<!—
===========================================
Student Name: DEVI VARA PRASAD BOMMIDI
Solution for Info 600 - Assignment 3
===========================================
-->
*/
//Javascript code to create, Load, and delete data from user interface for Student Record Management/Entry
$(document).ready(function()
  {
    $("#loadData").click(function()
     {
     $("#pullData").empty();
      $.getJSON("/users", function(result)
       {
       $.each(result, function(i, f)
         {
         var time = new Date($.now());

         for(var i = 0; i < f.length; i++)
         {

         $("#pullData").append(time.getHours() + " : " + time.getMinutes() + ", " + f[i].fullName + ", " + f[i].major + ",  " + f[i].startYear + " " + "<button value='" + f[i].id + "' id ='remove'>Delete</button>" + "<br>" );
          
          }

        });

     });

  });

});

//AJAX call to add data
  $(document).ready(function()
    {
    $("#addRec").click(function()
     {
     const startYear= document.getElementById('startYear').value;
     if (startYear <= 2000) 
     {
     
     window.alert('Incorrect year: ' + startYear)

     return
     }

    $.ajax({

        method: 'POST',
        url: '/users/',
        type: 'POST',
        cache: false,

        data: 
        {

        fullName:$('#fullName').val(),
        major:$('#major').val(),
        startYear: $('#startYear').val(),
          
        }
        
      })
      
   });

 });


//AJAX call to remove data        
$(document).on("click","#remove",function()
  {
  const id= $(this).val(); 
  console.log(id);

$.ajax({

        method: 'DELETE',
        url: '/user/'+id,
        type: '',
        cache: false,

       })

//Method to call restore function
      reStore();

      });
    
//Function to restore data
function reStore()

      {

      document.getElementById("pullData").innerHTML=" ";

      $.getJSON("/users", function(result)
      {
      $.each(result, function(i, f)
       {
       var time = new Date($.now());
       for(var i = 0;i < f.length;i++)
       {
       
       $("#pullData").append(time.getHours() + " : " + time.getMinutes() + ", " + f[i].fullName + ", " + f[i].major + ", " + f[i].startYear + " "+ "<button value='" + f[i].id+ "' id ='remove'>Delete</button>" +"<br>");
        
         }

      });

    });

 }
         
      
    