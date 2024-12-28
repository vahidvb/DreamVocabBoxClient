<template>

        <div class="container">
            <div class="row text-center">
                <div class="col-12">
                    <img class="w-50" src="images/box.png">
                </div>
                <div class="col-12 mt-2">
                    <h3 class="fw-bolder">Dream Vocab Box</h3>
                </div>
            </div>
            <hr>
            <form v-show="itsLogin" @submit.prevent="handleLogin">
                <h3 class="text-center mb-4">Sign In</h3>
                <div class="mb-1">
                    <label for="username" class="form-label">UserName</label>
                    <input type="text" class="form-control" id="username" v-model="loginForm.username"
                        placeholder="UserName">
                </div>
                <div class="mb-1">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" v-model="loginForm.password"
                        placeholder="Password">
                </div>
                <button type="submit" class="btn btn-success w-100">Sign In</button>
                <button type="button" @click="register" class="btn btn-link px-0 text-start">Haven't you registered
                    yet?</button>
            </form>
            <form v-show="!itsLogin" @submit.prevent="handleRegister">
                <h3 class="text-center mb-4">Register</h3>
                <div class="mb-1">
                    <label for="username" class="form-label">UserName</label>
                    <input type="username" class="form-control" id="username" v-model="registerForm.username"
                        placeholder="Your unique username for login">
                </div>
                <div class="mb-1">
                    <label for="nickname" class="form-label">Name</label>
                    <input type="nickname" class="form-control" id="nickname" placeholder="What should we call you?"
                        v-model="registerForm.nickname">
                </div>
                <div class="mb-1">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" v-model="registerForm.email"
                        placeholder="Email for password recovery (optional)">
                </div>
                <div class="mb-1">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" v-model="registerForm.password"
                        placeholder="Password without rules, enter anything you want">
                </div>
                <button type="submit" class="btn btn-success w-100">Register</button>
                <button type="button" @click="login" class="btn btn-link px-0 text-start">I have an account.</button>
            </form>
            <hr>
            <button type="button" class="btn btn-secondary w-100" @click="handleRegisterAsGuest">Login as guest 😒
            </button>
        </div>

</template>
<script>
export default {
    name: 'LoginPage',
    components: {

    },
    data() {
        return {
            itsLogin: true,
            loginForm: {
                username: '',
                password: ''
            },
            registerForm: {
                username: '',
                nickname: '',
                email: '',
                password: ''
            }
        };
    },
    methods: {
        async handleLogin() {
            try {
                const response = await this.postRequest('Users', 'Login', this.loginForm);
                this.notyf.apiResult(response);
                if (response.IsSuccess) {
                    localStorage.setItem("token", response.Data.Token);
                    localStorage.setItem("nickname", response.Data.NickName);
                    document.location.href = "/Boxes";
                }
            } catch (error) {
                console.error(error);
            }
        },
        async handleRegister() {
            try {
                const response = await this.postRequest('Users', 'Register', this.registerForm);
                this.notyf.apiResult(response);
                if (response.IsSuccess) {
                    localStorage.setItem("token", response.Data.Token);
                    localStorage.setItem("nickname", response.Data.NickName);
                    document.location.href = "/Boxes";
                }

            } catch (error) {
                console.error(error);
            }
        },
        async handleRegisterAsGuest() {
            try {
                const response = await this.postRequest('Users', 'RegisterAsGuest');
                this.notyf.apiResult(response);
                if (response.IsSuccess) {
                    localStorage.setItem("token", response.Data.Token);
                    localStorage.setItem("nickname", response.Data.NickName);
                    document.location.href = "/Boxes";
                }
            } catch (error) {
                console.error(error);
            }
        },
        login() {
            this.itsLogin = true;
        },
        register() {
            this.itsLogin = false;
        }
    }
};

</script>