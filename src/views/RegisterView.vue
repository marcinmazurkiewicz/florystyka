<template>
  <div class="w-full max-w-screen-sm mx-auto my-8">
    <div
      class="text-white my-12 px-8 pt-16 pb-8 border border-dark-gray md:rounded-2xl bg-dark-gray"
    >
      <header>
        <h1 class="text-center text-3xl pb-8">Zarejestruj się</h1>
        <p class="pb-8 text-justify">
          Dzięki założeniu konta masz możliwość zapisywania rozwiązanych testów
          oraz obserwowanie statystyk swoich odpowiedzi, dzięki czemu zobaczysz,
          nad jakimi zagadnieniami warto jeszcze popracować. Do założenia konta
          wystarczy dowolna nazwa użytkownika i hasło - nie zbieram maili ani
          żadnych danych osobowych. Konto możesz też w każdej chwili usunąć.
        </p>
      </header>
      <error-info v-if="responseStatus.isError">
        <span v-if="responseStatus.errors['recaptcha']">
          {{ responseStatus.errors["recaptcha"] }}
        </span>
        <span v-else>
          {{ responseStatus.errorMsg }}
        </span>
      </error-info>
      <div class="mt-8">
        <form>
          <text-input
            v-model="username"
            id="username"
            :error="responseStatus.errors['username']"
          >
            Nazwa użytkownika
          </text-input>
          <text-input
            v-model="password"
            id="password"
            type="password"
            :error="responseStatus.errors['password']"
          >
            Hasło
          </text-input>
          <text-input
            v-model="confirmPassword"
            id="password"
            type="password"
            :error="responseStatus.errors['password']"
          >
            Powtórz hasło
          </text-input>
          <recaptcha
            ref="recaptcha"
            @verify="getVerifyToken"
            :error="responseStatus.errors['captchaToken']"
          />
        </form>

        <button
          class="w-full bg-light-green my-8 p-3 text-dark-gray text-lg font-semibold border border-light-green
            rounded-xl hover:bg-dark-green hover:text-white"
          @click="register()"
        >
          Zarejestruj
        </button>
      </div>
    </div>
    <div id="recaptcha-badge"></div>
  </div>
</template>
<script lang="ts">
import TextInput from "@/components/custom_inputs/TextInput.vue";
import { useAuthorization } from "@/composables/useAuthorization";
import router from "@/router/index.ts";
import { ResponseStatus } from "@/types/ResponseStatus";
import ErrorInfo from "@/components/ErrorInfo.vue";
import { defineComponent, ref } from "vue";
import Recaptcha from "@/components/RecaptchaV2.vue";

export default defineComponent({
  name: "RegisterView",
  components: {
    ErrorInfo,
    TextInput,
    Recaptcha
  },
  setup() {
    const username = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const responseStatus = ref(ResponseStatus.ok());
    const { tryRegister, tryLogin } = useAuthorization();
    const recaptcha = ref();
    const captchaToken = ref("");

    const getVerifyToken = (response: string) =>
      (captchaToken.value = response);
    const register = async function() {
      tryRegister({
        username: username.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        captchaToken: captchaToken.value
      })
        .then(() => {
          return tryLogin({
            username: username.value,
            password: password.value
          });
        })
        .then(() => {
          router.push({ name: "DashboardView" });
        })
        .catch(error => {
          console.log(error);
          recaptcha.value.reset();
          responseStatus.value = error.responseStatus;
        });
    };

    return {
      username,
      password,
      confirmPassword,
      responseStatus,
      register,
      recaptcha,
      getVerifyToken
    };
  }
});
</script>
