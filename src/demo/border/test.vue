<template>
  <div>
    <el-button @click="save">保存</el-button>
  </div>
</template>

<script>
  import API from '../../utils/api'
  import city from './city_code'

  export default {
    name: 'test',
    methods: {
      save () {
        console.log(city.length)
        // city.forEach(s => {
        // API.area.add({
        //   id: s.code,
        //   name: s.name,
        //   pid: '0'
        // }).then(res => {
        //   // eslint-disable-next-line no-console
        //   console.log(res)
        // })
        for (let i = 19; i < 22; i++) {
          let s = city[i]
          if (s.city) {
            s.city.forEach(c => {
              // API.area.add({
              //   id: c.code,
              //   name: c.name,
              //   pid: s.code
              // }).then(res => {
              //   // eslint-disable-next-line no-console
              //   console.log(res)
              // })

              if (c.area) {
                c.area.forEach((a, index) => {
                  API.area.add({
                    id: a.code,
                    name: a.name,
                    pid: c.code
                  }).then(res => {
                    // eslint-disable-next-line no-console
                    console.log(res)
                  })
                })
              }
            })
          }
        }

        // })
      }
    },
    created () {

    }
  }
</script>

<style scoped>

</style>
