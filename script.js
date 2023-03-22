const cardHolder = document.getElementById('cardHolder');
const cardNumber = document.getElementById('cardNumber');
const expDateMM = document.getElementById('expDateMM');
const expDateYY = document.getElementById('expDateYY');
const CVC = document.getElementById('CVC');

const confirmButton = document.getElementById('confirmButton');
const continueButton = document.getElementById('continueButton');
const cardNumberError = document.getElementById('cardNumberError');

const form = document.getElementById('form');

form.addEventListener('input', inputHandle);
form.addEventListener('submit', controlSubmit);
continueButton.addEventListener('click', continueLoop);

onload = function() {
  document.getElementById('cardNumber').oninput = function() {
    this.value = cc_format(this.value)
  }
}


// Make card number input with number only
function checkNumber(event) {
  var aCode = event.which ? event.which : event.keyCode;
  if (aCode > 31 && (aCode < 48 || aCode > 57)){
    cardNumberError.innerText = "Wrong format, numbers only";
    return false;
  }else{
  cardNumberError.innerText = "";
    return true;
  }
}

// for card number format,  a space every 4 character and 16 number limitation
  function cc_format(value) {

    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || '';
    var parts = [];
      for (i=0, len=match.length; i<len; i+=4) {

        parts.push(match.substring(i, i+4));
        
      }
      if (parts.length) {
      
        return parts.join(' ');
        
      } else {
      
        return value;
      }
    }

// Input limitation for Dates and CVC
    function inputLimit(event)
    {
      if(event.target.id === 'expDateMM' || event.target.id === 'expDateYY' ){
        var max_chars = 1;
      }else{
        var max_chars = 2;
      }
        if(event.target.value.length > max_chars) {
            event.target.value = event.target.value.substr(0, max_chars);

        }
    }


// adding value from input on card, dynamiclly
  function inputHandle (e){
    var inputId = e.target.id;
    var value = e.target.value;
    var inputText = document.getElementById(inputId+'Text');
    inputText.innerText = value;
  }
  


// Control every input, if all input ar filled and ok from control, then change <Div>
    function controlSubmit(info){
      info.preventDefault();
      var cardHolderCheck = false;
      var cardNumberCheck = false;
      var expDateMMCheck = false;
      var expDateYYCheck = false;
      var CVCCheck = false;
      const formData = [...form.elements].reduce((r,{id,value}) => (value && (r[id]=value),r),{});
      if(formData?.cardHolder !== undefined){
        document.getElementById('cardHolderError').innerText = "";
        cardHolderCheck = true;
        
      }else{
        document.getElementById('cardHolderError').innerText = "Can't be Blank";
        cardHolderCheck = false;
      };
      if(formData?.cardNumber !== undefined){
        if (formData.cardNumber.length < 19){
          document.getElementById('cardNumberError').innerText = "Wrong Format";
          cardNumberCheck = false;
        }else{
          document.getElementById('cardNumberError').innerText = "";
          cardNumberCheck = true;
        }
      }else{
        document.getElementById('cardNumberError').innerText = "Can't be Blank";
        cardNumberCheck = false;
      }
      if(formData?.expDateMM !== undefined){
        if(formData.expDateMM.length <2){
          document.getElementById('expDateMMError').innerText = "Wrong Format";
        expDateMMCheck = false;
        }else{
          document.getElementById('expDateMMError').innerText = "";
          expDateMMCheck = true;
        } 
      }else{
        document.getElementById('expDateMMError').innerText = "Can't be Blank";
        expDateMMCheck = false;
      }
      if(formData?.expDateYY !== undefined){
        if(formData.expDateYY.length < 2){
          document.getElementById('expDateYYError').innerText = "Wrong Format";
          expDateMMCheck = false;
        }else{
          document.getElementById('expDateYYError').innerText = "";
          expDateYYCheck = true;
        }
      }else{
        document.getElementById('expDateYYError').innerText = "Can't be Blank";
        expDateYYCheck = false;
      }
      if(formData?.CVC !== undefined){
        if(formData.CVC.length < 3){
          document.getElementById('CVCError').innerText = "Wrong Format";
          expDateMMCheck = false;
        }else{
          document.getElementById('CVCError').innerText = "";
          CVCCheck = true;
        } 
      }else{
        document.getElementById('CVCError').innerText = "Can't be Blank";
        CVCCheck = false;
      }

      if(cardHolderCheck === true &&
         cardNumberCheck === true &&
         expDateMMCheck === true &&
         expDateYYCheck === true &&
         CVCCheck === true){
          document.getElementById('form').style.display = "none";
          document.getElementById('completedStat').style.display = "grid";
         }else{
          document.getElementById('form').style.display = "flex";
          document.getElementById('completedStat').style.display = "none";
         }
    }

// on click on "Continue" button, swap to form again
function continueLoop(){
  document.getElementById('form').style.display = "flex";
  document.getElementById('completedStat').style.display = "none";
  window.location.reload();
}