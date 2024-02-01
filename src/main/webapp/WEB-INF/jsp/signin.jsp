<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "https://www.w3.org/TR/html4/loose.dtd">
    <html>

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>jQuery, Ajax and Servlet/JSP integration example</title>

        <script src="https://code.jquery.com/jquery-1.10.2.js" type="text/javascript"></script>
        <script src="js/app-ajax.js" type="text/javascript"></script>
    </head>

    <body>

        <form>
            Enter Your Name: <input type="text" id="userName" />
        </form>
        <br>
        <br>

        <strong>Ajax Response</strong>:
        <div id="ajaxGetUserServletResponse"></div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <script>
            $(document).ready(function () {
                $("button").click(function () {
                    $.post("http://localhost:8083/registration",
                        {
                            email: "MyMan@man.ru",
                            firstName: "Vova",
                            password: "777VASYA",
                            phoneNumber: "+79123456789",
                            secondName: "PUPINS",
                            username: "KOROLSOBAK"
                        },
                        function (data, status) {
                            alert("Data: " + data + "\nStatus: " + status);
                        });
                });
            });
        </script>
        </head>

        <body>

            <button>Send an HTTP POST request to a page and get the result back</button>

        </body>

    </html>