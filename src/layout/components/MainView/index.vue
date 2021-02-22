<template>
    <div class="main-view">
        <transition name="fade" mode="out-in">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
export default {
    name:'MainView',
}
</script>

<style lang='scss' scoped>
    .main-view{
        padding: 15px 25px;
        box-sizing: border-box;
    }
</style>