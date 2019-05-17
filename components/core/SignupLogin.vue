<template>
  <div class="modal-card" style="width:auto;" @keyup.enter="enterWasPressed">
      <header class="modal-card-head" style="justify-content:center;background-color:rgb(241,241,241)">
      <!--  <img class="mb-5" style="position:absolute;top:10%;" src="../../assets/circle-Spiel.png" height="51" width="51">  -->
        <div class="columns is-centered pt-4">
            <div class="column mx-auto has-text-centered">
              <p v-if="isSignup" class="is-size-4 has-text-weight-bold">
                Sign up
              </p>
              <p v-else class="is-size-4 has-text-weight-bold">
                Log in
              </p>

              <p v-if="isSignup && !needsConfirm" style="white-space: pre">By signing up, you are agreeing to our
<a @click="openTerms">Terms of Service</a> and our <a @click="openPrivacyPolicy">Privacy Policy</a>
              </p>
            </div>
        </div>
      </header>
      <div v-if="!needsConfirm">
        <section class="modal-card-body pa-4" style="background-color:rgb(241,241,241)">
          <b-field label="Email" type="is-blue">
            <b-input v-model.trim="email"
                     placeholder="jondoe@email.com"
                     expanded
                     >
            </b-input>
          </b-field>
          <b-field label="Password" type="is-blue">
            <b-input v-model.trim="password"
               placeholder="Password"
               expanded
               type="password"
               password-reveal>
            </b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot" style="justify-content:flex-end;background-color:rgb(241,241,241)">
          <v-btn v-if="isSignup" color="#135bb0" class="has-text-white" @click="signUpUser">
            Sign Up
          </v-btn>
          <v-btn v-else color="#135bb0" class="has-text-white" @click="loginUser">
            Login
          </v-btn>
        </footer>
      </div>
      <div v-else>
        <section class="modal-card-body">
          <div class="has-text-centered">
            <span>
              A confirmation code has been sent to your email,
              </br> please enter it here.</br></br>
            </span>
          </div>
          <b-field horizontal label="Confirm">
            <b-input v-model="code"
               placeholder="Code"
               expanded>
            </b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot" style="justify-content:flex-end;">
          <button type="button" class="button is-blue" @click="confirmCode">Confirm</button>
        </footer>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { toast } from "bulma-toast";

export default {
  name: 'SignupLogin',
  props: {
    isSignup: {
      type: Boolean
    }
  },
  data() {
    return {
      email:        '',
      password:     '',
      code:         '',
      enterPressed: false
    };
  },
  watch: {
    enterPressed(newValue) {
      if (newValue) {
        console.log('here')
        if (this.isSignup){
          this.signUpUser();
        } else {
          this.loginUser();
        }
      }
    }
  },
  computed: {
    ...mapState({
      needsConfirm: state => state.user.needsConfirm,
      storedEmail:  state => state.user.email,
      storedPass:   state => state.user.password,
      userError:    state => state.user.userError
    }),
  },
  methods: {
    enterWasPressed() {
      console.log('here')

      if (this.isSignup){
        this.signUpUser();
      } else {
        this.loginUser();
      }
    },
    loginUser() {
      if ((this.email !== '' || this.password !== '')) {
        const creds = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('user/login', creds)
          .then(
            result => {
              this.$store.dispatch('user/getAccountDetails').then(() => {
                this.$parent.close()
              });
            },
            error => {
              if (this.process.client) {
                toast({
                  message: `Error: ${error.message}`,
                  type: "is-danger",
                  dismissible: true,
                  position: "top-center"
                });

                if (error.code === 'UserNotConfirmedException'){
                  this.$store.dispatch('user/userNeedsConfirm', creds);
                }
              }
            });
      }
    },
    signUpUser() {
      if (this.email !== '' || this.password !== '') {
        const creds = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('user/signUp', creds);
      }
    },
    confirmCode() {
      const confirm = {
        email: this.storedEmail,
        code: this.code
      }
      this.$store.dispatch('user/confirmCode', confirm);

      const creds = {
        email: this.storedEmail,
        password: this.storedPass
      }
      this.$store.dispatch('user/login', creds)
        .then( () => {
          this.$store.dispatch('user/getAccountDetails').then(() => {
            this.$parent.close()
          });
        })
    },
    openTerms() {
      const routeData = this.$router.resolve(
        {
          name: 'terms-of-service'
        }
      );
      window.open(routeData.href, '_blank');
    },
    openPrivacyPolicy() {
      const routeData = this.$router.resolve(
        {
          name: 'privacy-policy'
        }
      );
      window.open(routeData.href, '_blank');
    }
  },
}
</script>

<style>
.modal-card-body {
  background-color: rgb(241,241,241);
  border-top: 0 !important;
  border-bottom: 0 !important;
}

.modal-card-foot {
  background-color: rgb(241,241,241);
  border-top: 0 !important;
  border-bottom: 0 !important;
  height: 70px;
}

.modal-card-head {
  background-color: rgb(241,241,241);
  border-top: 0 !important;
  border-bottom: 0 !important;
  height: 80px;
}
</style>
