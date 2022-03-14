<template>
<div id="container">
    <ion-grid>
        <ion-row>
            <ion-col>
                <ion-card>
                    <ion-grid>
                        <ion-row>
                            <ion-col>
                                <ion-item>
                                    <ion-label>Choose Buffer or Custom</ion-label>
                                    <ion-select interface="action-sheet" :inter-options="options" v-model="selectedBuffer">
                                        <ion-select-option v-for="buffer in buffers" :key="buffer" :value="buffer">{{buffer.Type}}</ion-select-option>
                                    </ion-select>
                                </ion-item>
                            </ion-col>

                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <ion-item>
                                    <ion-label position="floating" slot="start">

                                    </ion-label>
                                    <ion-input v-model.number="totMol" type="number">

                                    </ion-input>

                                </ion-item>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-card>
            </ion-col>
        </ion-row>
    </ion-grid>
 \
</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { Buffer, Chemical } from "../store/index";
import { IonSelect, IonSelectOption, IonInput } from "@ionic/vue";
export default defineComponent({
    name: "FixIt",
    components: {IonSelect, IonSelectOption, IonInput},
data(){
    return {
        mwHA: 0.00,
        mwA: 0.00,
        selectedBuffer: {} as Buffer,
        buffers: [] as Buffer[],
        totMol: 0.00,
        pKa: 0.00,
        HA: 0.00,
        A: 0.00,
        naclMol: 0.00,
        NaCl: 0.00,
        chemicals: [] as Chemical[],
        selectedHA: {} as Chemical,
        selectedA: {} as Chemical

    }
},
computed: {
    ...mapGetters({ buffers: "getBuffers" }),
    ...mapGetters({ chemicals: "getChemicals" }),
  },
})
</script>
<style>
</style>