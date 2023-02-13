$(document).ready(function() {
    
    
    // filere by author name 
    $('#authorName').keyup(function(event){
        
        let name = $('#authorName').val();
        

        $.ajax({
            type: "POST",
            url: "/issue/filter-by-author",
            data: {
                name: name
            },
            success: function (response) {
                console.log(response);
                
                let result = response.data;
                let html  = ``;
                if(result.length > 0){
                    $('#project-issues').html('');
                
                for(let i = 0;i < result.length;i++ ){
                    html += `
                    <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        ${result[i].name}  &nbsp;<small class="float-end">Author: ${result[i].authorName}</small>
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                        <strong>${result[i].description}</strong>
                        </div>
                    </div>
                    </div>
                
                    </div>
                `;
               
                }
                $('#project-issues').html(html);


                }
                  
            },
            error: function (error) {
                console.log(error);
            }
        });
    })
    //filter by author name code ends here
    //array for storing value of labels and then send it to server
    let labels = [];
    $("input[type='checkbox']").click(function(){
        if($(this).is(":checked")){
            labels.push($(this).val());
        }else if($(this).is(":not(:checked)")){
            labels.pop($(this).val());
        }

        if(labels.length==0){
            //call a function to reload all the default data to the page
          
            let value = $('.checkLabel').attr('data-value');
         
            reloadDefault(value);
        }

        $.ajax({
            type: "POST",
            url: "/issue/filter-by-labels",
            data: {
                labels: labels
            },
            success: function (response) {
                
                let result = response.data;
                let html=``;
                for(let i=0;i<result.length;i++){
                    html += `
                        <div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            ${result[i].name}  &nbsp;<small class="float-end">Author: ${result[i].authorName}</small>
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                            <strong>${result[i].description}</strong>
                            </div>
                        </div>
                        </div>
                    
                        </div>
                    `;
                }
                $('#project-issues').html(html);
               
            },
            error: function (error) {
                console.log(error);
            }
          
        });
    });


            

    //filter by title and description 
    $('#searchByTitleAndDesc').click(function(){
       
        let title = $('#issueTitle').val();
        let description = $('#issueDescription').val();
       
        //check if values are there 

        if(title.length == 0 || description.length == 0){
            alert('Please enter title or description');
            return ;
        }
        //now ajax request post
        $.ajax({

            type: "POST",
            url: "/issue/filter-by-title-and-description",
            data: {
                title: title,
                description: description
            },
            success: function (response) {
                
                console.log(response);
                let html=``;


                alert('data submitted');
                let result = response.data;
                for(let i=0;i<result.length;i++){
                    html+= `
                    <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        ${result[i].name}  &nbsp;<small class="float-end">Author: ${result[i].authorName}</small>
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                        <strong>${result[i].description}</strong>
                        </div>
                    </div>
                    </div>
                
                    </div>
                    `;
                }

                $('#project-issues').html(html);
            },
            error: function (error) {
                console.log(error);
            }       
        });

    });
    //filter by title and description ends 


    //reset filter button
    $('#resetFilter').click(function(){
        $('#project-issues').html('');
        let value = $(this).data('value');
        reloadDefault(value);
       
    });
    //reset filter button code ends

    function reloadDefault(value){
        let html = ``;
        
        $.ajax({
            type: "GET",
            url: `/project/view-project/${value}`,
            success: function (response) {
                console.log(response);
                let result = response.data.issues;
                for(let i=0;i<result.length;i++){
                    html += `
                    <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        ${result[i].name}  &nbsp;<small class="float-end">Author: ${result[i].authorName}</small>
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                        <strong>${result[i].description}</strong>
                        </div>
                    </div>
                    </div>
                
                    </div>
                `;
                }
                $('#project-issues').html(html);
                
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
});

