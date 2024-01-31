<!DOCTYPE html>
<html>
<body>

<h2>HTML Forms</h2>

<BASE_URL = "http://server_url/" // Your REST interface URL goes here

$(".postcode-input button").click(function () {
    var postcode = $(this).parents(".postcode-input")
        .children("input").val();
    // First do some basic validation of the postcode like
    // correct format etc.
    if (!validatePostcode(postcode)) {
        alert("Invalid Postal Code, please try again");
        return false;
    }
    var finalUrl = BASE_URL += "?postcode=" + postcode; 
    $.ajax({
        url: finalUrl,
        cache: false,
        success: function (html) {
            // Parse the recieved data here.
            console.log(html);
        }
    });
});
/>

<form action="/registration">
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname" value="Ivan"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname" value="Ivanov"><br><br>
  <label for="lname">Phone nubmer:</label><br>
  <input type="text" id="phone" name="phone" value="+79123456789"><br><br>
  <label for="lname">Email:</label><br>
  <input type="text" id="email" name="email" value="example@example.ru"><br><br>
  <label for="lname">Password:</label><br>
  <input type="text" id="pass" name="pass" value=""><br><br>
  <label for="lname">Password again:</label><br>
  <input type="text" id="passagain" name="passagain" value=""><br><br>
  <input type="submit" value="Submit">
</form> 

<div class="postcode-input">
    <input type="text" maxlength="6">
    <button type="submit"></button>
</div>

<p>If you click the "Submit" button, the form-data will be sent to a page called "/registration".</p>

</body>
</html>
