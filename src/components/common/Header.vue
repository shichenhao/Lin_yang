<template>
    <mt-header :title="title">
        <mt-button icon="back" slot="left" v-if="!isShow" @click="onRoutes()"></mt-button>
    </mt-header>
</template>
<script>
    export default {
        props:[
            'title',
            'isShow'
        ],
        data() {
            return {
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            onRoutes(){
                this.$router.go(-1); //this.$route.path.replace('/','');
            }
        },
        computed:{
        }
    }
</script>
<style>

    .mint-header{
        background:#fff;
        color:#000;
    }
</style>
