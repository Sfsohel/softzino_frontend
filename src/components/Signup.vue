<template>
    <div class="vue-tempalte">
        <form @submit.prevent="login()">
            <h3>Sign In</h3>
            <div class="form-group">
                <label>Email address</label>
                <input type="email" v-model="loginData.email" required class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" v-model="loginData.password" required class="form-control form-control-lg" />
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
            <!-- <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/forgot-password">Forgot password ?</router-link>
            </p> -->
            <!-- <div class="social-icons">
                <ul>
                    <li><a href="#"><i class="fa fa-google"></i></a></li>
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                </ul>
            </div> -->
        </form>
    </div>
  </template>
  <script>
    import axios from 'axios'
    export default {
        data() {
            return {
                loginData :{
                    email:"",
                    password:"",
                }
            }
        },
        methods:{
            async login(){
                try {
                    let result = await axios.post(`api/login`, this.loginData);
                    localStorage.setItem("user-token", result.data.token);
                    axios.defaults.headers.common = { 'Authorization': `bearer ${result.data.token}`, 'Accept' :'application/json'}
                    this.$router.push({ name: "product" });
                    console.log(result);
                } catch (error) {
                    alert('login Unsuccessful');
                }
                
            }
        }
    }
  </script>