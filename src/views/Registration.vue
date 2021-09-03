<template>
  <div class="main-form">
    <h1>Online Cab Request</h1>
    <b-form class="row my-2" @submit.prevent="submitForm">
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
        <!-- 
        <b-form-datepicker class="d-flex align-items-center" id="details-date" v-model="cabDetails.date" /> -->
        <input
          type="date"
          class="form-control"
          id="birthday"
          name="birthday"
          v-model="cabDetails.date"
        />

        <b-form-select
          id="employee-program"
          v-model="employee.programName"
          :options="PROGRAM_NAMES"
          placeholder="Program name"
        />

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
          v-model="cabDetails.sourceAddress"
          placeholder="First Address for pickup"
        />

        <b-form-textarea
          id="details-destination-address"
          v-model="cabDetails.destinationAddress"
          placeholder="Destination Address"
        >
        </b-form-textarea>
      </div>

      <div class="col-12 col-md-6 col-lg-6">
        <b-form-textarea
          class="m-0"
          id="details-remarks"
          v-model="cabDetails.remarks"
          placeholder="Remark if any"
        />

        <b-form-checkbox id="details-halt" v-model="cabDetails.halt" class="m-1"
          >Halt? (if any)</b-form-checkbox
        >
      </div>

      <div class="col-12 d-flex justify-content-center">
        <b-button class="mt-3" type="submit" id="a11" variant="primary"
          >Submit</b-button
        >
      </div>
    </b-form>
  </div>
</template>

<script>
import Vue from "vue";
import MQL from "@/plugins/mql";
import {
  BForm,
  BFormGroup,
  BFormInput,
  BFormDatepicker,
  BFormSelect,
  BFormTextarea,
  BFormCheckbox,
} from "bootstrap-vue";

Vue.prototype.PROGRAM_NAMES = ["PRONEXT", "DNEXT"];

export default {
  name: "RequestForm",
  components: {
    "b-form": BForm,
    "b-form-group": BFormGroup,
    "b-form-input": BFormInput,
    "b-form-datepicker": BFormDatepicker,
    "b-form-select": BFormSelect,
    "b-form-textarea": BFormTextarea,
    "b-form-checkbox": BFormCheckbox,
  },
  data: function () {
    return {
      employee: {
        name: "",
        email: "",
        phone: "",
        programName: null,
      },
      cabDetails: {
        date: "",
        total: 1,
        sourceAddress: "",
        destinationAddress: "",
        remarks: "",
        halt: false,
      },
    };
  },
  methods: {
    addSuggestedEmail() {
      this.employee.email = this.suggestedEmail;
    },
    submitForm() {
      new MQL()
        .setActivity("o.[CreateCarRequest]")
        .setData({
          empName: this.employee.name,
          phone: this.employee.phone,
          travelDate: this.cabDetails.date,
          programName: this.employee.programName,
          passengers: this.cabDetails.total,
          pickup: this.cabDetails.sourceAddress,
          destination: this.cabDetails.destinationAddress,
          remarks: this.cabDetails.remarks,
          halt: this.cabDetails.halt,
          status: "false",
        })

        .enablePageLoader(true)
        .showConfirmDialog(true)
        .fetch("a11")
        .then((res) => {
          console.log(res);
          // let r = res.getRaw(true)
          console.log(res.isValid());
        });
    },
  },

  computed: {
    suggestedEmail: function () {
      let splitName = this.employee.name.trim().split(" ");
      splitName = splitName.filter((s) => s.trim());

      if (splitName.length == 0) {
        return "";
      } else if (splitName.length == 1) {
        return splitName[0].toLowerCase() + "@mkcl.org";
      } else {
        return (
          splitName[0].toLowerCase() +
          splitName[1].charAt(0).toLowerCase() +
          "@mkcl.org"
        );
      }
    },
  },
};
</script>

<style>
.custom-select {
  padding: 0.5rem;
  width: 100%;
  background-color: transparent;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
.form-control {
  margin: 1rem 0;
}
#details-date__value_ {
  margin: 0 !important;
  border: none;
}
.main-form {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>