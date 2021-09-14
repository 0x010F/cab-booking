<template>
  <section id="login">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-5 offset-md-2">
          <div class="login-card">
            <img
              src="../assets/mkcl-logo.png"
              alt="mkcl logo"
              class="mb-3 mx-auto d-block"
              width="50%"
            >
            <div
              id="loginFormId"
              class="form-group"
            >
              <label
                id="emailId"
                for="email"
              >
                UserName
              </label>
              <input
                v-model="username"
                id="email"
                type="text"
                name="email"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter username"
                style="background-color:white"
              >             
            </div>
            <div class="form-group">
              <label for="password">
                Password
              </label>
              <input
                v-model="password"
                type="password"
                name="password"
                class="form-control"              
                placeholder="Password"
                style="background-color:white"
              >
            </div>
            <div class="text-center">
              <button
                id="loginBtn"
                type="submit"
                name="btnlogin"
                class="btn btn-info px-4 mr-2"
                @click="authenticate()"
              >
                Submit
              </button>             
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import Response from '@/plugins/response.js'
export default {
  data () {
    return {
      username: '',
      password: '',
      showPassInfo: false
    }
  },
  methods: {
    show () {
      let r = new Response({})
      r.showElement('loginFormId')
    },
    authenticate () {
      this.$store.dispatch('AUTH_REQUEST', { username: this.username, password: this.password }).then(res => {
        // Redirect to next page after suucessfull login
        if (res.isValid('LoginAuth')){
          this.$router.push({name:'admin'})
        }
        else{
          alert('Login : ' + res.isValid('LoginAuth'))
        }
      })
        .catch(err => {
          alert(err)
          Vue.$log.error(err)
        })

      // let req = {
      //   loginId: this.username,
      //   password: this.password
      // };
      // this.$MQLFetch('O.LoginService', req)
      //   .then(res => {
      //     // alert(JSON.stringify(res));
      //     this.$router.push("/");
      //   })
      //   .catch(error => {
      //     // Do in case of error
      //     Vue.error(error);
      //   });
    },  
  }
}
</script>

<style lang="scss">
#login {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .login-card {
    box-shadow: 0 0 10px rgb(182, 181, 181);
    padding: 30px;
  }
}

#pswd_info {
  background: #dfdfdf none repeat scroll 0 0;
  color: #fff;
  left: 20px;
  position: absolute;
  top: 115px;
}
#pswd_info h4 {
  background: black none repeat scroll 0 0;
  display: block;
  font-size: 14px;
  letter-spacing: 0;
  padding: 17px 0;
  text-align: center;
  text-transform: uppercase;
}
#pswd_info ul {
  list-style: outside none none;
}
#pswd_info ul li {
  padding: 10px 45px;
}

.valid {
  background: rgba(0, 0, 0, 0)
    url("https://s19.postimg.org/vq43s2wib/valid.png") no-repeat scroll 2px 6px;
  color: green;
  line-height: 21px;
  padding-left: 22px;
}

.invalid {
  background: rgba(0, 0, 0, 0)
    url("https://s19.postimg.org/olmaj1p8z/invalid.png") no-repeat scroll 2px
    6px;
  color: red;
  line-height: 21px;
  padding-left: 22px;
}

#pswd_info::before {
  background: #dfdfdf none repeat scroll 0 0;
  content: "";
  height: 25px;
  left: -13px;
  margin-top: -12.5px;
  position: absolute;
  top: 50%;
  transform: rotate(45deg);
  width: 25px;
}
</style>
