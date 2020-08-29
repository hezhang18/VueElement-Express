<template>
    <div class="box">
        <h3>注册页面</h3>
        <el-form :model="registerData" status-icon :rules="rules" ref="registerForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="userid">
                <el-input type="text" v-model="registerData.userid"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerData.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
                <el-input type="password" v-model="registerData.password2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="registerData.username"></el-input>
            </el-form-item>
            <div class="item-button"> 
                <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value !== this.registerData.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                registerData: {
                    userid: '',
                    password: '',
                    password2: '',
                    username: ''
                },
                rules: {
                    userid: [
                        {required: true, message: '用户ID不能为空', trigger: 'blur'},
                        {min: 3, max: 32, message: '长度应在3 - 32 之间', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {min: 3, max: 32, message: '长度应在6 - 32 之间', trigger: 'blur'}
                    ],
                    password2: [
                        {required: true, message: '确认密码不能为空', trigger: 'blur'},
                        {min: 3, max: 32, message: '长度应在6 - 32 之间', trigger: 'blur'},
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    username: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'},
                        {min: 2, max: 32, message: '长度应在3 - 32 之间', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/register', this.registerData).then(() => {
                            this.$message({
                                type: 'success',
                                message: '用户注册成功'
                            })
                            this.$router.push('/login')
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
    }
</script>
<style>
    .box {
        width: 500px;
        height: 400px;
        margin: 100px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 0 5px #eee;
    }
    h3 {
        text-align: center;
    }
    .el-input {
        width: 92%;
    }
    .item-button {
        display: flex;
    }
    .item-button button {
        width: 120px;
        margin: 0 auto;
    }
</style>