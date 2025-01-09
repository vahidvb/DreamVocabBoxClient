<template>
    <v-container class="container">
        <v-row class="d-flex justify-center">
            <v-col cols="12" class="d-flex justify-center">
                <v-img src="images/box.png" max-width="50%"></v-img>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
                <h3 class="fw-bolder">Dream Vocab Box</h3>
            </v-col>
        </v-row>

        <v-divider></v-divider>

        <!-- Login Form -->
        <v-form v-show="itsLogin" @submit.prevent="handleLogin">
            <h3 class="text-center mb-4">Sign In</h3>
            <v-text-field autofocus label="UserName" v-model="loginForm.username"></v-text-field>
            <v-text-field type="password" label="Password" v-model="loginForm.password"></v-text-field>
            <v-btn type="submit" block color="success" variant="flat" class="mb-3" prepend-icon="mdi-login">Sign
                In</v-btn>

            <button type="button" @click="register" class="btn btn-link px-0 text-start me-3">Haven't you registered
                yet?</button>

            <v-btn class="me-2 text-none" color="#4f545c" prepend-icon="mdi-account-plus" variant="flat"
                @click="register">
                Register
            </v-btn>
        </v-form>

        <!-- Register Form -->
        <v-form v-show="!itsLogin" @submit.prevent="handleRegister">
            <h3 class="text-center mb-4">Register</h3>

            <v-text-field v-model="registerForm.username" label="UserName" hint="Your unique username for login"
                persistent-hint outlined class="mb-3"></v-text-field>
            <v-text-field v-model="registerForm.nickname" label="Name" hint="What should we call you?" persistent-hint
                outlined class="mb-3"></v-text-field>
            <v-text-field v-model="registerForm.email" label="Email Address"
                hint="Email for password recovery (optional)" persistent-hint outlined type="email"
                class="mb-3"></v-text-field>
            <v-text-field v-model="registerForm.password" label="Password"
                hint="Password without rules, enter anything you want" persistent-hint type="password" outlined
                class="mb-3"></v-text-field>

            <v-btn type="submit" color="success" block class="mb-2" prepend-icon="mdi-account-plus">Register</v-btn>

            <button type="button" @click="login" class="btn btn-link px-0 text-start me-3">I have an account.</button>
            <v-btn class="me-2 text-none" color="#4f545c" prepend-icon="mdi-login" variant="flat"
                @click="login">Login</v-btn>
        </v-form>

        <!-- Divider for separation -->
        <v-row no-gutters class="mt-3">
            <v-col cols="3">
                <v-divider></v-divider>
            </v-col>
            <v-col cols="6" class="text-center">
                <v-label>Or continue with...</v-label>
            </v-col>
            <v-col cols="3">
                <v-divider></v-divider>
            </v-col>
        </v-row>

        <v-btn @click="handleRegisterAsGuest" block class="mb-3" color="secondary" prepend-icon="mdi-account-plus">Quick
            Register 😒</v-btn>
    </v-container>
</template>

<script>
import { useUserInfoStore } from '../stores/userInfoStore';

export default {
    name: 'LoginPage',
    components: {

    },
    data() {
        return {
            userInfoStore: useUserInfoStore(),
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
            const response = await this.postRequest('Users', 'Login', this.loginForm);
            this.notyf.apiResult(response);
            if (response.IsSuccess) {
                localStorage.setItem("token", response.Data.Token);
                localStorage.setItem("nickname", response.Data.NickName);
                localStorage.setItem("avatar", response.Data.Avatar);
                localStorage.setItem("email", response.Data.Email);
                localStorage.setItem("username", response.Data.UserName);
                this.userInfoStore.reloadValues();
                this.$router.push('/Boxes');
            }

        },
        async handleRegister() {
            try {
                const response = await this.postRequest('Users', 'Register', this.registerForm);
                this.notyf.apiResult(response);
                if (response.IsSuccess) {
                    localStorage.setItem("token", response.Data.Token);
                    localStorage.setItem("nickname", response.Data.NickName);
                    localStorage.setItem("avatar", response.Data.Avatar);
                    localStorage.setItem("email", response.Data.Email);
                    localStorage.setItem("username", response.Data.UserName);
                    this.userInfoStore.reloadValues();
                    this.$router.push('/Boxes');
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
                    localStorage.setItem("avatar", response.Data.Avatar);
                    localStorage.setItem("email", response.Data.Email);
                    localStorage.setItem("username", response.Data.UserName);
                    this.userInfoStore.reloadValues();
                    this.$router.push('/Boxes');
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