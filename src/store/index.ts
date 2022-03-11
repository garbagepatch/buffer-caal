import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store, GetterTree } from 'vuex';
export interface Buffer{
  ID: number,
  Type: string,
  pKa: number;
}
export interface Chemical{
    id: number,
BufferId: number,
Comp: string,
MW: number,
Name: string;
}
export interface State{
    buffers: Buffer[],
    chemicals:Chemical[];
}
export const key: InjectionKey<Store<State>> = Symbol();
const state: State = {

        chemicals: [
            {
                "id": 1,
                "BufferId": 1,
                "Comp": "BASE",
                "MW": 82.03,
                "Name": "Sodium Acetate Anhydrous"
            },
            {
                "id": 2,
                "BufferId": 1,
                "Comp": "ACID",
                "MW": 17.4,
                "Name": "Glacial Acetic Acid"
            },
            {
                "id":3,
                "BufferId": 1,
                "Comp": "BASE",
                "MW": 136.08,
                "Name": "Sodium Acetate Trihydrate"
            },
            {
                "id":4,
                "BufferId": 2,
                "Comp": "ACID",
                "MW": 137.99,
                "Name": "Sodium Phosphate Monobasic Monohydrate"
            },
            {
                "id": 5,
                "BufferId": 2,
                "Comp": "ACID",
                "MW": 156.01,
                "Name": "Sodium Phosphate Monobasic Dihydrate"
            },
            {
                "id": 6,
                "BufferId": 2,
                "Comp": "ACID",
                "MW": 119.98,
                "Name": "Sodium Phosphate Monobasic Anhydrous"
            },
            {
                "id": 7,
                "BufferId": 2,
                "Comp": "BASE",
                "MW": 141.96,
                "Name": "Sodium Phosphate Dibasic Anhydrous"
            },
            {
                "id": 8,
                "BufferId": 2,
                "Comp": "BASE",
                "MW": 177.99,
                "Name": "Sodium Phosphate Dibasic Dihydrate"
            },
            {
                "id" : 9,
                "BufferId": 2,
                "Comp": "BASE",
                "MW": 268.07,
                "Name": "Sodium Phosphate Dibasic Heptahydrate"
            },
            {
                "id":10,
                "BufferId": 3,
                "Comp": "BASE",
                "MW": 121.14,
                "Name": "Tris"
            },
            {
                "id": 11,
                "BufferId": 3,
                "Comp": "ACID",
                "MW": 157.6,
                "Name": "Tris HCl"
            },
            {
                "id": 12,
                "BufferId": 4,
                "Comp": "ACID",
                "MW": 209.26,
                "Name": "MOPS"
            },
            {
                "id":13,
                "BufferId": 4,
                "Comp": "BASE",
                "MW": 231.25,
                "Name": "MOPS Sodium"
            },
            {
                "id": 14,
                "BufferId": 5,
                "Comp": "ACID",
                "MW": 195.24,
                "Name": "MES"
            },
            {
                "id": 15,
                "BufferId": 5,
                "Comp": "BASE",
                "MW": 217.22,
                "Name": "MES Sodium"
            },
            {
                "id": 16,
                "BufferId": 6,
                "Comp": "ACID",
                "MW": 238.61,
                "Name": "HEPES"
            },
            {
                "id": 17,
                "BufferId": 6,
                "Comp": "BASE",
                "MW": 260.28,
                "Name": "HEPES Sodium"
            }
        ],
    
    buffers: [
      {
          "ID": 1,
          "Type": "Acetates",
          "pKa": 4.76
      },
      {
          "ID": 2,
          "Type": "Sodium Phosphates",
          "pKa": 7.24
      },
      {
          "ID": 3,
          "Type": "Tris",
          "pKa": 8.06
      },
      {
          "ID": 4,
          "Type": "MOPS",
          "pKa": 7.2
      },
      {
          "ID": 5,
          "Type": "MES",
          "pKa": 6.21
      },
      {
          "ID": 6,
          "Type": "HEPES",
          "pKa": 7.66
      },
      {
          "ID": 7,
          "Type": "",
          "pKa": 7
      }
  ]
  }
  export type Getters = {
    getBuffers(state: State): Buffer[],
    getChemicals(state: State): Chemical[]
  }
  
  export const getters: GetterTree<State, State> & Getters = {
    getBuffers: (state) => {
      return state.buffers
    },
    getChemicals: (state) => {
        return state.chemicals
    }
  }
  export const store = createStore<State>({ state, getters });

  // our own `useStore` composition function for types
  export function useStore() {
    return baseUseStore(key);
  }