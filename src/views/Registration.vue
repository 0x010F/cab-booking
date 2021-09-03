<template>
  <div>
    <b-form class="row my-2" @submit.prevent="submitForm">
      <div class="col-12 col-md-6">
        <b-form-group
          label="Employee Name"
          label-for="employee-name"
          class="mb-2"
        >
          <b-form-input
            id="employee-name"
            v-model="employee.name"
            type="text"
            placeholder="Enter your name"
            required
          />
        </b-form-group>
        <b-form-group
          label="Employee Email"
          label-for="employee-email"
          class="mb-2"
        >
          <b-form-input
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
          </span>
        </b-form-group>
        <b-form-group
          label="Employee Phone Number"
          label-for="employee-phone"
          class="mb-2"
        >
          <b-form-input
            id="employee-phone"
            v-model="employee.phone"
            type="text"
            placeholder="Enter your phone number"
            required
          />
        </b-form-group>
        <b-form-group
          label="Date of Travelling"
          label-for="details-date"
          class="mb-2"
        >
          <b-form-datepicker
            id="details-date"
            v-model="cabDetails.date"
          ></b-form-datepicker>
        </b-form-group>
        <b-form-group
          label="Program Name"
          label-for="employee-program"
          class="mb-2"
        >
          <b-form-select
            id="employee-program"
            v-model="employee.programName"
            :options="PROGRAM_NAMES"
          />
        </b-form-group>
        <b-form-group
          label="Total number of passengers"
          label-for="details-total"
          class="mb-2"
        >
          <b-form-input
            id="details-total"
            type="number"
            v-model="cabDetails.total"
            placeholder="Enter total number of passengers"
            required
            min="1"
          />
        </b-form-group>
      </div>
      <div class="col-12 col-md-6">
        <b-form-group
          label="Pickup Address of the First Person"
          label-for="details-source-address"
          class="mb-2"
        >
          <b-form-textarea
            id="details-source-address"
            v-model="cabDetails.sourceAddress"
          />
        </b-form-group>
        <b-form-group
          label="Destination address"
          label-for="details-destination-address"
          class="mb-2"
        >
          <b-form-textarea
            id="details-destination-address"
            v-model="cabDetails.destinationAddress"
          >
          </b-form-textarea>
        </b-form-group>
      </div>
      <div class="col-12 col-md-6">
        <b-form-group
          label="Remarks if any (optional)"
          label-for="details-remarks"
          class="mb-2"
        >
          <b-form-textarea id="details-remarks" v-model="cabDetails.remarks" />
        </b-form-group>
        <b-form-group
          label="Halt? (if any)"
          label-for="details-halt"
          class="d-flex align-items-center mb-2"
        >
          <b-form-checkbox
            id="details-halt"
            v-model="cabDetails.halt"
            class="m-1"
          />
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import Vue from "vue";
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
        date: new Date(),
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
      console.log({
        ...this.employee,
        ...this.cabDetails,
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

<style scoped>
.custom-select {
  padding: 0.5rem;
  width: 100%;
  background-color: transparent;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
</style>