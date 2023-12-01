<template>
    <div class="vue-tempalte">
        <form @submit.prevent="save()">
            <h3>Sign In</h3>
            <div class="form-group">
                <label>Name</label>
                <input type="text" v-model="productData.name" required class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Description</label>
                <input type="text" v-model="productData.description" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Price</label>
                <input type="number" v-model="productData.price" required class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Product Image</label>
                <input type="file" @change="previewFiles" class="form-control form-control-lg" tabindex="-1">
            </div>
            <div class="form-group">
                <select v-model="productData.category_id" class="form-control form-control-lg">
                    <label>Product Category</label>
                    <option v-for="category in categories" v-bind:value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>
            
            <button type="submit" class="btn btn-dark btn-lg btn-block">save</button>
        </form>
    </div>
  </template>
  <script>
    import axios from 'axios'
    export default {
        data() {
            return {
                categories:[],
                productData :{
                    name:"",
                    description:"",
                    price:'',
                    image:'',
                    category_id:'',
                }
            }
        },
        mounted(){
            let user = localStorage.getItem('user-token');
            if (!user) {
                this.$router.push({ name: "signup" });
            }
            this.getCategory();
        },
        methods:{
            async save(){
                try {
                    const formData =new FormData();
                    formData.append('name',this.productData.name)
                    formData.append('description',this.productData.description)
                    formData.append('price',this.productData.price)
                    formData.append('image',this.productData.image)
                    formData.append('category_id',this.productData.category_id)
                    let result = await axios.post(`api/product`, formData);
                    this.$router.push({ name: "product" });
                    console.log(result);
                } catch (error) {
                    alert('Save Unsuccessful');
                }
                
            },
            previewFiles(event) {
                this.productData.image = event.target.files[0];
            },
            async getCategory() {
                try {
                    let result = await axios.get(`api/get-category`);
                    this.categories = result.data;
                    console.log(result);
                } catch (error) {
                    alert('Something went wrong');
                }
            }
        }
    }
  </script>