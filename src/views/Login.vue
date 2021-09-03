<template>
  <section id="login">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <div class="login-card">
            <img
              src="../assets/mkcl-logo.png"
              alt="mkcl logo"
              class="mb-4"
              width="100px"
            >
            <div
              id="loginFormId"
              class="form-group"
            >
              <label
                id="emailId"
                for="email"
              >
                Email address
              </label>
              <input
                v-model="username"
                id="email"
                type="email"
                name="email"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              >
              <small
                id="emailHelp"
                class="form-text text-muted"
              >
                We'll never share your email with anyone else.
              </small>
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
                @focus="showPassInfo = true"
                id="password"
                @blur="showPassInfo = false"
                placeholder="Password"
              >
            </div>
            <button
              id="loginBtn"
              type="submit"
              name="btnlogin"
              class="btn btn-info px-4 mr-2"
              @click="authenticate()"
            >
              Submit
            </button>
            <button
              type="button"
              name="btnlogin"
              class="btn btn-info px-4"
              @click="show()"
            >
              Show
            </button>
          </div>
        </div>
        <div class="col-md-4">
          <div class="aro-pswd_info">
            <div
              v-show="showPassInfo"
              id="pswd_info"
            >
              <h4>Password must be requirements</h4>
              <ul>
                <li
                  id="letter"
                  class="invalid"
                >
                  At least
                  <strong>one letter</strong>
                </li>
                <li
                  id="capital"
                  class="invalid"
                >
                  At least
                  <strong>one capital letter</strong>
                </li>
                <li
                  id="number"
                  class="invalid"
                >
                  At least
                  <strong>one number</strong>
                </li>
                <li
                  id="length"
                  class="invalid"
                >
                  Be at least
                  <strong>8 characters</strong>
                </li>
                <li
                  id="space"
                  class="invalid"
                >
                  be
                  <strong> use [~,!,@,#,$,%,^,&,*,-,=,.,;,']</strong>
                </li>
              </ul>
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
      this.$store.dispatch('AUTH_REQUEST', { loginId: this.username, password: this.password }).then(res => {
        // Redirect to next page after suucessfull login
        alert('Login : ' + res.isValid('MQLLogin'))
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
    validatePassword () {
      // validate password length
      if (this.password.length < 8) {
        let showLengthMsg = document.getElementById('length')
        showLengthMsg.classList.remove('valid')
        showLengthMsg.classList.add('invalid')
      } else {
        let showLengthMsg = document.getElementById('length')
        showLengthMsg.classList.remove('invalid')
        showLengthMsg.classList.add('valid')
      }

      // validate letter
      if (this.password.match(/[A-z]/)) {
        let showLengthMsg = document.getElementById('letter')
        showLengthMsg.classList.remove('invalid')
        showLengthMsg.classList.add('valid')
      } else {
        let showLengthMsg = document.getElementById('letter')
        showLengthMsg.classList.remove('valid')
        showLengthMsg.classList.add('invalid')
      }

      // validate capital letter
      if (this.password.match(/[A-Z]/)) {
        let showLengthMsg = document.getElementById('capital')
        showLengthMsg.classList.remove('invalid')
        showLengthMsg.classList.add('valid')
      } else {
        let showLengthMsg = document.getElementById('capital')
        showLengthMsg.classList.remove('valid')
        showLengthMsg.classList.add('invalid')
      }

      // validate number
      if (this.password.match(/\d/)) {
        let showLengthMsg = document.getElementById('number')
        showLengthMsg.classList.remove('invalid')
        showLengthMsg.classList.add('valid')
      } else {
        let showLengthMsg = document.getElementById('number')
        showLengthMsg.classList.remove('valid')
        showLengthMsg.classList.add('invalid')
      }

      // validate space
      if (this.password.match(/[^a-zA-Z0-9\-/]/)) {
        let showLengthMsg = document.getElementById('space')
        showLengthMsg.classList.remove('invalid')
        showLengthMsg.classList.add('valid')
      } else {
        let showLengthMsg = document.getElementById('space')
        showLengthMsg.classList.remove('valid')
        showLengthMsg.classList.add('invalid')
      }
    }
  }
}
</script>

<style lang="scss">
#login {
  .login-card {
    box-shadow: 0 0 10px #ccc;
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
