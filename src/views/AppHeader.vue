<template>
    <div class="app-header">
        <div class="title">
            <img class="logo" alt="Grumpy logo" src="@/assets/grump.png">
            <div>
                <h1>Grumpy Chat!</h1>
                <div>We're all grumpy here</div>
            </div>
        </div>
        <user-details class="user-details" :userName="getUserName"></user-details>
    </div>
</template>

<script>
    // @ is an alias to /src
    import UserDetails from '@/components/UserDetails.vue';
    import { mapGetters } from "vuex";

    export default {
        name: 'AppHeader',
        components: {
            UserDetails
        },
        computed: {
            ...mapGetters(['getUserName'])
        }
    }
</script>

<style lang="scss" scoped>
    @media (max-width: 570px) {
        .app-header {
            flex-direction: column-reverse;
        }

        .title, .user-details {
            align-self: center;
        }
    }

    .app-header {
        display: flex;
        justify-content: space-between;

        .title {
            display: flex;
            min-width: 300px;

            .logo {
                width: 100px;
                height: 100px;
            }

            h1 {
                margin-bottom: 0;
                font-family: fantasy;
                font-weight: 900;
            }
        }

        .user-details {
            display: inline-block;
        }
    }
</style>