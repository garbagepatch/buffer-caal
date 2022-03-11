<template>
  <div id="container">
    <ion-card>
      <ion-card-header>
        <ion-card-title>Buffer Input</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-item>
          <ion-label>Buffer Choice</ion-label>
          <ion-select :interface-options="options" v-model="selectedBuffer">
            <ion-select-option v-for="buffer in buffers" :key="buffer" :value="buffer">{{
              buffer.Type
            }}</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label position="floating"> Buffer Molarity (M) </ion-label>
          <ion-input v-model.number="buffMol" type="number"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating"> pH </ion-label>
          <ion-input v-model.number="pH" type="number"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating"> Sodium Chloride Molarity (M) </ion-label>
          <ion-input v-model.number="naclMol" type="number"></ion-input>
        </ion-item>
      </ion-card-content>
    </ion-card>
    <ion-card>
      <ion-card-header>
        <ion-card-title>Results</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-label position="floating"> HA Component </ion-label>
                <ion-select :interface-options="options" v-model="selectedHA">
                  <ion-select-option v-for="ha in haList" :key="ha" :value="ha">{{
                    ha.Name
                  }}</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-col>
            <ion-col>
              <ion-item>
                <ion-label position="floating" slot="start"> HA Results </ion-label>
                <ion-label slot="end">
                  {{ haresult }}
                </ion-label>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row elevation="5">
            <ion-col>
              <ion-item>
                <ion-label position="floating"> A Component </ion-label>
                <ion-select :interface-options="options" v-model="selectedA" >
                  <ion-select-option v-for="a in aList" :key="a" :value="a">{{
                    a.Name
                  }}</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-col>
            <ion-col>
              <ion-item>
                <ion-label position="floating" slot="start"> A Results </ion-label>
                <ion-label slot="end">
                  {{ aresult }}
                </ion-label>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-button @Click="calculate()">Calculate</ion-button>
      </ion-card-content>
    </ion-card>
    <p>
      Explore
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://ionicframework.com/docs/components"
        >UI Components</a
      >
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { Buffer, Chemical } from "../store/index";
import { IonSelect, IonSelectOption, IonInput, IonButton } from "@ionic/vue";

export default defineComponent({
  name: "ExploreContainer",
  props: {
    name: String,
  },
  components: { IonSelect, IonSelectOption, IonInput, IonButton },
  data() {
    return {
      haList: [] as Chemical[],
      aList: [] as Chemical[],
      selectedBuffer: {} as Buffer,
      pH: 0.0,
      buffMol: 0.0,
      naclMol: 0.0,
      selectedHA: {} as Chemical,
      selectedA: {} as Chemical,
      aresult: 0.0,
      haresult: 0.0,
      pkaVar: 0.0,
    };
  },
  computed: {
    ...mapGetters({ buffers: "getBuffers" }),
    ...mapGetters({ chemicals: "getChemicals" }),
  },
  watch: {
    // whenever question changes, this function will run
    selectedBuffer(newSelection) {
      if (newSelection) {
        this.onBufferChange(newSelection);
      }
    },
  },
  methods: {
    onBufferChange(buffer: Buffer) {
      let tempChemicals = this.chemicals;
      tempChemicals = tempChemicals.filter(function (item: Chemical) {
        return item.BufferId === buffer.ID;
      });
      this.haList = tempChemicals.filter(function (comp: Chemical) {
        return comp.Comp.match("HA");
      });
      this.aList = tempChemicals.filter(function (comp: Chemical) {
        return comp.Comp.match("A");
      });
    },

    filterChemicals(buffid: number) {
      return (this.chemicals.bufferId = buffid);
    },
    calculate() {
      if (this.selectedBuffer.ID === 1) {
        this.pkaVar =
          4.76424 -
          (0.76796 *
            (this.buffMol -
              this.buffMol / 10.0 ** (this.pH - 4.76424) +
              1.0 +
              this.naclMol) **
              0.5) /
            ((this.buffMol -
              this.buffMol / (10.0 ** (this.pH - 4.76424) + 1.0) +
              this.naclMol) **
              0.5 +
              1.0) +
          0.1087 *
            (this.buffMol -
              this.buffMol / (10.0 ** (this.pH - 4.76424) + 1.0) +
              this.naclMol) **
              0.5;
      }
      if (this.selectedBuffer.ID === 2) {
        this.pkaVar =
          6.980686 -
          1.015071 *
            ((this.buffMol -
              this.buffMol / (10.0 ** (this.pH - 7.24) + 1.0) +
              this.naclMol) **
              0.5 /
              ((this.buffMol -
                this.buffMol / (10.0 ** (this.pH - 7.24) + 1.0) +
                this.naclMol) **
                0.5 +
                1.0)) -
          0.251942 *
            (this.buffMol -
              this.buffMol / (10.0 ** (this.pH - 7.24) + 1.0) +
              this.naclMol);
      }
      if (this.selectedBuffer.ID === 3) {
        this.pkaVar =
          8.089118 +
          0.286552 *
            ((this.buffMol -
              this.buffMol / (10.0 ** (this.pH - 8.06) + 1.0) +
              this.naclMol) **
              0.5 /
              ((this.buffMol -
                this.buffMol / (10.0 ** (this.pH - 8.06) + 1.0) +
                this.naclMol) **
                0.5 +
                1.0)) +
          0.005268 *
            (this.buffMol -
              this.buffMol / (10.0 ** (this.pH - 8.06) + 1.0) +
              this.naclMol);
      }
      if (this.selectedBuffer.ID === 4) {
        this.pkaVar =
          7.221505 -
          1.197193 *
            ((this.buffMol -
              this.buffMol / (10.0 ** (this.pH - 7.2) + 1.0) +
              this.naclMol) **
              0.5 /
              ((this.buffMol -
                this.buffMol / (10.0 ** (this.pH - 7.2) + 1.0) +
                this.naclMol) **
                0.5 +
                1.0)) +
          0.870906 *
            (this.buffMol -
              this.buffMol / (10.0 ** (this.pH - 7.2) + 1.0) +
              this.naclMol);
      }
      if (this.selectedBuffer.ID === 5) {
        this.pkaVar =
          6.147523 -
          0.194272 *
            ((this.buffMol -
              this.buffMol / (10.0 ** (this.pH - 6.21) + 1.0) +
              this.naclMol) **
              0.5 /
              ((this.buffMol -
                this.buffMol / (10.0 ** (this.pH - 6.21) + 1.0) +
                this.naclMol) **
                0.5 +
                1.0)) -
          0.023826 *
            (this.buffMol -
              this.buffMol / (10.0 ** (this.pH - 6.21) + 1.0) +
              this.naclMol) **
              0.5;
      }
      if (this.selectedBuffer.ID === 6) {
        this.pkaVar =
          7.731165 -
          0.835113 * this.naclMol -
          0.033846 * this.pH +
          -1.197864 * this.buffMol +
          0.101651 * this.pH * this.naclMol +
          0.504814 * this.buffMol * this.naclMol +
          0.163069 * this.buffMol * this.pH +
          0.002898 * this.pH * this.buffMol * this.naclMol;
      }
      this.finishCalc();
    },
    finishCalc() {
      let aMW = this.selectedA.MW;
      let haMW = this.selectedHA.MW;
      let hamol = 0.0;

      if (this.selectedBuffer.ID === 1) {
        this.haresult =
          (1000 * this.buffMol) / (10.0 ** (this.pH - this.pkaVar) + 1.0) / haMW;
        hamol = (this.haresult / 1000) * 17.4;
      } else {
        this.haresult = (haMW * this.buffMol) / (10.0 ** (this.pH - this.pkaVar) + 1.0);
        hamol = this.haresult / haMW;
      }
      this.aresult = (this.buffMol - hamol) * aMW;
    },
  },
});
</script>

<style scoped>
#ion-select-option{
  max-width: 70%;
}
#ion-select {
  width: 100%;

  justify-content: center;
}
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
