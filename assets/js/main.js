        function setCookie(name, value, expirationHours) {
            const d = new Date();
            d.setTime(d.getTime() + (expirationHours * 60 * 60 * 1000));
            const expires = "expires=" + d.toUTCString();
            document.cookie = name + "=" + value + ";" + expires + ";secure;HttpOnly;SameSite=Strict;path=/";
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
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;secure;HttpOnly;SameSite=Strict;path=/";
        }

