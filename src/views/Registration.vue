<template>
  <div class="main-form">
    <div class="d-flex justify-content-between align-items-center">
      <h1>Online Cab Request</h1>
      <div class="col-lg-6 car">
        <img
          src="https://static.toyotabharat.com/images/showroom/innova-mmc/car-01-1600x900.png"
          alt="Car"
        >
      </div>
    </div>
    <b-toaster
      name="b-toaster-top-right"
      class="position-absolute"
      style="top: 4px; right: 4px"
    />
    <b-form
      class="row my-2"
      @submit.prevent="submitForm"
    >
      <div class="col-12">
        <b-alert
          show
          variant="danger"
          dismissible
          v-if="error !== null"
        >
          {{
            error
          }}
        </b-alert>
      </div>
      <div class="col-12 col-md-6">
        <b-form-input
          id="employee-name"
          v-model="employee.name"
          type="text"
          placeholder="Enter your name"
          required
        />

        <!-- <b-form-input
            id="employee-email"
            v-model="employee.email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <span
            >Suggested Email:
            <span @click="addSuggestedEmail" class="btn-link">{{
              suggestedEmail
            }}</span>
          </span> -->

        <b-form-input
          id="employee-phone"
          v-model="employee.phone"
          type="text"
          placeholder="Enter your phone number"
          required
        />
        <!-- <b-form-datepicker class="d-flex align-items-center" id="details-date" v-model="cabDetails.date" /> -->
        <input
          type="date"
          class="form-control"
          id="date"
          name="Date"
          :min="minDate"
          v-model="cabDetails.date"
        >

        <b-form-select
          class="form-control"
          id="employee-program"
          v-model="employee.programName"
          :options="PROGRAM_NAMES"
          placeholder="Program name"
          required
        >
          Program name
        </b-form-select>

        <b-form-input
          id="details-total"
          type="number"
          v-model="cabDetails.total"
          placeholder="Enter total number of passengers"
          required
          min="1"
        />
      </div>
      <div class="col-12 col-md-6">
        <b-form-textarea
          id="details-source-address"
          rows="3"
          v-model="cabDetails.sourceAddress"
          placeholder="First Address for pickup"
        />

        <b-form-textarea
          id="details-destination-address"
          rows="3"
          v-model="cabDetails.destinationAddress"
          placeholder="Destination Address"
          required
        />

        <b-form-textarea
          class="m-0"
          id="details-remarks"
          v-model="cabDetails.remarks"
          placeholder="Remark if any"
        />
        <b-form-checkbox
          id="details-halt"
          v-model="cabDetails.halt"
          class="m-1"
          style="color: black"
        >
          Halt? (if any)
        </b-form-checkbox>
      </div>

      <div class="col-12 d-flex justify-content-center">
        <b-button
          class="mt-3 btn-lg btn-danger"
          type="submit"
          variant="primary"
        >
          Submit
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import Vue from 'vue'
import MQL from '@/plugins/mql'
import {
  BForm,
  BFormGroup,
  BFormInput,
  BFormDatepicker,
  BFormSelect,
  BFormTextarea,
  BFormCheckbox,
  BAlert,
  BToaster
} from 'bootstrap-vue'
import { validateRequestForm } from '../validators'

Vue.prototype.PROGRAM_NAMES = ['PRONEXT', 'DNEXT']

export default {
  name: 'RequestForm',
  components: {
    'b-form': BForm,
    'b-form-group': BFormGroup,
    'b-form-input': BFormInput,
    'b-form-datepicker': BFormDatepicker,
    'b-form-select': BFormSelect,
    'b-form-textarea': BFormTextarea,
    'b-form-checkbox': BFormCheckbox,
    'b-alert': BAlert,
    'b-toaster': BToaster
  },
  data: function () {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    return {
      employee: {
        name: '',
        email: '',
        phone: '',
        programName: null
      },
      cabDetails: {
        date: '',
        total: 1,
        sourceAddress: '',
        destinationAddress: '',
        remarks: '',
        halt: false
      },
      error: null,
      minDate: today,
      halts: ''
    }
  },
  methods: {
    addSuggestedEmail () {
      this.employee.email = this.suggestedEmail
    },
    submitForm () {
      this.error = validateRequestForm({
        ...this.employee,
        ...this.cabDetails
      })
      if (this.error) {
        console.log(this.error)
        return
      }
      if (this.halt == true) {
        this.halts = 'YES'
      } else if (this.halt == false) {
        this.halts = 'NO'
      }
      new MQL()
        .setActivity('o.[CreateCarRequest, SendingTestemail]')
        .setData('CreateCarRequest', {
          empName: this.employee.name,
          phone: this.employee.phone,
          travelDate: this.cabDetails.date,
          programName: this.employee.programName,
          passengers: this.cabDetails.total,
          pickup: this.cabDetails.sourceAddress,
          destination: this.cabDetails.destinationAddress,
          remarks: this.cabDetails.remarks,
          halt: this.cabDetails.halt,
          status: 'pending'
        })
        .setData('SendingTestemail', {
          to: 'tanmaya@mkcl.org',
          from: 'MKCLCarRequestPortal@mkcl.org',
          name: this.employee.name,
          address: this.cabDetails.sourceAddress,
          destination: this.cabDetails.destinationAddress,
          count: this.cabDetails.total,
          pickdate: this.cabDetails.date,
          progname: this.employee.programName,
          phone: this.employee.phone,
          halt: this.halts
        })

        .enablePageLoader(true)
        .showConfirmDialog(true)
        .fetch('a11')
        .then((res) => {
          console.log(res)
          // let r = res.getRaw(true)
          console.log(res.isValid())
          this.$bvToast.toast(`Your request was submitted`, {
            toaster: 'b-toaster-top-right',
            title: 'Successful',
            autoHideDelay: 2000,
            variant: 'success',
            solid: true,
            toastClass: 'toast'
          })
        })
    }
  },

  computed: {
    suggestedEmail: function () {
      let splitName = this.employee.name.trim().split(' ')
      splitName = splitName.filter((s) => s.trim())

      if (splitName.length == 0) {
        return ''
      } else if (splitName.length == 1) {
        return splitName[0].toLowerCase() + '@mkcl.org'
      } else {
        return (
          splitName[0].toLowerCase() +
          splitName[1].charAt(0).toLowerCase() +
          '@mkcl.org'
        )
      }
    }
  }
}
</script>

<style>
.row {
  margin: 0;
}
.car {
  width: 100%;
  height: auto;
}
.custom-select {
  padding: 0.5rem;
  width: 100%;
  background-color: transparent;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
h1 {
  color: rgb(34, 34, 34);
  font-weight: bold;
}
.form-control {
  margin: 1rem 0;
  background-color: rgb(206, 206, 206);
}
.form-control:focus {
  border-color: black;
  box-shadow: none;
}
::placeholder {
  color: rgb(255, 255, 255);
  opacity: 1;
}
#details-date__value_ {
  margin: 0 !important;
  border: none;
}
.car img {
  width: 100%;
  height: auto;
}
.toast {
  background-color: rgb(0, 125, 0);
  color: white;
  padding: 0.75rem;
  border-radius: 0.25rem;
}
@media screen and (max-width: 720px) {
  .car {
    /* visibility: hidden; */
    display: none;
  }
  h1 {
    font-size: 2rem;
    font-weight: bold;
  }
}
</style>
