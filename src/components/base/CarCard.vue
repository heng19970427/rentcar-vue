<template>
  <el-col :span="8">
      <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img v-if="car.images.length !== 0" :src="car.images[0].path"
                 :title="car.images[0].title" class="image">
            <div style="padding: 14px;">
                  <span class="car-name">{{ car.type }}</span>
                  <span style="float: right"><span
                            class="car-price">￥{{ car.rentFee }}</span>/日均</span>
                  <div class="bottom clearfix">
                        <time class="car-info">{{ car.desc }}</time>
                        <span>
                        <slot name="btn1">
                            <el-button type="text" class="button">
                                查看详情
                            </el-button>
                        </slot>
                            <slot name="btn2">
                               <el-button v-on:click="$emit('set-car-id',car.carId)" type="text" class="button">
                                   选择该车
                               </el-button>
                            </slot>
                        </span>
                    </div>
              </div>
        </el-card>
  </el-col>
</template>

<script>
export default {
  name: 'CarCard',
  props: {
    car: Object
  }
}
</script>

<style scoped>

</style>
