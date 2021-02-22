<template>
    <div v-if="!item.hidden" class="side-menu-item">
        <template v-if="hasOnlyOneChild(item, item.children) && (onlyOneChild.noChildren || !onlyOneChild.children)">
            <Link-item v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
                <el-menu-item :index="resolvePath(onlyOneChild.path)">
                    <Item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title"></Item>
                </el-menu-item>
            </Link-item>
        </template>
        <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
            <template slot="title">
                <!-- <Item :icon="item.meta && item.meta.icon" :title="item.meta && item.meta.title"></Item> -->
            </template>
            <Side-menu-item v-for="child in item.children" :key="child.path" :item="child" :base-path="resolvePath(child.path)"></Side-menu-item>
        </el-submenu>
    </div>
</template>

<script>
import path from 'path'
import { isExternal } from '../../../utils/validate'
import LinkItem from './LinkItem'
import Item from './Item'
export default {
    name:"SideMenuItem",
    props:{
        item:{
            required:true,
            type:Object,
            default:() => {}
        },
        basePath:{
            type:String,
            default:''
        }
    },
    components:{ 
        LinkItem, 
        Item 
    },
    data(){
        return {
            onlyOneChild: null
        }
    },
    methods:{
        // 判断是否只有一级
        hasOnlyOneChild(parent, children = []){
            if(children.length === 0){
                this.onlyOneChild = { ...parent, path: '', noChildren: true }
                return true
            }else if(children.length === 1){
                this.onlyOneChild = children[0]
                return true
            }else{
                return false
            }
        },
        // 解析地址
        resolvePath(routePath){
            if(isExternal(routePath)){
                return routePath
            }
            if(isExternal(this.basePath)){
                return this.basePath
            }
            return path.resolve(this.basePath, routePath)
        }
    }
}
</script>

<style>

</style>