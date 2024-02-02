<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "https://www.w3.org/TR/html4/loose.dtd">
    <html>

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>jQuery, Ajax and Servlet/JSP integration example</title>
    </head>

    <body>

        <form>
            Enter Your User Name: <input type="text" id="userName" value="Mihalich"/><br><br>
            Enter Your First Name: <input type="text" id="firstName" value="Mihail"/><br><br>
            Enter Your Last Name: <input type="text" id="secondName" value="Muzhikovskiy"/><br><br>
            Enter Your Email: <input type="text" id="email" value="dedpihto@hto.ru"/><br><br>
            Enter Your Phone Number: <input type="text" id="phoneNumber" value="+79123456789"/><br><br>
            Enter Your Password: <input type="text" id="password" value="QWERTY1234"/><br><br>
            Re-Enter Your Password: <input type="text" id="repassword" value="QWERTY1234"/><br><br>
        </form>
        <br>
        <br>

        <strong>Ajax Response</strong>:

        <div id="ajaxGetUserServletResponse"></div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <script>
            $(document).ready(function () {
                $("button").click(function () {
                    var userName = $('#userName').val();
                    var email = $('#email').val();
                    var firstName = $('#firstName').val();
                    var password = $('#password').val();
                    var secondName = $('#secondName').val();
                    var phoneNumber = $('#phoneNumber').val();
                    $.ajax({
                        url: "http://localhost:8083/registration",
                        type: "post",
                        dataType: "json",
                        headers: { 'Content-Type': 'application/json', 'Accept': '*/*' },
                        //contentType: "application/json",
                        data: JSON.stringify ({
                            email: email,
                            firstName: firstName,
                            password: password,
                            phoneNumber: phoneNumber,
                            secondName: secondName,
                            username: userName
                        }),
                        success: function (data, status) {
                            console.log(data);
                            alert("Data: " + data.JSON.stringify + "\nStatus: " + status);
                        },
                        statusCode: {
                            500: function (data, status) {
                                alert("Status code 500, hello epta")
                                // реализовать далее логику работы с кодами ответа и фронтом
                            }
                        }
                    });
                });
            });
        </script>
        </head>

        <body>

            <button>Send an HTTP POST request to a page and get the result back</button>

        </body>

    </html>