<template>
    <div class="wrapper">
        <h3>用户列表</h3>
        <el-table :data="list" style="width: 100%">
            <el-table-column prop="index" label="序号" width="120"></el-table-column>
            <el-table-column prop="userid" label="账号" width="180"></el-table-column>
            <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: []
            }
        },
        beforeMount() {
            this.$axios.get('/').then(res => {
                this.list = res.data
            })
        },
    }
</script>
<style>
    .wrapper {
        width: 500px;
        margin: 100px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 0 5px #eee;
    }
    h3 {
        text-align: center;
    }
</style>