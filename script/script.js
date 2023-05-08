"use strict";
const maand = Array('Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September','Oktober','November','December');
//ALS PAGINA GELADEN IS LAAD ALLE KLANTEN
$(document).ready(function(){
    loadCustomers();
});

//FUNCTIE ALERTBOX 
function alert(data){
    const container = document.querySelector(".navbarAlert");

    window.scrollTo(0, 0);
    container.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show w-100" role="alert">
            ${data}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    $('.alert').delay(5000).fadeOut('slow');
}



//LOAD ALL CUSTOMERS
function loadCustomers(){
    $.ajax({
        method: "GET",
        url: "./script/using/loadCustomers.php",
        dataType: "json",
        success: function(loadCustomers_data){
            //console.log(loadCustomers_data);
            displayCustomers(loadCustomers_data);
        },
        error: function(data, error){
            console.log(data);
            console.log(error);
        }
    });
}

// DISPLAY CUSTOMERS IN ACCORDIAN
function displayCustomers(data){
    let customerAccordianContainer = document.getElementById("customerAccordianContainer");
    customerAccordianContainer.innerHTML = "";
    
    data.forEach(element => {
        //console.log(element.klant_id);
        let data_bs_target = `collapseID${element.klant_id}`;
        let heading_arial_label = `headingID${element.klant_id}`;

        customerAccordianContainer.innerHTML += `
        <div class="accordion-item">

            <h2 class="accordion-header" id="${heading_arial_label}">
                <button class="accordion-button collapsed" data-customer-id="${element.klant_id}" type="button" data-bs-toggle="collapse" data-bs-target="#${data_bs_target}" aria-expanded="false" aria-controls="${data_bs_target}">
                    ID: ${element.klant_id} ${element.klant_naam} ${element.klant_achternaam}
                </button>
            </h2>

            <div id="${data_bs_target}" class="accordion-collapse collapse" aria-labelledby="${heading_arial_label}" data-bs-parent="#customerAccordianContainer">

                <div class="accordion-body" id="accordion-body-ID${element.klant_id}">
                    
                </div>
                
            </div>
        </div>
        `;
    });
}

//DOOR OP EEN KLANT TE KLIKKEN HAAL DIT FUNCTIE DATA OP VAN ALLE BEHANDELINGEN VAN KLANT
$(document).on('click', '.accordion-button', function(){
    const customer_id = $(this).data('customer-id');
    $.ajax({
        method: "POST",
        url: "./script/using/laodTreatments.php",
        dataType: "json",
        data: {"customer_id": customer_id},
        success: function(data){
            displayCustomerTreatments(data, customer_id);
            //console.log(data);
        },
        error: function(data, error){
            console.log(data);
            console.log(error);
        }
    });
});

//ALLE OPGEHAALDE DATA VAN BEHANDELINGEN WORDEN IN EEN CONTAINER EN IN EEN TABEL GEPLAATST
function displayCustomerTreatments(data, customer_id){
    let accordion_body = document.querySelector(`#accordion-body-ID${customer_id}`);
    accordion_body.innerHTML = '';

    if(data.length < 1){
        accordion_body.innerHTML = 
        `
            <button type="button" id="toevoeg_treatment_form_wrap_btn" style="margin: 20px;" class="btn btn-dark float-end" data-customer-id="${customer_id}" data-bs-toggle="modal" data-bs-target="#toevoeg_treatment_form_wrap_show">
                Behandeling toevoegen
            </button>
            <br/>Geen behandelingen gevonden
        `;
    }else{
        let treatmentsTableBody_name = `treatmentsTableID${customer_id}`;

        accordion_body.innerHTML = `
        <table class="table table-hover table-responsive table-sm">
            <button type="button" id="toevoeg_treatment_form_wrap_btn" style="margin: 20px;" class="btn btn-dark float-end" data-customer-id="${customer_id}" data-bs-toggle="modal" data-bs-target="#toevoeg_treatment_form_wrap_show">
                Behandeling toevoegen
            </button>
            
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Behandeling</th>
                    <th scope="col">Datum</th>
                    <th scope="col">Tijd</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <tbody id="${treatmentsTableBody_name}">

            </tbody>

        </table>  
        `;

        let treatmentsTableSelect = document.querySelector(`#${treatmentsTableBody_name}`);
        
        data.forEach(element => {
            let dataElement = JSON.stringify(element);
            
            let date = new Date(element.bezoek_tijd);
    
            let day = date.getDate();
            let month = maand[date.getMonth()];
            let year = date.getFullYear();
    
            let hours = date.getHours();
            let minutes = date.getMinutes();
            minutes = minutes < 10 ? '0' + minutes : minutes;
               
            let treatmentDay = day + " " + month + " " + year;
            let treatmentTime = hours + ":" + minutes;

            treatmentsTableSelect.innerHTML += `
                <tr>
                    <th scope="row">${element.bezoek_id}</th>
                    <td>${element.bezoek_behandeling}</td>
                    <td>${treatmentDay}</td>
                    <td>${treatmentTime}</td>
                    <td>
                        <button type="button" data-bs-toggle="modal" data-bs-target="#verwijder_form_wrap_show" data-element='${dataElement}' class="btn btn-danger float-end delete_treatment_modal">Verwijder</button>
                        <button type="button" data-bs-toggle="modal" data-bs-target="#bewerk_treatment_form_wrap_show" data-element='${dataElement}' class="btn btn-dark float-end change_treatment_modal">Bewerk</button>
                    </td>
                </tr>
            `;
        });
        
    }
}

//set id of customer to hidden input of adding treatment form
$(document).on('click', '#toevoeg_treatment_form_wrap_btn', function(){
    let customer_id = $(this).data("customer-id");
    $('#toevoeg_customer_id').val(customer_id);
    //console.log(customer_id);
});

//submit form add treatment geting data and saving it in database
$(document).on('submit', '#toevoeg_form_treatment', function(){
    let formData = $(this).serialize();
    //console.log(data);
    $.ajax({
        method: "POST",
        url: "./script/using/addTreatment.php",
        data: formData,
        success: function(data){
            loadCustomers();
            console.log(data);
            alert(data);
        },
        error: function(data, error){
            console.log(data);
            console.log(error);
        }
    });
});

//submit form update treatment info getting data and saving in database
$(document).on('submit', '#bewerk_treatment_form', function(){
    let formData = $(this).serialize();

    $.ajax({
        method: "POST",
        url: "./script/using/updateTreatment.php",
        data: formData,
        success: function(data){
            loadCustomers();
            //console.log(data);
            alert(data);
        },
        error: function(data, error){
            console.log(data);
            console.log(error);
        }
    });
});

//seting values to inputs of treatment to update it if needed
$(document).on('click', '.change_treatment_modal', function(){
    let data = $(this).data("element");
    //console.log(data);

    $("#bewerk_behandeling option:selected").text(data.bezoek_behandeling);
    $("#bewerk_datetime").val(data.bezoek_tijd);
    $("#bewerk_behandeling_id").val(data.bezoek_id);
    $("#bewerk_klant_id").val(data.klant_id);
});

//seting info of deleting treatment to be sure of deleting item (asking form)
$(document).on('click', '.delete_treatment_modal', function(){
    let data = $(this).data("element");
    //console.log(data);
            
    let date = new Date(data.bezoek_tijd);
    
    let day = date.getDate();
    let month = maand[date.getMonth()];
    let year = date.getFullYear();
    
    let hours = date.getHours();
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
               
    let treatmentDay = day + " " + month + " " + year;
    let treatmentTime = hours + ":" + minutes;

    let verwijder_body = document.querySelector('#verwijder_body');
    verwijder_body.innerHTML = `
        Behandeling verwijderen? <br />
        Klant ID: ${data.klant_id}<input type="hidden" value="${data.klant_id}" name="klant_id_del" id="klant_id_del"> <br />
        Bezoek ID: ${data.bezoek_id}<input type="hidden" value="${data.bezoek_id}" name="bezoek_id_del" id="bezoek_id_del"> <br />
        Behandeling: ${data.bezoek_behandeling} <br />
        Datum: ${treatmentDay} <br />
        Tijd: ${treatmentTime} <br />
    `;

});

//submit deleting form getting id's and deleting from database
$(document).on('submit', '#verwijder_form', function(){
    let formData = $(this).serialize();

    $.ajax({
        method: "POST",
        url: "./script/using/deleteTreatment.php",
        data: formData,
        success: function(data){
            loadCustomers();
            //console.log(data);
            alert(data);
        },
        error: function(data, error){
            console.log(data);
            console.log(error);
        }
    });
});

//submit new customer form geting data and saving in database
$(document).on('submit', '#voegtoe_klant_form', function(e){
    let formData = $(this).serialize();

    $.ajax({
        method: "POST",
        url: "./script/using/voegtoeKlant.php",
        data: formData,
        success: function(data){
            $("#voegtoe_firstname").val("");
            $("#voegtoe_lastname").val("");
            $("#voegtoe_tel").val("");   

            alert(data);
            loadCustomers();
        },
        error: function(data, error){ console.log(data); console.log(error);}
    });
});

//search customers in database
$(document).on('keyup', '#searchCustomers', function(){
    let inputVal = $(this).val();
    
    if(inputVal != null || inputVal != ""){
        $.ajax({
            method: "POST",
            url: "./script/using/searchCustomers.php",
            dataType: "json",
            data: {"like": inputVal},
            success: function(data){
                if(data.length > 0){
                    displayCustomers(data);
                }else{
                    $('#customerAccordianContainer').html("");
                    alert(`Er zijn geen klanten gevonden met naam ${inputVal}`);
                }
            },
            error: function(data, error){
                console.log(data);
                console.log(error);
            }
        });
    }else{
        loadCustomers();
    }
});
