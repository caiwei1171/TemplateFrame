<template>
    <div class="app-wrapper">
        <div class="side-container">
            <div class="logo" :class="collapsed ? 'folded' : 'unfolded'">
                <a href="/"><img :src="imgSrc" alt="logo"></a>
            </div>
            <Side-menu></Side-menu>
        </div>
        <div class="main-container">
            <div class="main-header">

            </div>
            <div class="main-content">
                <el-scrollbar wrap-class="scrollbar">
                    <MainView></MainView>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import MainView from './components/MainView/index'//显示主要内容
import SideMenu from './components/SideMenu/index'//侧边栏
import Logo from '../assets/logo-nav.png'//logo
const RESIZE_WIDTH = 1440
export default {
    name:'Layout',
    computed:{
        ...mapGetters('app',['collapsed']),
        // 获取侧边栏logo
        imgSrc(){
            return Logo
        }
    },
    components:{
        MainView,
        SideMenu
    },
    created(){
        this.handleResize()
    },
    beforeMount(){
        window.addEventListener('resize',this.handleResize)
    },
    beforeDestroy(){
        window.removeEventListener('resize', this.handleResize)
    },
    methods:{
        ...mapMutations('app', ['openSideMenu', 'closeSideMenu']),
        handleResize(){
            const width = document.body.getBoundingClientRect().width
            if(width <= RESIZE_WIDTH){
                this.closeSideMenu()
            }else{
                this.openSideMenu()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../assets/scss/scroll-bar";
    .app-wrapper{
        width: 100%;
        height: 100%;
        overflow: hidden;
        .side-container{
            float:left;
            height:100vh;
            width: 200px;
            transition: width 0.5s;
            background-color:#263238;
            &.unfolded{
            width: 200px;
            .logo{
                width: 200px!important;
                height: 84px!important;
            }
        }
        &.folded{
            width: 64px;
            .logo{
                width: 64px;
                height: 64px;
                padding: 10px;
                box-sizing: border-box;
            }
        }
        img{
            margin: 10px auto;
            display: block;
            width: 170.5px;
            height: 50.5px;
        }
    }
    .main-container{
        float: left;
        height: 100vh;
        transition: width 0.5s;
        &.normal{
            width: calc(100% - 200px);
        }
        &.wider{
            width: calc(100% - 64px);
        }
        .main-content{
            .el-scrollbar{
                height: calc(100vh - 64px - 40px);
                .scroll-bar,
                .scrollbar{
                    height: 100%;
                    overflow-x: hidden;
                }
            }
        }
    }
}
</style>