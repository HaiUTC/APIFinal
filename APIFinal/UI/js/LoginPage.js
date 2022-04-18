var app = new Vue({
    el: '#form1',
    data: function () {
        return {
            email: "",
            emailBlured: false,
            valid: false,
            isError: false,
            isSuccess: true,
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

        submit: async function () {
            this.validate();
            if (this.valid) {
                let data;
                this.isLoading = true;
                const url = 'https://localhost:44312/api/admin?email=' +
                    $('input').eq(0).val() + '&password=' + $('input').eq(1).val();
                await $.ajax({
                    url: url,
                    method: 'POST',
                    contentType: 'json',
                    dataType: 'json',
                    error: function (response) {
                    },
                    success: function (reponse) {
                        data = reponse;
                    }
                });
                this.isLoading = false;
                if (data == null) {
                    this.isError = true;
                }
                else {
                    this.isSuccess = true;
                    $('.toast').toast('show');
                    setTimeout(() => {
                        localStorage.setItem("admin", JSON.stringify(data));
                        window.location.href = '/';
                    }, 1500);
                    
                    
                }
            }
        }
    }
});

