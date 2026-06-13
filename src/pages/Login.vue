<template>

    <v-container class="container">
        <v-row class="d-flex justify-center">
            <v-col cols="12" class="d-flex justify-center">
                <v-img src="images/icons/icon-512x512.png" max-width="50%"></v-img>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
                <h3 class="fw-bolder">{{ $t('app.title') }}</h3>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center mb-2">
            <v-menu>
                <template #activator="{ props }">
                    <v-btn variant="text" v-bind="props">
                        🌐 {{ lang.currentLangTitle }}
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item @click="changeLang('en-GB')" title="English" />
                    <v-list-item @click="changeLang('fa-IR')" title="فارسی" />
                    <v-list-item @click="changeLang('ar-SA')" title="العربية" />
                    <v-list-item @click="changeLang('tr-TR')" title="Türkçe" />
                    <v-list-item @click="changeLang('ru-RU')" title="Русский" />
                    <v-list-item @click="changeLang('hi-IN')" title="हिन्दी" />
                    <v-list-item @click="changeLang('zh-CN')" title="中文" />
                    <v-list-item @click="changeLang('fr-FR')" title="Français" />
                    <v-list-item @click="changeLang('de-DE')" title="Deutsch" />
                    <v-list-item @click="changeLang('es-ES')" title="Español" />
                </v-list>
            </v-menu>
        </v-row>


        <v-divider></v-divider>

        <!-- Login Form -->
        <v-form v-show="itsLogin" @submit.prevent="handleLogin">
            <h3 class="text-center mb-4">{{ $t('pages.login.signInTitle') }}</h3>

            <v-text-field autofocus :label="$t('pages.login.username')" v-model="loginForm.username">
            </v-text-field>

            <v-text-field type="password" :label="$t('pages.login.password')" v-model="loginForm.password">
            </v-text-field>

            <v-btn type="submit" block color="success" variant="flat" class="mb-3" prepend-icon="mdi-login">
                {{ $t('pages.login.signInBtn') }}
            </v-btn>

            <button type="button" @click="register" class="btn btn-link px-0 text-start me-3">
                {{ $t('pages.login.noAccount') }}
            </button>

            <v-btn class="me-2 text-none" color="#4f545c" prepend-icon="mdi-account-plus" variant="flat"
                @click="register">
                {{ $t('pages.login.registerLink') }}
            </v-btn>
        </v-form>

        <!-- Register Form -->
        <v-form v-show="!itsLogin" @submit.prevent="handleRegister">
            <h3 class="text-center mb-4">{{ $t('pages.login.registerTitle') }}</h3>

            <v-text-field v-model="registerForm.username" :label="$t('pages.login.username')"
                :hint="$t('pages.login.usernameHint')" persistent-hint outlined class="mb-3">
            </v-text-field>

            <v-text-field v-model="registerForm.nickname" :label="$t('pages.login.nickname')"
                :hint="$t('pages.login.nicknameHint')" persistent-hint outlined class="mb-3">
            </v-text-field>

            <v-text-field v-model="registerForm.email" :label="$t('pages.login.email')"
                :hint="$t('pages.login.emailHint')" persistent-hint outlined type="email" class="mb-3">
            </v-text-field>

            <v-text-field v-model="registerForm.password" :label="$t('pages.login.password')"
                :hint="$t('pages.login.passwordHint')" persistent-hint type="password" outlined class="mb-3">
            </v-text-field>

            <v-btn type="submit" color="success" block class="mb-2" prepend-icon="mdi-account-plus">
                {{ $t('pages.login.registerBtn') }}
            </v-btn>

            <button type="button" @click="login" class="btn btn-link px-0 text-start me-3">
                {{ $t('pages.login.haveAccount') }}
            </button>

            <v-btn class="me-2 text-none" color="#4f545c" prepend-icon="mdi-login" variant="flat" @click="login">
                {{ $t('pages.login.signInTitle') }}
            </v-btn>
        </v-form>

        <!-- Divider for separation -->
        <v-row no-gutters class="mt-3">
            <v-col cols="3">
                <v-divider></v-divider>
            </v-col>
            <v-col cols="6" class="text-center">
                <v-label>{{ $t('pages.login.orContinueWith') }}</v-label>
            </v-col>
            <v-col cols="3">
                <v-divider></v-divider>
            </v-col>
        </v-row>

        <v-btn @click="handleRegisterAsGuest" block class="mb-3" color="secondary"
            prepend-icon="mdi-account-arrow-right">
            {{ $t('pages.login.guestRegister') }}
        </v-btn>
    </v-container>
</template>


<script>
import { useUserInfoStore } from '@/stores/userInfoStore';
import { useLangStore } from '@/stores/langStore'

export default {
    name: 'LoginPage',
    components: {

    },
    setup() {
        const lang = useLangStore()
        return { lang }
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
        changeLang(lang) {
            this.lang.applyLanguage(lang, this.$i18n, this.$vuetify)
        },

        async handleLogin() {
            const response = await this.postRequest('Users', 'Login', this.loginForm);
            this.notyf.apiResult(response);
            if (response.IsSuccess) {
                localStorage.setItem("token", response.Data.Token);
                localStorage.setItem("nickname", response.Data.NickName);
                localStorage.setItem("avatar", response.Data.Avatar);
                localStorage.setItem("username", response.Data.UserName);
                localStorage.setItem("boxscenario", response.Data.BoxScenario);
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
                    localStorage.setItem("username", response.Data.UserName);
                    localStorage.setItem("boxscenario", response.Data.BoxScenario);

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
                    localStorage.setItem("username", response.Data.UserName);
                    localStorage.setItem("boxscenario", response.Data.BoxScenario);
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