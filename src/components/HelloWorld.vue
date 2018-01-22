<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <form>
      <input type="text" name="username" v-model="userName"> <br>
      <input type="text" name="age" v-model="age"> <br>
      <a href="javascript:;" @click="addUser">提交</a>
    </form>
  </div>
</template>
<script>
  import axios from 'axios';

  export default {
    name: 'hello',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        userName: '',
        age: '',
      };
    },
    methods: {
      addUser() {
        const name = this.userName;
        const age = this.age;
        axios.post('/api/user/addUser', {
          username: name,
          age,
        }).then((response) => {
          console.log(response);
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
