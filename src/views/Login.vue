<template>
    <div>
        <h2>Please enter a gumpy user name in order to enter or open a new chat room</h2>
        <label>Username: </label>
        <input class="username-input"
               type="text"
               v-model="userName"
               ref="userNameInput"
               placeholder="Please enter a username"
               @keypress.enter="handleUserName"
        >
        <button class="btn btn-login" @click="handleUserName" :disabled="!userName">Login</button>
        <div v-if="displayError" class="error">Please enter a valid username</div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "Login",
        data() {
            return {
                userName: this.getUserName || '',
                displayError: false,
            }
        },
        created() {
            this.$nextTick(() => {
                this.$refs.userNameInput.focus();
            });
        },
        computed: {
            ...mapGetters( ['getUserName']),
        },
        methods: {
            ...mapActions( ['changeUserName']),
            handleUserName() {
                if (this.userName.trim()) {
                    this.displayError = false;
                    this.changeUserName(this.userName);
                    this.$router.push('/rooms');
                } else {
                    this.displayError = true;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    .username-input {
        min-width: 200px;
    }

    .error {
        color: red;
    }

    h2 {
        margin: 30px 20px;
    }

    .btn {
        background-color: cadetblue;
        color: white;
        outline: none;
        transition: background-color 0.2s;
        font-weight: bold;
        border: 2px solid cadetblue;

        &:hover {
            background-color: lightseagreen;
        }
    }

    .btn-login, .username-input {
        padding: 10px;
    }

</style>