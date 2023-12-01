<template>
    <div class="vue-tempalte">
        <button type="button" class="btn btn-primary" @click="toCreatePage()">
            Add product
        </button>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">name</th>
                    <th scope="col">description</th>
                    <th scope="col">price</th>
                    <th scope="col">image</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in products" :key="index">
                    <th scope="row">{{ index }}</th>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.price }}</td>
                    <td><img :src="item.image" height="100" width="100" /></td>
                </tr>
            </tbody>
        </table>
        
        <!-- <form @submit.prevent="login()">
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
        </form> -->
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            products: [],

        }
    },
    mounted() {

        let user = localStorage.getItem('user-token');
        if (!user) {
            this.$router.push({ name: "signup" });
        }
        this.getProduct();
    },
    methods: {
        async getProduct() {
            try {
                let result = await axios.get(`api/product`);
                this.products = result.data;
                console.log(result);
            } catch (error) {
                alert('Something went wrong');
            }
        },
        toCreatePage(){
            this.$router.push({ name: "create-product" });
        }
    }
}
</script>