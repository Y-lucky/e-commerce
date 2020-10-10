<template>
    <div class="dynamic">
      <div class="dynamic-item">
            <span>动态</span>|
            <span>视频</span>
      </div>
    </div>
</template>

<script>
export default {
name:'profileDyna'
}
</script>

<style scoped>
    .dynamic{
        border-top:2px solid #eee;
    }

    .dynamic-item{
        /* display: flex; */
        margin: 10px 20px 0 10px;
    }

    .dynamic-item span{
        padding: 0 10px;
        text-align: center;
    }
</style>