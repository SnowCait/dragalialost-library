<template>
    <main>
        <div id="firebaseui-auth-container"></div>
        <div v-on:click="logout">ログアウト</div>
    </main>
</template>

<script>

export default {
    methods: {
        showAuthUI: function () {
            var uiConfig = {
            signInSuccessUrl: this.$router.resolve('/').href,
            signInOptions: [
                firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            ],
            tosUrl: '/',
            privacyPolicyUrl: '/',
            };
            var ui = new firebaseui.auth.AuthUI(firebase.auth());
            ui.start('#firebaseui-auth-container', uiConfig);
        },
        logout: function () {
            firebase.auth().signOut();
        },
    },
    mounted () {
        console.log(this.$route.fullPath);
        console.log(this.$router.resolve('/user'))
        this.showAuthUI();
    },
}
</script>
