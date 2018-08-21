<template>
  <div v-show="loaded">
    <div v-if="signed" key="userPic" class="signin-btn" @click="signOut()"><img :src="user.pic"></div>
    <div v-else class="signin-btn" key="signInBtn" @click="signIn()"><img src="/google.svg"></div>
  </div>
</template>

// https://developers.google.com/identity/sign-in/web/build-button#building_a_button_with_a_custom_graphic
<script>

let auth2;

export default {
  data() {
    return {
      loaded: false,
      signed: false,
      user: {},
      error: ''
    }
  },
  created() {
    this.loadScript( 'https://apis.google.com/js/platform.js', this.initAuth);
  },
  methods: {
    loadScript(url, callback) {
      if( !process.browser || !document ) return;
      const script = document.createElement( 'script' );
      script.onload = callback;
      script.type = 'text/javascript';
      script.src = url;
      document.head.appendChild( script );
    },
    initAuth() {
      // init google auth
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
          client_id: '48424858569-530hbikrfvvfp2n1pcqabac1l1fjmnas.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        // auth2.attachClickHandler(this.$refs.signInBtn, {}, this.gotUser, this.gotError);
        auth2.currentUser.listen(this.gotUser);
        this.loaded = true;
      });
    },
    gotUser(googleUser) {
      this.signed = auth2 && auth2.isSignedIn.get();
      if(this.signed) {
        var p = auth2.currentUser.get().getBasicProfile();
        this.user = {
          name: p.getName(),
          pic: p.getImageUrl(),
          email: p.getEmail(),
          token: googleUser && googleUser.getAuthResponse().id_token
        };
        console.log(`SignIn OK ${this.user.name}`);
      }
    },
    gotError(e) {
      this.error = JSON.stringify(e, undefined, 2);
      console.log(`SignIn error ${this.error}`);
    },
    signOut() {
      auth2 && auth2.signOut();
    },
    signIn() {
      auth2 && auth2.signIn();
    }
  }
}
</script>

<style lang="scss">
.signin-btn {
  position: fixed;
  display: inline-block;
  top: 12px;
  right: 64px;
  width:32px;
}

.signin-btn img {
  max-width: 100%;
  max-height: 100%;
}

</style>
