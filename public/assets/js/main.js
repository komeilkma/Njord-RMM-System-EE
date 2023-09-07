        function setCookie(name, value, expirationHours) {
            const d = new Date();
            d.setTime(d.getTime() + (expirationHours * 60 * 60 * 1000));
            const expires = "expires=" + d.toUTCString();
            console.log(name + "=" + value + ";" + expires + ";secure;SameSite=Strict;path=/")
            document.cookie = name + "=" + value + ";" + expires + ";secure;SameSite=Strict;path=/";
        }

        function getCookie(name) {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + "=")) {
                    return cookie.substring(name.length + 1);
                }
            }
            return null;
        }



        function deleteCookie(name) {
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;secure;SameSite=Strict;path=/";
        }


       function login () {
            const username = document.getElementById("userName").value;
            const password = document.getElementById("Password").value;

            const apiUrl = "http://localhost:8080/api/v1/custom/authenticate";
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            };

            fetch(apiUrl, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.token) {
                       // console.log("Token received: " + data.token);
                       setCookie("token", data.token, 1)
                       window.location.href = "/Dashboard";
                    } else {
                        Swal.fire(
                            'نام کاربری یا رمز ورود اشتباه است',
                            'ورودی های خود را بررسی و مجدد وارد شوید',
                            'error'
                          )
                    }
                })
                .catch(error => {
                    Swal.fire(
                        'نام کاربری یا رمز ورود اشتباه است',
                        'ورودی های خود را بررسی و مجدد وارد شوید',
                        'error'
                      )
                });
        }

