<template>
    <!-- eslint-disable vue/require-component-is -->
    <component v-bind="renderTag(to)">
        <slot></slot>
    </component>

    <!-- <router-link ></router-link> -->
</template>

<script>
import { isExternal } from '../../../utils/validate'
export default {
    name:"LinkItem",
    props:{
        to:{
            type:String,
            required:true
        }
    },
    methods:{
        renderTag(url){
            if(isExternal(url)){
                return {
                    is:'a',
                    href:url,
                    target:'_blank',
                    rel:'noopener'
                }
            }
            return{
                is:'router-link',
                to:url
            }
        }
    }
}
</script>

<style>

</style>