
$(document).ready(function() {
    let valuePair = {};
    $('#issueLabel').keydown(function() {
        $('#suggestion').empty();
        let value = $(this).val();
        
        $.ajax({
            url: 'http://localhost:8000/labels/get-suggestions',
            type: 'POST',
            data: { 
                label: value
            },
            success: function(data) {
                let result = data;
                let html = ``;
                for(let i = 0;i < result.length;i++){
                    html += `<a href="#${result[i]._id}" data-value="${result[i]._id}" data-id="${result[i].name}"  class="suggestedResultLinks"><li class="list-group-item">${result[i].name}</li></a>`;
                }
                html +=``;                
                $('#suggestion').append(html);
                
            },
            error: function(err) {
                console.log(err);
            }
        });   

        
    });

    $('.suggestion-result').click(function(e){
        let target = e.target.className;
        
        if(target == 'list-group-item'){
            e.preventDefault();
            pickFromSuggestedList();
        }
        
        // console.log('clicked');

        // alert($('.suggest'));
    });

    

    $('#buttonAddLabel').click(function(){
        
        
        let value = $('#issueLabel').val();

        $.ajax({
            url: 'http://localhost:8000/labels/get-suggestions',
            type: 'POST',
            data: {
                label: value
            },
            success: function(data) {
                    //if no record is found I will simply add that to the object
                    if(data.length==0){
                        if(!valuePair.hasOwnProperty(value)){
                            console.log(data);
                            alert('No Record found');
                            valuePair[value] = value;
                            console.log(valuePair);
                            
                            renderKey();
                        }
                       
                    }else{
                        // here for the rest of process
                        console.log(data[0]._id);
                        let id = data[0]._id;
                        let name = value;
                        //alert(data);
                        if(!valuePair.hasOwnProperty(id)){
                            console.log(data);
                            
                            valuePair[value] = name;
                            console.log(valuePair);
                            
                            renderKey();
                        }
                    }
                   
                
                
            },
            error: function(err) {
                console.log(err);
            }   

        });        
        $('#suggestion').empty();

    });

    function pickFromSuggestedList(){
        let value = $('.suggestedResultLinks').attr('data-value');
        let name = $('.suggestedResultLinks').attr('data-id');
        $('#suggestion').empty();
           
            
            if(!valuePair.hasOwnProperty(value)){
                
                
                //add key to object
                valuePair[value] = name;
            }
            
            
            
            renderKey();
    }

    function renderKey(){
        let hiddenFields = ``;
      
        let text = `Selected Labels are : `;
        for(let key in valuePair){
            text += `${valuePair[key]}  <small class="d-md-inline"><button class="removeButton"  data-value="${key}" > x </button></small> `;
            //add hidden input fields
            hiddenFields += `<input type="hidden" name="labels[]" value="${key}">`;
                
           
        }
        $('#hiddenDiv').html(hiddenFields);
        $('#showSelectedLabels').html(text);
        // $('#issueLabel').attr('value','');
        $('#issueLabel').val('');
    }

   $('#showSelectedLabels').on('click','.removeButton',function(){
        let value = $(this).attr('data-value');
        delete valuePair[value];
        renderKey();
   });
   
   
    
});