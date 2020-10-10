<template>
  <div class="edit-banner">
      <div class="edit-item">
          <span>{{left}}</span>
          <slot name="right"></slot>
      </div>
  </div>
</template>

<script>
export default {
    props:['left']
}
</script>

<style>

    .edit-banner{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #eee;
    }
    .edit-item{
        height: 50px;
         overflow: hidden;
        display: flex;
        justify-content: space-between;
        padding: 0 15px;
    }
</style>