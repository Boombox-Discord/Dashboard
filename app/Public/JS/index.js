const cookies = new UniversalCookie();

var app = new Vue({
    el: "#nav",
    data() {
        return {
            profileURL: cookies.get('imgurl'),
            username: cookies.get('username'),
            loggedIn: cookies.get('loggedIn') || false
        }
    }
})