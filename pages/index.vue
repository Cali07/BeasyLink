<template>
  <v-container class="pa-0 login-shell" fluid>
    <div class="login-hero d-flex align-center justify-center">
      <v-card class="pa-7 pa-sm-10 login-card" elevation="12" max-width="520">
        <div class="brand-row d-flex align-center justify-space-between">
          <div>
            <p class="eyebrow text-uppercase mb-2">Milaliso Studio</p>
            <h1 class="headline mb-2">Admin login</h1>
            <p class="subhead mb-0">
              Curating African art, beadwork, and heritage craft for modern
              spaces.
            </p>
          </div>
          <v-avatar color="primary" size="48">
            <v-icon color="white">mdi-brush</v-icon>
          </v-avatar>
        </div>

        <v-alert
          v-if="errorMessage"
          class="mt-5"
          color="error"
          variant="tonal"
          icon="mdi-alert-circle"
        >
          {{ errorMessage }}
        </v-alert>

        <v-form class="mt-6" @submit.prevent="handleLogin">
          <v-text-field
            v-model="username"
            label="Username"
            variant="outlined"
            density="comfortable"
            :disabled="loading"
            prepend-inner-icon="mdi-account"
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            variant="outlined"
            density="comfortable"
            class="mt-3"
            :disabled="loading"
            prepend-inner-icon="mdi-lock"
          />

          <div class="d-flex align-center justify-space-between mt-5">
            <span class="hint text-body-2">Use admin / admin</span>
            <v-btn type="submit" color="primary" :loading="loading">
              Enter studio
            </v-btn>
          </div>
        </v-form>

        <v-divider class="my-6" />

        <div class="d-flex align-center justify-space-between">
          <v-chip color="primary" variant="outlined" size="small">
            Heritage craft
          </v-chip>
          <span class="text-caption text-medium-emphasis">
            Beadographer access only
          </span>
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Work+Sans:wght@400;500;600&display=swap");

.login-shell {
  --clay: #9f5b2f;
  --sun: #e3b152;
  --forest: #2f4b3f;
  --sand: #f7f1e6;
  min-height: 100vh;
}

.login-hero {
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(227, 177, 82, 0.35), transparent 55%),
    radial-gradient(circle at 80% 20%, rgba(159, 91, 47, 0.25), transparent 45%),
    linear-gradient(135deg, #f9f4ec 0%, #f2e7d5 45%, #f7f1e6 100%);
  position: relative;
  overflow: hidden;
}

.login-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    135deg,
    rgba(47, 75, 63, 0.08) 0,
    rgba(47, 75, 63, 0.08) 12px,
    transparent 12px,
    transparent 28px
  );
  opacity: 0.35;
  pointer-events: none;
}

.login-card {
  position: relative;
  z-index: 1;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
  box-shadow: 0 24px 50px rgba(47, 75, 63, 0.18);
  font-family: "Work Sans", "Segoe UI", sans-serif;
}

.brand-row {
  gap: 16px;
}

.headline {
  font-family: "Cormorant Garamond", "Times New Roman", serif;
  font-size: 32px;
  color: var(--forest);
}

.subhead {
  color: rgba(47, 75, 63, 0.75);
}

.eyebrow {
  font-size: 12px;
  letter-spacing: 0.2em;
  color: var(--clay);
  font-weight: 600;
}

.hint {
  color: rgba(47, 75, 63, 0.7);
}
</style>

<script>
export default {
  name: "AdminLoginPage",
  data() {
    return {
      username: "",
      password: "",
      loading: false,
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      this.errorMessage = "";
      if (!this.username || !this.password) {
        this.errorMessage = "Enter your username and password.";
        return;
      }

      this.loading = true;
      const isValid = this.username === "admin" && this.password === "admin";
      this.loading = false;

      if (!isValid) {
        this.errorMessage = "Use the admin credentials to continue.";
        return;
      }

      this.$router.push("/beadographer");
    },
  },
};
</script>
