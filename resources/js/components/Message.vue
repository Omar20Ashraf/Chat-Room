<template>
    <div >

        <li class="list-group-item" :class="colorName">
            <slot></slot>

            <span id="time">{{ time }}</span>
        </li>
        <small class="badge float-right" :class="badgeClass">
            {{user}}
        </small>

    </div>
</template>

<script>
    export default{
        props:['color','user','time'],
        computed:{
            colorName(){
                return 'list-group-item-' + this.color;
            },
            badgeClass(){
                return 'badge-' + this.color;
            }
        },
    };
</script>

<style>
    #time{
        margin-top: 10px;
        color:black;
        font-size: 12px;
    }
</style>
