var app = new Vue({
    el: '#form1',
    data: function () {
        return {
            email: "",
            emailBlured: false,
            valid: false,
            isError: false,
            password: "",
            passwordBlured: false,
            isLoading: false,
        }
    },

    methods: {

        validate: function () {
            this.emailBlured = true;
            this.passwordBlured = true;
            if (this.validEmail(this.email) && this.validPassword(this.password)) {
                this.valid = true;
            }
        },

        validEmail: function (email) {

            var re = /(.+)@(.+){2,}\.(.+){2,}/;
            if (re.test(email.toLowerCase())) {
                return true;
            }

        },

        validPassword: function (password) {
            if (password.length > 0) {
                return true;
            }
        },

        submit: function () {
            this.validate();
            if (this.valid) {
                this.isLoading = true;
                var url = 'https://localhost:44312/api/admin?email=' +
                    $('input').eq(0).val() + '&password=' + $('input').eq(1).val();
                $.ajax({
                    url: url,
                    method: 'POST',
                    contentType: 'json',
                    dataType: 'json',
                    error: function (response) {
                        alert("Server Error");
                    },
                    success: function (reponse) {
                        this.isLoading = false;
                        if (reponse == null) {
                            alert("Email(Usename) or Password not correct");
                        }
                        else {
                            alert("Login Successfully");
                            window.location.href = '/'
                            localStorage.setItem("admin", JSON.stringify(reponse));
                        }

                    }
                });
                
            }
        }
    }
});
