<template>
    <div class="user-details">
        <div v-if="userName" class="user user-verified">
            <div class="user-name">
                Hello, {{ userName }}!
                <router-link to="/login">(Change user)</router-link>
            </div>
            <img class="user-image" :src="userPicture || `https://robohash.org/${userName}`" alt="user picture">
        </div>
        <div v-else>
            <router-link class="user user-anonymous" to="/login">Please login</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserDetails",
        props: {
            userName: {
                type: String,
                default: '',
            },
            userPicture: {
                type: String,
                default: '',
            },
        },

    }
</script>

<style lang="scss" scoped>

    .user {
        margin: 10px;
    }

    .user-verified {
        display: flex;

        .user-name {
            position: relative;
            top: 10px;
            color: green;
            margin-right: 10px;
        }

        .user-image {
            border-radius: 50%;
            border: 1px dashed #42b983;
            width: 50px;
            height: 50px;
        }
    }

    .user-anonymous {

    }

</style>